from django.urls import path
from .views import ImmigrationStatusView

urlpatterns = [
    path('', ImmigrationStatusView.as_view(), name='immigration-status'),
]
