from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from markdownx.utils import markdownify
from .models import Post
from .forms import PostForm
from django.utils import timezone


def post_list(request):
    posts = Post.objects.filter(is_deleted=False).order_by('published_date')
    for post in posts:
        post.text = markdownify(post.text)
    return render(request, 'blog/posts.html', {'posts': posts})


def post_view(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.text = markdownify(post.text)
    return render(request, 'blog/post_view.html', {'post': post})


@login_required
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return redirect('post_view', slug=post.slug)
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})


@login_required
def post_edit(request, slug):
    post = get_object_or_404(Post, slug=slug)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return redirect('post_view', slug=post.slug)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_edit.html', {'form': form, 'post': post})


@login_required
def post_draft_list(request):
    posts = Post.objects.filter(is_published=False).order_by('created_date')
    return render(request, 'blog/post_draft_list.html', {'posts': posts})


@login_required
def post_publish(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.publish()
    return redirect('post_view', slug=post.slug)


@login_required
def post_remove(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.is_deleted = True
    post.save()
    return redirect("/blog/")


@login_required
def post_deleted_list(request):
    posts = Post.objects.filter(is_deleted=True).order_by('created_date')
    return render(request, 'blog/post_deleted_list.html', {'posts': posts})


@login_required
def post_restore(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.is_deleted = False
    # When post is restored, it is a draft (unpublished)
    post.is_published = False
    post.published_date = None
    post.save()
    return redirect('post_view', slug=post.slug)


@login_required
def post_delete(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.delete()
    return redirect("/blog/deleted")