from django.conf.urls import url
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from ebonsignori import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^acknowledgements', views.acknowledgements, name='acknowledgements'),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

