from django.db import models
from django.contrib.auth.models import User

# Model de Log
class Log(models.Model):
    ACTIONS = [
        ('create', 'Criação'),
        ('update', 'Atualização'),
        ('delete', 'Exclusão'),
    ]

    id_log = models.AutoField(primary_key=True)
    object_id = models.IntegerField(blank=True, null=True)  # ID do objeto alterado
    object_type = models.CharField(max_length=100)  # Tipo do objeto, por exemplo, 'Contrato'
    action = models.CharField(max_length=10, choices=ACTIONS)  # Ação realizada
    description = models.TextField(max_length=400)  # Descrição da alteração
    date_alteration = models.DateTimeField(auto_now_add=True)  # Data da alteração
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, 
        blank=True,
        related_name='logs',
    )

    def __str__(self):
        return f'{self.object_type} {self.object_id} - {self.action}'

# Model de Professor
class Professor(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    nome = models.CharField(max_length=150)
    descricao = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f'{self.id} || {self.nome} || {self.descricao}'

# Model de Certificado
class Certificado(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    descricao = models.CharField(max_length=200)
    
    def __str__(self):
        return f'{self.descricao}'

# Model de Curso
class Curso(models.Model):
    TIPOS = [
        ('front-end', 'Front-End'),
        ('programacao', 'Programação'),
        ('generico', 'Assuntos gerais'),
    ]

    id = models.AutoField(primary_key=True, unique=True)
    nome = models.CharField(max_length=150)
    descricao = models.TextField(max_length=200)
    tipo = models.CharField(max_length=150, choices=TIPOS, blank=True, null=True)
    certificado = models.ForeignKey(
        Certificado,
        on_delete=models.CASCADE,
        related_name='cursos'
    )
    professor = models.ForeignKey(
        Professor,
        on_delete=models.CASCADE,
        related_name='cursos'
    )

    def __str__(self):
        return f'{self.nome} || {self.tipo}'

# Model de Aula
class Aula(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    descricao = models.TextField(max_length=200)
    url = models.CharField(max_length=500, blank=True, null=True)
    nome = models.CharField(max_length=150)
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE,
        related_name='aulas'
    )

    def __str__(self):
        return f'{self.nome}'

# Model de Aluno
class Aluno(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    nome = models.CharField(max_length=150)
    certificados = models.ManyToManyField(Certificado, related_name='alunos')  # Muitos certificados para muitos alunos
    cursos = models.ManyToManyField(Curso, related_name='alunos')  # Muitos cursos para muitos alunos

    def __str__(self):
        return f'{self.id} || {self.nome}'
