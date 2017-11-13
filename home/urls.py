from django.conf.urls import url
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic.base import RedirectView
from ebonsignori import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about$', RedirectView.as_view(url='/#about-section', permanent=True), name='about'),
    url(r'^portfolio$', RedirectView.as_view(url='/#portfolio', permanent=True), name='portfolio'),
    url(r'^contact', RedirectView.as_view(url='/#contact-section', permanent=True), name='contact'),
    url(r'^acknowledgements', views.acknowledgements, name='acknowledgements'),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

