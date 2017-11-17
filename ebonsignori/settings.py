import os
from datetime import datetime

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Manually installed
    'markdownx',

    # My Apps
    'home.apps.HomeConfig',
    'blog.apps.BlogConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ebonsignori.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # Custom Template Tags
            'libraries':{
                'add_css': 'ebonsignori.templatetags.add_css',
            }
        },
    },
]

WSGI_APPLICATION = 'ebonsignori.wsgi.application'


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'BlogDatabase'),
    }
}


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True

APPEND_SLASH = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'public')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

# Where markdownx stores images
# MARKDOWNX_MEDIA_PATH = os.path.join(BASE_DIR, 'public/static/markdownx')
# MARKDOWNX_UPLOAD_URLS_PATH = os.path.join(BASE_DIR, 'public/static/markdownx')
# MARKDOWNX_URLS_PATH = os.path.join(BASE_DIR, 'static/images/markdownx')
MARKDOWNX_MEDIA_PATH = datetime.now().strftime('markdownx/%Y/%m/%d')
MARKDOWNX_EDITOR_RESIZABLE = True
MARKDOWNX_MARKDOWN_EXTENSIONS = [
    'markdown.extensions.extra',
    'markdown.extensions.wikilinks',
    'markdown.extensions.toc'
]

# Login Options
LOGIN_REDIRECT_URL = '/blog/'
LOGOUT_REDIRECT_URL = '/blog/'

# Email
EMAIL_HOST = 'sub5.mail.dreamhost.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'evan@ebonsignori.com'
EMAIL_HOST_PASSWORD = 'Kvothe586843'
EMAIL_USE_TLS = True

# Media Files
MEDIA_ROOT = os.path.join(BASE_DIR, 'public/uploads/')
MEDIA_URL ='/uploads/'
