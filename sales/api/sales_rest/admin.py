from django.contrib import admin
from .models import *


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(PotentialCustomer)
class PotentialCustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesHistory)
class LocationAdmin(admin.ModelAdmin):
    pass
