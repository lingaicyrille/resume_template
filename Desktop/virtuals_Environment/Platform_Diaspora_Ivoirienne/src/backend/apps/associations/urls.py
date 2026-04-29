from django.urls import path
from .views import AssociationsStatusView

urlpatterns = [
    path('', AssociationsStatusView.as_view(), name='associations-status'),
]
