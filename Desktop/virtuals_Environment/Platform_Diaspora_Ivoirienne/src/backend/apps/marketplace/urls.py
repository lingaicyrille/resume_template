from django.urls import path
from .views import MarketplaceStatusView

urlpatterns = [
    path('', MarketplaceStatusView.as_view(), name='marketplace-status'),
]
