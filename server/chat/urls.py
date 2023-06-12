from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("helth", views.healthCheck, name="helth"),
    path("<str:room_name>/", views.room, name="room"),
]