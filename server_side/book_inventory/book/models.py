from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    genre = models.CharField(max_length=50)
    publication_date = models.DateField()

    class Meta:
        permissions = [
            ("author", "Can modify books"),
        ]

    def __str__(self):
        return self.title