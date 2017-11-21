from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views
from django.conf import settings
from django.conf.urls import ( # Import error pages
handler400, handler403, handler404, handler500
)

urlpatterns = [
    url(r'^', include('home.urls')),
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
]

# Error Pages
handler400 = 'ebonsignori.views.handle_400'
handler403 = 'ebonsignori.views.handle_403'
handler404 = 'ebonsignori.views.handle_404'
handler500 = 'ebonsignori.views.handle_500'


# Development server static serving
if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()