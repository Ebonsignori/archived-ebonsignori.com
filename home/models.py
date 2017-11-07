from django.db import models
from django.utils import timezone


# Portfolio Model
class PortfolioItem(models.Model):
    modal_id = models.CharField(max_length=500)
    modal_body = models.TextField()
    data_cat = models.CharField(max_length=500)
    display_image = models.CharField(max_length=500)
    display_image_alt_text = models.CharField(max_length=500)
    caption_title = models.CharField(max_length=500)
    caption_subtitle = models.CharField(max_length=500)

    created_date = models.DateTimeField(
            default=timezone.now)
    updated_date = models.DateTimeField(
            blank=True, null=True)

    def save(self, *args, **kwargs):
        self.updated_date = timezone.now()
        super(PortfolioItem, self).save(*args, **kwargs)

    def __str__(self):
        return self.caption_title
