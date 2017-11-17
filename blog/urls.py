from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='posts'),
    url(r'^post/new/$', views.post_new, name='post_new'),
    url(r'^post/(?P<slug>[-\w]+)/publish/$', views.post_publish, name='post_publish'),
    url(r'^post/(?P<slug>[-\w]+)/edit/$', views.post_edit, name='post_edit'),
    url(r'^post/(?P<slug>[-\w]+)/remove/$', views.post_remove, name='post_remove'),
    url(r'^post/(?P<slug>[-\w]+)/restore/$', views.post_restore, name='post_restore'),
    url(r'^post/(?P<slug>[-\w]+)/delete/$', views.post_delete, name='post_delete'),
    url(r'^post/(?P<slug>[-\w]+)/(?P<reaction>\d+)/$', views.update_reaction, name='update_reaction'),
    url(r'^post/(?P<slug>[-\w]+)/$', views.post_view, name='post_view'),
    url(r'^drafts/$', views.post_draft_list, name='post_draft_list'),
    url(r'^deleted/$', views.post_deleted_list, name='post_deleted_list'),
    url(r'^category/new/$', views.category_new, name='category_new'),
    url(r'^category/(?P<slug>[-\w]+)/edit/$', views.category_edit, name='category_edit'),
    url(r'^comment/(?P<pk>\d+)/approve/$', views.comment_approve, name='comment_approve'),
    url(r'^comment/(?P<pk>\d+)/remove/$', views.comment_remove, name='comment_remove'),
    url(r'^comment/(?P<slug>[-\w]+)/edit-comment/(?P<pk>\d+)/$', views.comment_edit, name='comment_edit'),
    url(r'^category/(?P<slug>[-\w]+)/$', views.change_category, name='change_category'),
    url(r'^category/(?P<pk>\d+)/delete/$', views.category_delete, name='category_delete'),
]