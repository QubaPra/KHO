# Generated by Django 5.1.6 on 2025-02-22 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Trial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.CharField(choices=[('mł.', 'mł.'), ('wyw.', 'wyw.'), ('ćw.', 'ćw.')], max_length=4)),
                ('email', models.EmailField(max_length=254)),
                ('birth_date', models.DateField()),
                ('team', models.CharField(max_length=100)),
                ('mentor_mail', models.EmailField(max_length=254)),
                ('mentor_name', models.CharField(max_length=100)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('edited_time', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='do akceptacji przez opiekuna', max_length=100)),
            ],
        ),
    ]
