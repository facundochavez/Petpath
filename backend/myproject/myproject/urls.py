from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get_cat/', views.get_cat, name='get_cat'),
]
