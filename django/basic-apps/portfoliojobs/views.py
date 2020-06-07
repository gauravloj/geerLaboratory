from django.shortcuts import render
from .models import Job


def getprofile(request):
    jobs = Job.objects
    return render(request, 'profiles/myprofile.html', {'jobs': jobs})