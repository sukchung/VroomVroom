# Generated by Django 4.0.3 on 2022-12-07 01:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AutomobileVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("vin", models.CharField(max_length=17, unique=True)),
                ("vip_status", models.CharField(max_length=25, null=True)),
                ("import_href", models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="CustomerVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="TechnicianVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                (
                    "employee_number",
                    models.PositiveIntegerField(max_length=10, unique=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ServiceAppointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("appointment_date_time", models.DateTimeField(null=True)),
                ("reason", models.CharField(max_length=200)),
                (
                    "automobile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="services",
                        to="service_rest.automobilevo",
                    ),
                ),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="services",
                        to="service_rest.customervo",
                    ),
                ),
                (
                    "technician",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="services",
                        to="service_rest.technicianvo",
                    ),
                ),
            ],
        ),
    ]
