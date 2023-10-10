from django.db import models

# Create your models here.
from account.models import CustomUser
class Candidate(models.Model):
    student=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    reg_dt=models.DateTimeField(auto_now_add=True)
    group=models.CharField(max_length=100)
    symbol=models.ImageField(upload_to="images/symbols")
    votes=models.IntegerField(default=0)
    status=models.CharField(max_length=100)
