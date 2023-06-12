from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("health", views.healthCheck, name="health"),
    path("chat/<str:room_name>/", views.room, name="room"),
]