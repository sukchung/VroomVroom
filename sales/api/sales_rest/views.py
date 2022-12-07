from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesHistoryEncoder(ModelEncoder):
    model = SalesHistory
    properties = [
        "id",
        "sale_price",
        "salesperson",
        "customer",
        "automobile",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": PotentialCustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder = SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person could not be created"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "The sales person you are looking for does not exist"},
                status=404,
            )
    else:
        try:
            count, _ = SalesPerson.objects.get(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0},
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "The sales person you are looking for does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=PotentialCustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer could not be created"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"message:" "The customer you are looking for does not exist"},
                status=404,
            )
    else:
        try:
            count, _ = PotentialCustomer.objects.get(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0},
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"message": "The customer you are looking for does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_sales_history(request, salesperson_vo_id=None):
    if request.method == "GET":
        if salesperson_vo_id is not None:
            sales_history = SalesHistory.objects.filter(salesperson_vo_id)
        else:
            sales_history = SalesHistory.objects.all()
        return JsonResponse(
            {"sales_history": sales_history},
            encoder=SalesHistoryEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile

            salesperson = SalesPerson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson

            customer = PotentialCustomer.objects.get(id=content["customer"])
            content["customer"] = customer

            sales_history = SalesHistory.objects.create(**content)
            return JsonResponse(
                sales_history,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sales_history(request, pk):
    if request.method == "GET":
        try:
            sales_history = SalesHistory.objects.get(id=pk)
            return JsonResponse(
                sales_history,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "The sales history that you are looking for does not exist"},
                status=404,
            )
    else:
        try:
            sales_history = SalesHistory.objects.get(id=pk)
            sales_history.delete()
            return JsonResponse(
                sales_history,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "The sales history that you are looking for does not exist"},
                status=404,
            )
