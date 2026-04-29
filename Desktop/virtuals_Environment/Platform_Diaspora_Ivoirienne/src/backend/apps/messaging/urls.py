from django.urls import path
from .views import MessagingStatusView

urlpatterns = [
    path('', MessagingStatusView.as_view(), name='messaging-status'),
]
