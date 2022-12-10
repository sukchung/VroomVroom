import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import ServiceAppointment, Technician, AutomobileVO


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href", "sale_status"]


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
        "vip_status",
        "vin",
        "completed",
    ]
    encoders = {
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


class VinInvalid(Exception):
    pass


@require_http_methods(["GET", "POST"])
def api_list_service_appointments(request, appointments_vo_id=None):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all().order_by("date_time")
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        vin = content["vin"]

        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"}, status=400)
        try:
            has_vin = AutomobileVO.objects.get(vin=vin)
        except AutomobileVO.DoesNotExist:
            has_vin = None

        if has_vin:
            content["vip_status"] = True
        else:
            content["vip_status"] = False

        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
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
    elif request.method == "PUT":
        try:
            ServiceAppointment.objects.filter(id=pk).update(completed=True)
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


@require_http_methods(["GET"])
def api_get_automobilevos(request):
    if request.method == "GET":
        automobile = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": automobile},
            encoder=AutomobileVODetailEncoder,
        )

@require_http_methods(["GET"])
def api_list_appointments_vin(request, vin):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.filter(vin=vin)
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentListEncoder,
    )
# Create your views here.
