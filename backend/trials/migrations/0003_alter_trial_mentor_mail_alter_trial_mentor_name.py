# Generated by Django 5.1.6 on 2025-02-24 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trials', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trial',
            name='mentor_mail',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='trial',
            name='mentor_name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
