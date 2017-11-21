from django.contrib import admin

from .models import Post, Category, Comment, PostDisplayImage, PostResponse

admin.site.register([Post, Category, Comment, PostDisplayImage, PostResponse])