# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-13 02:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20171109_2136'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolioitem',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.PortfolioCategory'),
        ),
    ]
