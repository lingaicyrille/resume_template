from django.urls import path
from .views import NewsStatusView

urlpatterns = [
    path('', NewsStatusView.as_view(), name='news-status'),
]
