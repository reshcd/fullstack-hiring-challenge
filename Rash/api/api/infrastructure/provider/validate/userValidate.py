from ..repository.userRepository import (userByEmail, userByName, userByID)
from ..utils import isEmpty

def createUserValidate(user):
    empty_validate = validate_user_fields(user)    
    if(empty_validate == False):
        return 'Preencha todos os campos'
    
    name_validate = userByName(name=user['name'])
    email_validate = userByEmail(email=user['email'])

    if((len(name_validate) + len(email_validate))> 0):
        return 'Usuário existente'

    return True

def deleteUserValidate(user):
    empty_validate = validate_user_fields(user)    
    if(empty_validate == False):
        return 'Preencha todos os campos'
    
    id_validate = (userByID(id=user['id']))
    print(id_validate)
    
    if(len(id_validate) == 0):
        return 'Usuário inexisteste'
    
    return True

def loginValidate(user):
    empty_validate = validate_user_fields(user)    
    if(empty_validate == False):
        return 'Preencha todos os campos'
    return True

def updateUserValidate(user):
    empty_validate = validate_user_fields(user)    
    if(empty_validate == False):
        return 'Preencha todos os campos'
    
    name_validate = userByName(name=user['name'])
    if(name_validate):
        if(name_validate[0]['id'] != user['id']):
            return 'Nome já utilizado por outro usuário'
    
    email_validate = userByEmail(email=user['email'])
    if (email_validate):
        if(email_validate[0]['id'] != user['id']):
            return 'Email á utilizado por outro usuário'

    return True
    

def validate_user_fields(user):
    state = True
    for prop in user:
        if(isEmpty(user[prop])):
            state = False

    return state