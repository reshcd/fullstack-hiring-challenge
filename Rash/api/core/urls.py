from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('api.delivery.routes'),name='api-rest')
]
