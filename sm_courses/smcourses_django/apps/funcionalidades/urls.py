from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LogViewSet, ProfessorViewSet, AlunoViewSet, AulaViewSet, CursoViewSet, CertificadoViewSet, CursoAulasView
from .views import login_view, aluno_progresso, logout_view, registrar_aula_assistida, get_aluno_id
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
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
    path('alunos/<int:aluno_id>/progresso/', aluno_progresso, name='aluno_progresso'),
    path('api/logout/', logout_view, name='logout'),
    path('/api/registrar-aula-assistida', registrar_aula_assistida, name='registrar_aula'),
    path('api/aluno-id/', get_aluno_id, name='get_aluno_id'),

    # Endpoint para obter o token de acesso
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Endpoint para renovar o token de acesso
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Endpoint para verificar a validade do token
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
