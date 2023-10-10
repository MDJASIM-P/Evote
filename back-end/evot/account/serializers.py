from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserSerializer(ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id', 'first_name', 'last_name', 'username', 'year', 'std_id', 'voter_id', 'password', 'is_staff']
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
        