# VroomVroom

Team:

* Hutch Rhees - Services
* Suk Chung - Sales

## Overview

VroomVroom is an application that manages many aspects of an automobile dealership, such as inventory, services, and sales.
This starter application comes with fully-functioning microservices using Django, a front-end application using React, and a database.

## Getting Started

1. Download Docker in terminal
    * MacOS
        ```
        brew install --cask docker
        ```
    * Windows
        ```
        winget install Docker.DockerDesktop
        ```
2. Start Docker application
3. Clone this [repository](https://gitlab.com/sukchung/project-beta) to your local computer
4. Run the following commands on your computer
    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```
5. View the web application on your browser: http://localhost:3000/
6. That is it. You are good to go! 🏁

## Application Design

![design](./images/vroomvroom-diagram.png)

## Services Microservice


## Sales Microservice
For this project, four models were created: AutomobileVO, SalesPerson, PotentialCustomer, and SalesHistory.
* The AutomobileVO (value object) model polled the vin from the Automobile model in Inventory Microservice.
* The SalesPerson model contained name and employee number fields.
* The PotentialCustomer model contained name, address, and phone number fields.
* The SalesHistory model contained sale price, salesperson (foreign key), customer (foreign key), and automobile (foreign key) fields.

### API Documentation

#### Salesperson RESTful APIs

Methods | URLs | Requests | Ports |
------------ | ------------- | ------------- | ------------- |
GET | http://localhost:8090/api/salespersons/ | Show list of salespersons | 8090 |
GET | http://localhost:8090/api/salespersons/:id/ | Show salesperson details | 8090 |
POST | http://localhost:8090/api/salespersons/ | Create new salesperson | 8090 |
DELETE | http://localhost:8090/api/salespersons/:id/ | Delete salesperson | 8090 |

* POST Request: Salesperson
    * JSON Sample Request Body Data
        ```
        {
        "name": "Levi",
        "employee_number": "1225"
        }
        ```
    * Response
        ```
        {
        "id": 7,
        "name": "Levi",
        "employee_number": "1225"
        }
        ```

#### Customer RESTful APIs

Methods | URLs | Requests | Ports |
------------ | ------------- | ------------- | ------------- |
GET | http://localhost:8090/api/customers/ | Show list of customers | 8090 |
GET | http://localhost:8090/api/customers/:id/ | Show customer details | 8090 |
POST | http://localhost:8090/api/customers/ | Create new customer | 8090 |
DELETE | http://localhost:8090/api/customers/:id/ | Delete customer | 8090 |

* POST Request: Customer
    * JSON Sample Request Body Data
        ```
        {
            "name": "Hange",
            "address": "123 Rose St",
            "phone_number": "0905170604"
        }
        ```
    * Response
        ```
        {
            "id": 8,
            "name": "Hange",
            "address": "123 Rose St",
            "phone_number": "0905170604"
        }
        ```

#### Sales History RESTful APIs

Methods | URLs | Requests | Ports |
------------ | ------------- | ------------- | ------------- |
GET | http://localhost:8090/api/saleshistory/ | Show list of sales records | 8090 |
GET | http://localhost:8090/api/saleshistory/:id/ | Show sales record details | 8090 |
POST | http://localhost:8090/api/saleshistory/ | Create sales record | 8090 |
DELETE | http://localhost:8090/api/saleshistory/:id/ | Delete sales record | 8090 |

* POST Request: Sales History
    * JSON Sample Request Body Data
        ```
        {
            "sale_price": 50000,
            "salesperson": 7,
            "customer": 8,
            "automobile": "2210434WINGS"
        }
        ```
    * Response
        ```
        {
            "id": 10,
            "sale_price": 50000,
            "salesperson": {
                "id": 7,
                "name": "Levi",
                "employee_number": 1225
            },
            "customer": {
                "id": 8,
                "name": "Hange",
                "address": "123 Rose St",
                "phone_number": 905170604
            },
            "automobile": {
                "vin": "2210434WINGS"
            }
        }
        ```
