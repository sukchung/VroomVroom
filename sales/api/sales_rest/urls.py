from django.urls import path
from .views import (
    api_list_salespersons,
    api_show_salesperson,
    api_list_customers,
    api_show_customer,
    api_list_sales_history,
    api_show_sales_history,
)


urlpatterns = [
    path("salespersons/", api_list_salespersons, name="api_list_salespersons"),
    path("salespersons/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("saleshistory/", api_list_sales_history, name="api_list_sales_history"),
    path("saleshistory/<int:pk>/", api_show_sales_history, name="api_show_sales_history"),
]
