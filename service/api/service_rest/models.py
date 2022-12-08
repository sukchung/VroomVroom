from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    # import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name


# class Customer(models.Model):
#     name = models.CharField(max_length=200)

#     def __str__(self):
#         return self.name


class ServiceAppointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200, null=True)
    vip_status = models.BooleanField(default=False)
    completed = models.BooleanField(default=False, null=True)

    automobile = models.ForeignKey(
        AutomobileVO, related_name="automobile", on_delete=models.CASCADE, null=True
    )

    technician = models.ForeignKey(
        Technician, related_name="technician", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})


# Create your models here.
