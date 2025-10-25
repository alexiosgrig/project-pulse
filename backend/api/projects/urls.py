from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, search_projects

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('search/', search_projects, name='search_projects'),
    path('', include(router.urls)),
]
