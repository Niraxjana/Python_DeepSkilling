from django.http import HttpResponse
from rest_framework.views import APIView

from rest_framework import status
#courseviewset imports
from rest_framework import viewsets #
from .models import Course,Student,Enrollment #
from .serializers import (CourseSerializer,StudentSerializer, EnrollmentSerializer)  #
from rest_framework.decorators import action #custom action
from rest_framework.response import Response #custom action

def hello_view(request):
    return HttpResponse("Course Management API is running")
'''
class CourseListView(APIView):

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class CourseDetailView(APIView):

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return None

    def get(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return Response(status=404)

        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return Response(status=404)

        serializer = CourseSerializer(
            course,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    def delete(self, request, pk):
        course = self.get_object(pk)

        if not course:
            return Response(status=404)

        course.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )'''

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    @action(detail=True, methods=['get'])
    def student(self, request, pk=None):
        course = self.get_object()
        students= Student.objects.filter(
            enrollment__course=course
        )
        serializer = StudentSerializer(
            students, many =True
        )
        return Response(serializer.data)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset= Enrollment.objects.all()
    serializer_class = EnrollmentSerializer