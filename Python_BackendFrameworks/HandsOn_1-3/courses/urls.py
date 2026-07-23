from django.urls import path
#from .views import CourseListView, CourseDetailView
from .views import (CourseViewSet,StudentViewSet, EnrollmentViewSet)
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import action
from rest_framework.response import Response
'''urlpatterns = [


    path(
        'courses/',
        CourseListView.as_view()
    ),

    path(
        'courses/<int:pk>/',
        CourseDetailView.as_view()
    ),
]'''
router = DefaultRouter()

router.register('courses', CourseViewSet)
router.register('students',StudentViewSet)
router.register('enrollments',EnrollmentViewSet)
urlpatterns = router.urls
