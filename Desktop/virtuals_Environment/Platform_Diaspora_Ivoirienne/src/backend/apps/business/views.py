from rest_framework.views import APIView
from rest_framework.response import Response

class BusinessStatusView(APIView):
    def get(self, request):
        return Response({'module': 'business', 'status': 'coming soon'})
