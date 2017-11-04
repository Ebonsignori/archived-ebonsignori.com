from django.db import models
from markdownx.models import MarkdownxField
from django.utils.text import slugify
from django.utils import timezone


class Post(models.Model):
    author = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey('blog.Category')
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
        return ('post_view', None, {'slug': self.slug})

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


class Category(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True)

    def __str__(self):
        return self.title
