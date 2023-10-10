from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    year=models.CharField(max_length=100, null=True)
    std_id=models.IntegerField(null=True)
    voter_id=models.IntegerField(null=True)