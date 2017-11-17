from django.db import models
from markdownx.models import MarkdownxField
from django.utils.text import slugify
from django.utils import timezone


class Post(models.Model):
    author = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=500)
    preview = models.ForeignKey('blog.PostDisplayImage', null=True, blank=True, related_name='preview_image')
    header_image = models.ImageField(null=True, blank=True)
    category = models.ForeignKey('blog.Category', on_delete=models.SET_NULL, null=True, blank=True)
    text = MarkdownxField()
    created_date = models.DateTimeField(
            default=timezone.now)
    updated_date = models.DateTimeField(
            blank=True, null=True)
    published_date = models.DateTimeField(
        blank=True, null=True)

    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    slug = models.SlugField(unique=True, null=True)

    @models.permalink
    def get_absolute_url(self):
        return 'post_view', None, {'slug': self.slug}

    def create_post_responses(self):
        # Create response model corresponding to post
        if not PostResponse.objects.filter(post=self).exists():
            PostResponse.objects.create(post=self)

    def get_preview_image(self):
        return self.preview.image

    def publish(self):
        self.is_published = True
        self.published_date = timezone.now()
        self.save()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        self.updated_date = timezone.now()
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class PostDisplayImage(models.Model):
    title = models.CharField(max_length=100)
    attached_to = models.CharField(max_length=100, unique=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=100, db_index=True, unique=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True)
    header_image = models.ImageField(null=True, blank=True)
    order = models.IntegerField(unique=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey('blog.Post', related_name='comments')
    author = models.CharField(max_length=200)
    comment_body = models.TextField(max_length=5000)
    created_date = models.DateTimeField(default=timezone.now)
    approved_comment = models.BooleanField(default=False)

    def approve(self):
        self.approved_comment = True
        self.save()

    def save_to_post(self, pk):
        self.post = Post.objects.get(pk=pk)
        self.created_date = timezone.now()
        super(Comment, self).save()

    def __str__(self):
        return self.author


class PostResponse(models.Model):
    post = models.ForeignKey('blog.Post', related_name='responses')
    great = models.IntegerField(default=0)
    good = models.IntegerField(default=0)
    poor = models.IntegerField(default=0)
    bad = models.IntegerField(default=0)

    def __str__(self):
        return str(self.post.title) + "| Response."
