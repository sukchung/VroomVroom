from django.urls import path
from .views import (
    api_list_technicians,
    api_show_technician,
    api_list_service_appointments,
    api_show_service_appointment,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technican"),
    path("appointments/", api_list_service_appointments, name="api_list_service_appointments"),
    path("appointments/<int:pk>/", api_show_service_appointment, name="api_show_sales_history"),
]
