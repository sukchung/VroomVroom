# Generated by Django 4.0.3 on 2022-12-07 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technicianvo',
            name='employee_number',
            field=models.PositiveIntegerField(unique=True),
        ),
    ]
