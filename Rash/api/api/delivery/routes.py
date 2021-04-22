from ..useCase.userViews import (
    create_user, login_user_by_name, list_users_by_email,
 list_usersID_by_email, update_user, delete_user_by_name,
 list_users
 )
from django.urls import path

app_name = 'api'

urlpatterns = [
    path('login_user/', login_user_by_name, name='user'),
    path('create/', create_user, name='user'),
    path('users_by_email/<email>', list_users_by_email, name='user'),
    path('usersID_by_email/<email>', list_usersID_by_email, name='user'),
    path('update/', update_user, name='user'),
    path('delete/', delete_user_by_name, name='user'),
    path('users/', list_users, name='user'),
]
