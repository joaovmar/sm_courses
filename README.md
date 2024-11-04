# Configuração de um Backend Django para Projeto React

Este guia cobre a configuração de um backend Django usando Django REST Framework para fornecer dados a uma aplicação React.

## 1. Criação do Ambiente Virtual e Instalação do Django

1. Crie e ative um ambiente virtual:

    ```bash
    python -m venv env
    source env/bin/activate  # No Windows, use env\Scripts\activate
    ```

2. Instale o Django e Django REST Framework:

    ```bash
    pip install django djangorestframework
    ```

## 2. Criação do Projeto e do App Django

1. Crie o projeto Django:

    ```bash
    django-admin startproject myproject
    cd myproject
    ```

2. Crie um app dentro do projeto:

    ```bash
    python manage.py startapp api
    ```

## 3. Configuração do Django REST Framework

1. No arquivo `settings.py`, adicione `rest_framework` e o app `api` em `INSTALLED_APPS`:

    ```python
    # settings.py
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',  # Django REST Framework
        'api',              # App de sua API
    ]
    ```

## 4. Definição de Modelos e Serializers

1. Crie o modelo no arquivo `api/models.py`. Exemplo com `UserProfile`:

    ```python
    # api/models.py
    from django.db import models

    class UserProfile(models.Model):
        username = models.CharField(max_length=100)
        email = models.EmailField(unique=True)
        group = models.CharField(max_length=100)
    ```

2. Crie um serializer em `api/serializers.py` para definir como o modelo será convertido para JSON:

    ```python
    # api/serializers.py
    from rest_framework import serializers
    from .models import UserProfile

    class UserProfileSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = ['id', 'username', 'email', 'group']
    ```

## 5. Criação das Views para a API

1. Em `api/views.py`, configure uma `ViewSet` para lidar com operações de listagem e criação de `UserProfile`:

    ```python
    # api/views.py
    from rest_framework import viewsets
    from .models import UserProfile
    from .serializers import UserProfileSerializer

    class UserProfileViewSet(viewsets.ModelViewSet):
        queryset = UserProfile.objects.all()
        serializer_class = UserProfileSerializer
    ```

## 6. Configuração das URLs da API

1. No arquivo `api/urls.py`, defina as rotas para as views usando `routers`:

    ```python
    # api/urls.py
    from rest_framework.routers import DefaultRouter
    from .views import UserProfileViewSet

    router = DefaultRouter()
    router.register(r'users', UserProfileViewSet, basename='userprofile')

    urlpatterns = router.urls
    ```

2. Inclua essas URLs no arquivo `myproject/urls.py`:

    ```python
    # myproject/urls.py
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include('api.urls')),  # Inclui as rotas da API
    ]
    ```

## 7. Configuração de CORS (Cross-Origin Resource Sharing)

Para permitir que o frontend React se conecte ao backend Django:

1. Instale o `django-cors-headers`:

    ```bash
    pip install django-cors-headers
    ```

2. No `settings.py`, adicione `corsheaders` em `INSTALLED_APPS` e configure o middleware:

    ```python
    # settings.py
    INSTALLED_APPS = [
        ...,
        'corsheaders',  # Permite CORS
        ...,
    ]

    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        ...,
    ]

    # Permitir todas as origens (para desenvolvimento)
    CORS_ALLOW_ALL_ORIGINS = True
    ```

## 8. Migração e Execução do Servidor

1. Crie as migrações para o modelo `UserProfile` e aplique-as ao banco de dados:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

2. Inicie o servidor Django:

    ```bash
    python manage.py runserver
    ```

---

Agora, seu backend Django está pronto para fornecer dados à aplicação React! A API está configurada para responder no endpoint `http://127.0.0.1:8000/api/users/`.
