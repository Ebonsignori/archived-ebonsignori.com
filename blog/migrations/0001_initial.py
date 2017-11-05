# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-05 03:53
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import markdownx.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('subtitle', models.CharField(blank=True, max_length=200, null=True)),
                ('text', markdownx.models.MarkdownxField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_date', models.DateTimeField(blank=True, null=True)),
                ('published_date', models.DateTimeField(blank=True, null=True)),
                ('is_published', models.BooleanField(default=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('slug', models.SlugField(null=True, unique=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.Category')),
            ],
        ),
    ]
