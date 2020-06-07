"""apphome URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from adoptions import views as adoptionviews
from portfoliojobs import views as portfolioviews

"""
# Another way to import static files
from django.conf import settings
from django.conf.urls.static import static


"""

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', adoptionviews.home, name='home'),
    path('adoptions/<int:pet_id>/', adoptionviews.pet_detail, name='pet_detail'),
    path('geerivana', portfolioviews.getprofile, name="geerivana")
]
# Uncomment below line if STATIC_ROOT is used to define static root directory
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)