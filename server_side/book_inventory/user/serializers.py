from django.contrib.auth.models import User
from rest_framework import serializers

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # Create a new user with the provided data
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    is_author = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['username', 'email', 'is_author']

    def get_is_author(self, obj):
        # Check if the user has the 'author' permission
        return obj.has_perm('book.author')
