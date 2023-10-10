from django.db import models

# Create your models here.
from account.models import CustomUser
from candidate.models import Candidate

class Event(models.Model):
    title=models.CharField(max_length=500)
    candidates=models.ManyToManyField(Candidate, blank=True)
    voters=models.ManyToManyField(CustomUser, blank=True)
    reg_end_dt=models.DateTimeField()
    e_start_dt=models.DateTimeField()
    e_end_dt=models.DateTimeField()
    status=models.CharField(max_length=100, blank=True)

    