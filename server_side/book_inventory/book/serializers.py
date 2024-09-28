from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    def validate_title(self, value):
        if len(value) < 1:
            raise serializers.ValidationError("Title must be at least 1 characters long")
        return value
    
    def update(self, instance, validated_data):
        # Allow updates only on 'price', 'description', and 'title'
        allowed_fields = ['price', 'description', 'title']
        
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        instance.save()
        return instance