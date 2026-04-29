from django.urls import path
from .views import AdsStatusView

urlpatterns = [
    path('', AdsStatusView.as_view(), name='ads-status'),
]
