from django.contrib import admin

from .models import PortfolioItem, Acknowledgements, PortfolioCategory

admin.site.register([PortfolioItem, PortfolioCategory, Acknowledgements])