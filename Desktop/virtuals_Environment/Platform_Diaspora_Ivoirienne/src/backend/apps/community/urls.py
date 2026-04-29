from django.urls import path
from .views import CommunityStatusView

urlpatterns = [
    path('', CommunityStatusView.as_view(), name='community-status'),
]
