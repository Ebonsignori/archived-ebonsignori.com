from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from markdownx.utils import markdownify
from .models import Post, Category, Comment, PostResponse
from .forms import PostForm, CategoryForm, CommentForm
from django.core.mail import send_mail
from django.utils import timezone


def post_list(request):
    posts = Post.objects.filter(is_deleted=False).order_by('published_date')
    categories = Category.objects.all().order_by('order')
    for post in posts:
        post.text = markdownify(post.text)
    return render(request, 'blog/posts.html', {'posts': posts, 'categories': categories})


def post_view(request, slug):
    post = get_object_or_404(Post, slug=slug)

    if request.method == "POST":
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment_obj = comment_form.save(commit=False)
            comment_obj.save_to_post(post.pk)

            send_mail(
                'New Comment on \"' + str(post) + '\"',
                str(post.comments.last().comment_body + "\n\n https://www.ebonsignori.com" + request.path +
                    "\n\n IP: " + request.META.get('REMOTE_ADDR') + "\n\n Host: " + request.META.get('REMOTE_HOST')),
                'evan@ebonsignori.com',
                ['evanabonsignori@gmail.com'],
                fail_silently=True,
                # html_message=True,
            )

            comments = post.comments.all()
            post.text = markdownify(post.text)
            return render(request, 'blog/post_view.html',
                          {'post': post, 'comments': comments, 'comment_form': comment_form, 'is_posted': True})
    else:
        comment_form = CommentForm()

    responses = post.responses.last()
    comments = post.comments.all()
    post.text = markdownify(post.text)
    return render(request, 'blog/post_view.html', {'post': post, 'comments': comments, 'comment_form': comment_form, 'responses': responses})


@login_required
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            post.create_post_responses()
            return redirect('post_view', slug=post.slug)
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})


@login_required
def post_edit(request, slug):
    post = get_object_or_404(Post, slug=slug)
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES, instance=post)
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
        form = CategoryForm(request.POST, request.FILES)
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
        form = CategoryForm(request.POST, request.FILES, instance=category)
        if form.is_valid():
            category.save()
            return redirect('change_category', slug=category.slug)
    else:
        form = CategoryForm(instance=category)
    return render(request, 'blog/category_edit.html', {'form': form, 'category': category})


def comment_edit(request, pk, slug):
    post = get_object_or_404(Post, slug=slug)
    comment = get_object_or_404(Comment, pk=pk)
    if request.method == "POST":
        comment_form = CommentForm(request.POST, instance=comment)
        if comment_form.is_valid():
            comment_form.save()
            return redirect('post_view', slug=post.slug)
    else:
        comment_form = CommentForm(instance=comment)

    return render(request, 'blog/edit_comment.html', {'comment_form': comment_form, 'post': post, 'comment': comment})


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


def change_category(request, slug):
    category = Category.objects.filter(slug=slug)
    categories = Category.objects.all().order_by('order')
    posts = Post.objects.filter(category=category).order_by('published_date')
    return render(request, 'blog/posts.html', {'posts': posts, 'category': category[0], 'categories': categories})


@login_required
def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    # Fetch posts with given category and send them to drafts
    posts = Post.objects.filter(category_id=pk)
    for post in posts:
        post.category = None
        post.is_published = False
        post.save()
    category.delete()
    return redirect("/blog")


def update_reaction(request, slug, reaction):
    post = get_object_or_404(Post, slug=slug)
    response = get_object_or_404(PostResponse, post=post)

    if str(slug) not in request.session:
        request.session[str(slug)] = True

    if request.session[str(slug)]:
        # Reaction is a number 1-4 by increasingly good reactions
        if int(reaction) is 1:
            response.great += 1
            response.save()
        elif int(reaction) is 2:
            response.good += 1
            response.save()
        elif int(reaction) is 3:
            response.poor += 1
            response.save()
        elif int(reaction) is 4:
            response.bad += 1
            response.save()
        request.session[str(slug)] = False
        send_mail(
            'New reaction on \"' + str(post) + '\"',
            "Reaction #: " + reaction + "\n\n https://www.ebonsignori.com" + request.path +
            "\n\n IP: " + request.META.get('REMOTE_ADDR'),
            'evan@ebonsignori.com',
            ['evanabonsignori@gmail.com'],
            fail_silently=False,
            # html_message=True,
        )

    return redirect('post_view', slug=post.slug)
