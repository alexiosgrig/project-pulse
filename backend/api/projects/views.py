from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project
from .serializers import ProjectSerializer
from .pagination import ProjectPagination
from .filters import ProjectFilter

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(deleted=False)
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination  # <-- add pagination here

    # Filtering, sorting, search
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ProjectFilter
    ordering_fields = ['title', 'owner', 'progress', 'health', 'last_updated']
    ordering = ['title']  # default ordering
    search_fields = ['title', 'description', 'tags']

    def destroy(self, request, *args, **kwargs):
        # Soft delete
        instance = self.get_object()
        instance.deleted = True
        instance.version += 1
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        # Optimistic concurrency using 'version'
        instance = self.get_object()
        req_version = request.data.get('version', None)
        if req_version is None or req_version != instance.version:
            return Response(
                {"error": "Version mismatch"},
                status=status.HTTP_409_CONFLICT
            )
        instance.version += 1
        return super().update(request, *args, **kwargs)
