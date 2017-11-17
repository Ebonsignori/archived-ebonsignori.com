from django import forms

from .models import Post, Category, Comment


class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'subtitle', 'description', 'author', 'category', 'header_image', 'text')


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ('title', 'slug', 'header_image', 'order')


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('author', 'comment_body',)