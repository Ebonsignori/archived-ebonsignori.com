# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-13 21:09
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0012_auto_20171113_1543'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='text',
            new_name='comment_body',
        ),
    ]
