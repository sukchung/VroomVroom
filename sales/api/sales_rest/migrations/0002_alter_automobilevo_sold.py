# Generated by Django 4.0.3 on 2022-12-09 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sales_rest", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="automobilevo",
            name="sold",
            field=models.BooleanField(default=False),
        ),
    ]
