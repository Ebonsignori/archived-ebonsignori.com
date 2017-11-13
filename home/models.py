from django.db import models
from django.utils import timezone


# Portfolio Category
class PortfolioCategory(models.Model):
    title = models.CharField(max_length=100)
    data_cat = models.CharField(max_length=100)

    def __str__(self):
        return self.title


# Portfolio Item
class PortfolioItem(models.Model):
    # Portfolio Modal (When caption is pressed on)
    modal_id = models.CharField(max_length=500)
    modal_header = models.CharField(max_length=500)
    modal_subtitle = models.CharField(max_length=500)
    modal_image = models.ImageField(max_length=500, null=True, blank=True)
    modal_date = models.CharField(max_length=500)
    modal_client = models.CharField(max_length=500)

    modal_body = models.TextField()

    # Portfolio Caption (Homepage display)
    display_image = models.ImageField()
    display_image_alt_text = models.CharField(max_length=500)
    caption_title = models.CharField(max_length=500)
    caption_subtitle = models.CharField(max_length=500)

    category = models.ForeignKey(PortfolioCategory, on_delete=models.SET_NULL, null=True)

    created_date = models.DateTimeField(
            default=timezone.now)
    updated_date = models.DateTimeField(
            blank=True, null=True)

    def save(self, *args, **kwargs):
        self.updated_date = timezone.now()
        super(PortfolioItem, self).save(*args, **kwargs)

    def __str__(self):
        return self.caption_title


# Acknowledgements
class Acknowledgements(models.Model):
    subject = models.CharField(max_length=500)
    link = models.CharField(max_length=500, blank=True, null=True)
    link_text = models.CharField(max_length=500, blank=True, null=True)
    description = models.CharField(max_length=500)
    order = models.IntegerField()

    used_link = models.CharField(max_length=500, blank=True, null=True)
    used_text = models.CharField(max_length=500, blank=True, null=True)

    created_date = models.DateTimeField(
        default=timezone.now)
    used_date = models.DateTimeField(
        blank=True, null=True)
    updated_date = models.DateTimeField(
        blank=True, null=True)

    def save(self, *args, **kwargs):
        self.updated_date = timezone.now()
        super(Acknowledgements, self).save(*args, **kwargs)

    def __str__(self):
        return self.subject