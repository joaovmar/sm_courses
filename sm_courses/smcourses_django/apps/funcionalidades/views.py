from rest_framework import viewsets
from .models import Log, Professor, Aluno, Aula, Curso, Certificado
from .serializers import LogSerializer, ProfessorSerializer, AlunoSerializer, AulaSerializer, CursoSerializer, CertificadoSerializer
from rest_framework.permissions import IsAuthenticated

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAuthenticated]

class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer
    permission_classes = [IsAuthenticated]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

class CertificadoViewSet(viewsets.ModelViewSet):
    queryset = Certificado.objects.all()
    serializer_class = CertificadoSerializer
    permission_classes = [IsAuthenticated]
