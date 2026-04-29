from django.urls import path
from .views import BusinessStatusView

urlpatterns = [
    path('', BusinessStatusView.as_view(), name='business-status'),
]
