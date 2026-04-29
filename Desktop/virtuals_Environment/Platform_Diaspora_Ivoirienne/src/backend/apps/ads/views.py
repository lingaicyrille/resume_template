from rest_framework.views import APIView
from rest_framework.response import Response

class AdsStatusView(APIView):
    def get(self, request):
        return Response({'module': 'ads', 'status': 'coming soon'})
