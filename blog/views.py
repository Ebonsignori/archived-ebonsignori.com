from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from markdownx.utils import markdownify
from .models import Post, Category, Comment
from .forms import PostForm, CategoryForm, CommentForm
from django.utils import timezone


def post_list(request):
    posts = Post.objects.filter(is_deleted=False).order_by('published_date')
    for post in posts:
        post.text = markdownify(post.text)
    return render(request, 'blog/posts.html', {'posts': posts})


def post_view(request, slug):
    post = get_object_or_404(Post, slug=slug)
    comments = post.comments.all()
    for comment in comments:
        comment.text = markdownify(comment.text)
    post.text = markdownify(post.text)
    return render(request, 'blog/post_view.html', {'post': post, 'comments': comments})


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


@login_required
def category_new(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/blog')
    else:
        form = CategoryForm()
    return render(request, 'blog/category_edit.html', {'form': form})


@login_required
def category_edit(request, slug):
    category = get_object_or_404(Category, slug=slug)
    if request.method == "POST":
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            category.save()
            return redirect('post_view', slug=category.slug)
    else:
        form = CategoryForm(instance=category)
    return render(request, 'blog/category_edit.html', {'form': form, 'category': category})


def add_comment_to_post(request, slug):
    post = get_object_or_404(Post, slug=slug)
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.save()
            return redirect('post_view', slug=post.slug)
    else:
        form = CommentForm()
    return render(request, 'blog/add_comment_to_post.html', {'form': form, 'post': post})


@login_required
def comment_approve(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    comment.approve()
    return redirect('post_view', slug=comment.post.slug)


@login_required
def comment_remove(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    comment.delete()
    return redirect('post_view', slug=comment.post.slug)