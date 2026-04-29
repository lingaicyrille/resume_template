from django.urls import path
from .views import EventsStatusView

urlpatterns = [
    path('', EventsStatusView.as_view(), name='events-status'),
]
