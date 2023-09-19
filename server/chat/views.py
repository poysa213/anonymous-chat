from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.






def healthCheck(request):
    return HttpResponse(status=200)