# Generated by Django 4.0.3 on 2022-12-09 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0009_serviceappointment_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serviceappointment',
            name='automobile',
        ),
        migrations.RemoveField(
            model_name='serviceappointment',
            name='completed',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sale_status',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='serviceappointment',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Cancelled', 'Cancelled'), ('Completed', 'Completed')], default='Pending', max_length=20),
        ),
        migrations.AddField(
            model_name='serviceappointment',
            name='vin',
            field=models.CharField(max_length=17, null=True),
        ),
    ]
