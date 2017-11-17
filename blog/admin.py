from django.contrib import admin

from .models import Post, Category, Comment, PostDisplayImage, PostResponse
from markdownx.admin import MarkdownxModelAdmin

admin.site.register([Post, Category, Comment, PostDisplayImage, PostResponse], MarkdownxModelAdmin)