import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import ServiceAppointment, Technician, AutomobileVO


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]


class ServiceAppointmentListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "customer_name",
        "technician",
        "reason",
        "date_time",
        "automobile",
        "vip_status",
        "completed",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "technician": TechnicianDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician could not be created"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "The technician you are looking for does not exist"},
                status=404,
            )
    else:
        try:
            count, _ = Technician.objects.get(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0},
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "The technician you are looking for does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_service_appointments(request, appointments_vo_id=None):
    if request.method == "GET":
        if appointments_vo_id is not None:
            appointments = ServiceAppointment.objects.filter(
                appointments=appointments_vo_id
            )
        else:
            appointments = ServiceAppointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = vin
            name = content["technician"]
            technician = Technician.objects.get(id=name)
            content["technician"] = technician
            appointment = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentListEncoder,
                safe=False,
            )

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment could not be created"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_service_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentListEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": "The appointment you are looking for does not exist"},
                status=404,
            )
    else:
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentListEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": "The appointment you are looking for does not exist"},
                status=404,
            )


# Create your views here.
