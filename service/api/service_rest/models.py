from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)
    sale_status = models.CharField(max_length=200, null=True)

    def __str__(self) -> str:
        return f"{self.vin}"


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name


class ServiceAppointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200, null=True)
    vip_status = models.BooleanField(default=False)
    completed = models.BooleanField(default=False, null=True)
    vin = models.CharField(max_length=17, null=True)
    technician = models.ForeignKey(
        Technician, related_name="technician", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.vin}-{self.customer_name}"

    def get_api_url(self):
        return reverse("show_automobile", kwargs={"vin": self.vin})


# Create your models here.
