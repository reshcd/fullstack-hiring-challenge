from rest_framework import serializers
from .models import user

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = '__all__'

class userID_serializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id','name', )

class userWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        return '123'

    class Meta:
        model = user
        fields = ('id','name','password','email','token' )

