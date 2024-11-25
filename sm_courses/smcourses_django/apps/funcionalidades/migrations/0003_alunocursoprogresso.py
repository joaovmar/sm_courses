# Generated by Django 5.1.2 on 2024-11-16 21:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('funcionalidades', '0002_alter_aluno_certificados_alter_aluno_cursos'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AlunoCursoProgresso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aluno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progresso_cursos', to=settings.AUTH_USER_MODEL)),
                ('aulas_assistidas', models.ManyToManyField(blank=True, related_name='progresso_aulas', to='funcionalidades.aula')),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aluno_progresso', to='funcionalidades.curso')),
            ],
        ),
    ]
