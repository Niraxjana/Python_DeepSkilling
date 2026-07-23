"""
============================================================
HANDS-ON 1 : WEB FRAMEWORK FOUNDATIONS & DJANGO PROJECT SETUP
============================================================

1. REQUEST - RESPONSE CYCLE IN DJANGO

Example Request:
GET /api/courses/

Journey of the Request:

1. A user enters the URL /api/courses/ in the browser.

2. The browser sends an HTTP GET request to the Django server.

3. Django receives the request and checks the URL patterns
   defined in urls.py.

4. The URL router finds the matching View function/class.

5. The View contains the business logic and processes
   the request.

6. If data is required, the View interacts with the Model.

7. The Model communicates with the database and performs
   the required query.

8. The database returns the requested data to the Model.

9. The Model sends the data back to the View.

10. The View prepares an HTTP response
    (HTML page, JSON data, etc.).

11. Django sends the response back to the browser.


Flow:

Browser
   ↓
URL Router (urls.py)
   ↓
View
   ↓
Model
   ↓
Database
   ↓
Model
   ↓
View
   ↓
HTTP Response
   ↓
Browser



============================================================
2. MIDDLEWARE IN DJANGO
============================================================

Middleware is software that sits between the incoming request
and the outgoing response.

It can inspect, modify, or process requests before they
reach the View and responses before they reach the browser.

Position of Middleware:

Browser
   ↓
Middleware
   ↓
URL Router
   ↓
View
   ↓
Response
   ↓
Middleware
   ↓
Browser


Built-in Middleware Examples:

1. SecurityMiddleware

Purpose:
- Adds security-related protections.
- Helps prevent common web vulnerabilities.
- Supports HTTPS and security headers.

2. SessionMiddleware

Purpose:
- Manages user sessions.
- Stores and retrieves session data.
- Keeps users logged in across requests.



============================================================
3. WSGI VS ASGI
============================================================

WSGI (Web Server Gateway Interface)

- Traditional Python web server interface.
- Handles requests synchronously.
- Suitable for standard web applications.
- Processes one request at a time per worker.


ASGI (Asynchronous Server Gateway Interface)

- Modern asynchronous server interface.
- Supports async programming.
- Can handle many concurrent connections.
- Supports WebSockets and real-time communication.
- Suitable for chat applications, live notifications,
  and streaming services.


Difference:

WSGI  -> Synchronous processing

ASGI  -> Asynchronous processing


Django uses WSGI by default.

Django provides:

wsgi.py  -> WSGI entry point

asgi.py  -> ASGI entry point


We switch to ASGI when building:

- Real-time chat applications
- Live dashboards
- WebSocket applications
- High-concurrency systems



============================================================
4. MVC PATTERN AND DJANGO MVT PATTERN
============================================================

MVC stands for:

M -> Model
V -> View
C -> Controller


Model:
- Manages data and database operations.

View:
- Represents what the user sees.
- Handles presentation of data.

Controller:
- Handles application logic.
- Receives user input and coordinates actions.



Django follows the MVT architecture:

M -> Model
V -> View
T -> Template


Model:
- Handles database operations and data storage.

View:
- Contains business logic.
- Receives requests and returns responses.

Template:
- Defines the user interface.
- Displays data to the user.



MVC to MVT Mapping:

MVC Model       -> Django Model

MVC View        -> Django Template

MVC Controller  -> Django View



Summary:

Model    -> Data Layer

View     -> Application Logic

Template -> Presentation Layer

Django's View performs the role of the Controller in MVC,
while Django's Template performs the role of the View in MVC.
"""

"""
==================================================x========================
Django Project:

~Overall application configuration.
~Contains settings, URLs, database configuration.
~Can contain multiple apps.

Example:
Course Management System

Django App:

~A self-contained module.
~Handles one specific functionality.
~Contains its own models, views, URLs.

Example:
courses app
students app
authentication app

Note:::One project can have many apps.

"""