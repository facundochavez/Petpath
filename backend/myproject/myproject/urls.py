from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get_breed/', views.get_breed, name='get_breed'),
]
