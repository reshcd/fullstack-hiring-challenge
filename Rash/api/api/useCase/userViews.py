from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.infrastructure.provider.utils import (b64ToString, stringToB64)
from api.infrastructure.provider.validate.userValidate import (updateUserValidate,createUserValidate, deleteUserValidate, loginValidate)

from api.infrastructure.internal.postgresql import (models,serializers)

@api_view(['POST', ])
def list_users_by_email(request, email):
    try:
        users = models.user.objects.all()
        users = users.filter(email = email)

        if( request.method == 'POST'):
            res = serializers.user_serializer(users, many = True)

            if( len(res.data) ==0 ):
                return Response(data = 'Usuário inexistente',status = status.HTTP_204_NO_CONTENT)

            return Response(res.data, status=status.HTTP_200_OK)

    except models.user.DoesNotExist:
        return Response(status= status.HTTP_404_NOT_FOUND)

@api_view(['POST', ])
def list_usersID_by_email(request, email):
    try:
        users = models.user.objects.all()
        users = users.filter(email = email)

        if( request.method == 'POST'):
            res = serializers.userID_serializer(users, many = True)

            if( len(res.data) ==0 ):
                return Response(data='Usuário inexistente',status = status.HTTP_204_NO_CONTENT)

            return Response(res.data, status=status.HTTP_200_OK)

    except models.user.DoesNotExist:
        return Response(status= status.HTTP_404_NOT_FOUND)

@api_view(['POST', ])
def create_user(request):
    try:
        validate = createUserValidate(request.data)  

        if(validate == True):
            data = request.data
            data['password'] = stringToB64(data['password'])

            user = serializers.userWithToken(data=data)
            if(user.is_valid()):
                user.save()

                return Response(user.data, status=status.HTTP_200_OK)
            
        return Response(validate, status=status.HTTP_201_CREATED)
    
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST', ])
def login_user_by_name(request):
    try:
        validate = loginValidate(request.data)

        if(validate == True  and request.method == 'POST'):
            user_name = request.data['name']
                
            query = f"SELECT * FROM public.users WHERE name ='{user_name}'"
            user = models.user.objects.raw(query)

            res = serializers.userWithToken(user, many =True)
            print(res.data)
            if(len(res.data)==0):
                print(1561651)
                return Response(data = 'Usuário inexistente', status=status.HTTP_201_CREATED) 
                
            data = res.data[0]
            data['password'] = b64ToString(data['password'])
                
            return Response(data, status= status.HTTP_200_OK) 
        return Response(data = validate, status=status.HTTP_201_CREATED) 
    except:
        return Response(status= status.HTTP_404_NOT_FOUND)

@api_view(['PUT', ])
def update_user(request):
    try:
        if (request.method == 'PUT'):
            validate = updateUserValidate(request.data)
            print(validate)
            if(validate==True):
                data = request.data
                data['password'] = stringToB64(data['password'])
                
                user = models.user.objects.get(id = request.data['id'])
                res = serializers.user_serializer(user, data = request.data)

                if (res.is_valid()):
                    res.save()
                    
                    return Response('Dados atualizados', status=status.HTTP_200_OK)
        
                return Response(data ='Falha ao modificar usuário', status=status.HTTP_201_CREATED)
        
        return Response(data = validate,status= status.HTTP_201_CREATED)

    
    except:
        return Response(status= status.HTTP_404_NOT_FOUND)

@api_view(['POST', ])
def delete_user_by_name(request):
    try:
        if (request.method == 'POST'):
                     
            validate = deleteUserValidate(request.data)
            
            if( validate == True ):
                user_id = request.data['id'] 
                user = models.user.objects.get(id = user_id)
                res = user.delete()

                if res:
                    return Response('Apagado com sucesso', status=status.HTTP_200_OK)
            
                return Response('Falha ao deletar usuário', status=status.HTTP_201_CREATED)
            
            return Response(validate, status=status.HTTP_201_CREATED)
    
    except:
        return Response(status= status.HTTP_404_NOT_FOUND)

@api_view(['GET', ])
def list_users(request):
    try:
        query = 'SELECT * FROM public.users order by name asc'
        users = models.user.objects.raw(query)

        if( request.method == 'GET'):
            res = serializers.userWithToken(users, many = True)

            if( len(res.data) == 0 ):
                return Response(data = 'Nenhum usuário encontrado',status = status.HTTP_201_CREATED)

            return Response(res.data, status=status.HTTP_200_OK)

    except models.user.DoesNotExist:
        return Response(status= status.HTTP_404_NOT_FOUND)

