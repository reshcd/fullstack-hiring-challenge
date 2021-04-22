from ....infrastructure.internal.postgresql import (models, serializers)

def users():
    users = models.user.objects.all()
    res = serializers.user_serializer(users, many = True)

    return res.data

def userByName(name):
    user = models.user.objects.all()
    user = user.filter(name = name)
    
    res = serializers.user_serializer(user, many = True)

    return  res.data

def userByID(id):
    user = models.user.objects.all()
    user = user.filter(id = id)
    
    res = serializers.user_serializer(user, many = True)

    return  res.data

def userByEmail(email):
    
    user = models.user.objects.all()
    user = user.filter(email=email)

    res = serializers.user_serializer(user, many=True)

    return  res.data
