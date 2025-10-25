import django_filters
from django.db.models import JSONField
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    class Meta:
        model = Project
        fields = ['owner', 'health', 'tags']
        filter_overrides = {
            JSONField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
        }
