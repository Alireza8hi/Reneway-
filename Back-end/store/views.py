from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserCreateAPIView(APIView):
    @swagger_auto_schema(
        operation_description="Create a new user",
        request_body=UserSerializer,
        responses={201: UserSerializer, 400: 'Bad Request'}
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)