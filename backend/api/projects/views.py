from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from elasticsearch_dsl import Q

from .models import Project
from .serializers import ProjectSerializer
from .pagination import ProjectPagination
from .filters import ProjectFilter
from .documents import ProjectDocument


class ProjectViewSet(viewsets.ModelViewSet):
    """
    Main CRUD and filtering viewset for Projects (Django ORM)
    """
    queryset = Project.objects.filter(deleted=False)
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination

    # Enable filtering, sorting, and search (Django ORM)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ProjectFilter
    ordering_fields = ['title', 'owner', 'progress', 'health', 'last_updated']
    ordering = ['title']
    search_fields = ['title', 'description', 'tags']

    def destroy(self, request, *args, **kwargs):
        """Soft delete a project (mark as deleted instead of removing)"""
        instance = self.get_object()
        instance.deleted = True
        instance.version += 1
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        """Optimistic concurrency control using 'version'"""
        instance = self.get_object()
        req_version = request.data.get('version', None)
        if req_version is None or req_version != instance.version:
            return Response(
                {"error": "Version mismatch"},
                status=status.HTTP_409_CONFLICT
            )
        instance.version += 1
        return super().update(request, *args, **kwargs)


# ===============================================
# ✅ Elasticsearch search endpoint
# ===============================================
def search_projects(request):
    """
    Full-text search using Elasticsearch
    Supports typo tolerance (fuzzy search) and multi-field matching.
    """
    query = request.GET.get("q", "").strip()
    owner = request.GET.get("owner", "").strip()
    health = request.GET.get("health", "").strip()
    tag = request.GET.get("tag", "").strip()

    search = ProjectDocument.search()

    # 🔍 1. Full-text fuzzy search across multiple fields
    if query:
        q = Q(
            "multi_match",
            query=query,
            fields=["title", "description", "summary", "tags"],
            fuzziness="AUTO"
        )
        search = search.query(q)

    # 🎯 2. Apply structured filters
    if owner:
        search = search.filter("term", owner=owner)
    if health:
        search = search.filter("term", health=health)
    if tag:
        search = search.filter("term", tags=tag)

    # 🔢 3. Execute search and safely serialize results
    results = []
    for hit in search[:20]:
        results.append({
            "id": hit.meta.id,
            "title": hit.title,
            "description": hit.description,
            "summary": hit.summary,
            "owner": hit.owner,
            "progress": hit.progress,
            "health": hit.health,
            "tags": list(hit.tags) if hasattr(hit, "tags") else [],
        })

    return JsonResponse({"count": len(results), "results": results})
