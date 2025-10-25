from django.db import models

class Project(models.Model):
    HEALTH_CHOICES = [
        ('Good', 'Good'),
        ('Moderate', 'Moderate'),
        ('Critical', 'Critical'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    summary = models.TextField()
    owner = models.CharField(max_length=100)
    last_updated = models.DateTimeField(auto_now=True)
    progress = models.IntegerField()
    milestones = models.IntegerField()
    team = models.JSONField(default=list)
    tags = models.JSONField(default=list)
    health = models.CharField(max_length=20, choices=HEALTH_CHOICES)
    recent_activities = models.JSONField(default=list)
    deleted = models.BooleanField(default=False)
    version = models.IntegerField(default=1)

    def __str__(self):
        return self.title
