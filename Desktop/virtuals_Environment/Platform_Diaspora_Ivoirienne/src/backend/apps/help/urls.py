from django.urls import path
from .views import HelpStatusView

urlpatterns = [
    path('', HelpStatusView.as_view(), name='help-status'),
]
