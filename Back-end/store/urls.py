from .views import UserCreateAPIView, LoginAPIView, LogoutAPIView
from django.urls import path

urlpatterns = [
    path('register/', UserCreateAPIView.as_view(), name='user-register'),
    path('login/', LoginAPIView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
]