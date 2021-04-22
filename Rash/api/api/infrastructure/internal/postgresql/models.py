from django.db import models
from django.db.models.fields import EmailField
import uuid

class user(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=70)
    email = models.EmailField(max_length=70)
    password = models.CharField(max_length=70)

    class Meta:
     db_table = 'users'

    def __str__(self):
        return self.name
