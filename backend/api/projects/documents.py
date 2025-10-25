from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from .models import Project

project_index = Index('projects')
project_index.settings(number_of_shards=1, number_of_replicas=0)

@registry.register_document
class ProjectDocument(Document):
    # Convert JSON arrays to lists of text safely
    tags = fields.ListField(fields.TextField())
    team = fields.ListField(fields.TextField())
    recent_activities = fields.ListField(fields.TextField())

    class Index:
        name = 'projects'

    class Django:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'summary',
            'owner',
            'progress',
            'milestones',
            'health',
            'last_updated',
            'deleted',
            'version',
        ]

    def prepare_tags(self, instance):
        return [str(tag) for tag in instance.tags] if instance.tags else []

    def prepare_team(self, instance):
        return [str(member) for member in instance.team] if instance.team else []

    def prepare_recent_activities(self, instance):
        return [str(activity) for activity in instance.recent_activities] if instance.recent_activities else []
