from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class UserProfileRegisterSerializer(serializers.ModelSerializer):
    # User fields
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    # Profile fields
    phone = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    address = serializers.CharField(required=False, allow_blank=True)
    is_business = serializers.BooleanField(required=False)
    national_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password',
            'phone', 'address', 'is_business', 'national_id',
        ]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_phone(self, value):
        if value and Profile.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value

    def validate_national_id(self, value):
        if value and Profile.objects.filter(national_id=value).exists():
            raise serializers.ValidationError("National ID already exists.")
        return value

    def create(self, validated_data):
        profile_fields = ['phone', 'address', 'is_business', 'national_id', 'profile_email']
        user_data = {k: validated_data[k] for k in ['username', 'email', 'password']}
        profile_data = {k: validated_data.get(k) for k in profile_fields}

        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )
        Profile.objects.create(
            user=user,
            phone=profile_data.get('phone'),
            address=profile_data.get('address', ''),
            is_business=profile_data.get('is_business', False),
            national_id=profile_data.get('national_id'),
            email=profile_data.get('profile_email')
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)