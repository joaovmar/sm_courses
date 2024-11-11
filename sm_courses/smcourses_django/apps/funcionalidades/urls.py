from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LogViewSet, ProfessorViewSet, AlunoViewSet, AulaViewSet, CursoViewSet, CertificadoViewSet

router = DefaultRouter()
router.register(r'logs', LogViewSet)
router.register(r'professores', ProfessorViewSet)
router.register(r'alunos', AlunoViewSet)
router.register(r'aulas', AulaViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'certificados', CertificadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
