from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.




def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})




def healthCheck(request):
    return HttpResponse(status=200)