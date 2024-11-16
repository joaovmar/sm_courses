from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LogViewSet, ProfessorViewSet, AlunoViewSet, AulaViewSet, CursoViewSet, CertificadoViewSet, CursoAulasView
from .views import login_view

router = DefaultRouter()
router.register(r'logs', LogViewSet)
router.register(r'professores', ProfessorViewSet)
router.register(r'alunos', AlunoViewSet)
router.register(r'aulas', AulaViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'certificados', CertificadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', login_view, name='login'),
    path('cursos/<int:id>/aulas/', CursoAulasView.as_view(), name='curso-aulas'),
]
