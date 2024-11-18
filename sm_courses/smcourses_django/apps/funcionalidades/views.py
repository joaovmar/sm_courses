from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .models import Log, Professor, Aluno, Aula, AlunoCursoProgresso, Curso, Certificado
from .serializers import UserSerializer, LogSerializer, ProfessorSerializer, AlunoSerializer, AulaSerializer, CursoSerializer, CertificadoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.db.models.signals import post_save
from django.dispatch import receiver
import random
import string
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [AllowAny]

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [AllowAny]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [AllowAny]

class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer
    permission_classes = [AllowAny]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [AllowAny]

class CertificadoViewSet(viewsets.ModelViewSet):
    queryset = Certificado.objects.all()
    serializer_class = CertificadoSerializer
    permission_classes = [AllowAny]

class CursoAulasView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, id):
        try:
            curso = Curso.objects.get(pk=id)
            aulas = curso.aulas.all()  # Supondo que `related_name='aulas'` está definido no modelo Aula
            data = [
                {
                    "id": aula.id,
                    "nome": aula.nome,
                    "professor": curso.professor.nome,
                    "duracao": "Duração não especificada",
                    "videoUrl": aula.url,  # Certifique-se de que o campo `url` contém o link do vídeo
                }
                for aula in aulas
            ]
            return Response(data, status=status.HTTP_200_OK)
        except Curso.DoesNotExist:
            return Response({"error": "Curso não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Credenciais não fornecidas."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user:
        # Gera os tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login realizado com sucesso!",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)

    return Response({"error": "Usuário ou senha inválidos."}, status=status.HTTP_401_UNAUTHORIZED)

# Função para gerar senha aleatória
@permission_classes([AllowAny])
def generate_random_password(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

@permission_classes([AllowAny])
@receiver(post_save, sender=Professor)
def create_user_for_professor(sender, instance, created, **kwargs):
    if created:
        # Criar grupo "Professor" se não existir
        group, _ = Group.objects.get_or_create(name="Professor")

        # Gerar senha aleatória
        password = generate_random_password()

        # Criar usuário associado ao professor
        user = User.objects.create_user(
            username=instance.email,
            email=instance.email,
            password=password,
            first_name=instance.nome.split()[0],
            last_name=" ".join(instance.nome.split()[1:]) if len(instance.nome.split()) > 1 else "",
        )
        user.groups.add(group)  # Adicionar o usuário ao grupo "Professor"
        user.save()

        # (Opcional) Log ou envio de e-mail com a senha gerada
        print(f"Usuário criado para Professor {instance.nome}. Senha: {password}")
        # send_password_email(instance.email, password)  # Implementar envio de e-mail caso necessário

@permission_classes([AllowAny])
@receiver(post_save, sender=Aluno)
def create_user_for_aluno(sender, instance, created, **kwargs):
    if created:
        # Criar grupo "Aluno" se não existir
        group, _ = Group.objects.get_or_create(name="Aluno")

        # Gerar senha aleatória
        password = generate_random_password()

        # Criar usuário associado ao aluno
        user = User.objects.create_user(
            username=instance.email,
            email=instance.email,
            password=password,
            first_name=instance.nome.split()[0],
            last_name=" ".join(instance.nome.split()[1:]) if len(instance.nome.split()) > 1 else "",
        )
        user.groups.add(group)  # Adicionar o usuário ao grupo "Aluno"
        user.save()

        # (Opcional) Log ou envio de e-mail com a senha gerada
        print(f"Usuário criado para Aluno {instance.nome}. Senha: {password}")
        # send_password_email(instance.email, password)  # Implementar envio de e-mail caso necessário

from django.core.mail import send_mail

@permission_classes([AllowAny])
def send_password_email(email, password):
    send_mail(
        subject="Sua conta foi criada",
        message=f"Sua conta foi criada com sucesso! \nUsuário: {email} \nSenha: {password}",
        from_email="admin@seusite.com",
        recipient_list=[email],
        fail_silently=False,
    )

class MeusCursosView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        aluno = request.user
        progresso = AlunoCursoProgresso.objects.filter(aluno=aluno).select_related('curso')
        data = [
            {
                "curso_id": prog.curso.id,
                "curso_nome": prog.curso.nome,
                "descricao": prog.curso.descricao,
                "progresso": prog.progresso
            }
            for prog in progresso
        ]
        return Response(data, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    """
    Realiza o logout do usuário ao invalidar o token de refresh.
    """
    try:
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Token de refresh não fornecido."}, status=400)

        token = RefreshToken(refresh_token)
        token.blacklist()  # Invalida o token

        return Response({"message": "Logout realizado com sucesso."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def get_aluno_id(request):
    user = request.user
    if user.is_authenticated:
        return Response({"aluno_id": user.id}, status=200)
    return Response({"error": "Usuário não autenticado"}, status=401)