from rest_framework import viewsets
from .models import Log, Professor, Aluno, Aula, Curso, Certificado
from .serializers import LogSerializer, ProfessorSerializer, AlunoSerializer, AulaSerializer, CursoSerializer, CertificadoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    # permission_classes = [IsAuthenticated]

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    # permission_classes = [IsAuthenticated]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    # permission_classes = [IsAuthenticated]

class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer
    # permission_classes = [IsAuthenticated]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    # permission_classes = [IsAuthenticated]

class CertificadoViewSet(viewsets.ModelViewSet):
    queryset = Certificado.objects.all()
    serializer_class = CertificadoSerializer
    # permission_classes = [IsAuthenticated]

class CursoAulasView(APIView):
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

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Credenciais não fornecidas."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user:
        return Response({
            "message": "Login realizado com sucesso!",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
        }, status=status.HTTP_200_OK)

    return Response({"error": "Usuário ou senha inválidos."}, status=status.HTTP_401_UNAUTHORIZED)