from django.urls import path

from . import views


urlpatterns = [
    path("health", views.healthCheck, name="health"),
]