from rest_framework.views import APIView
from rest_framework.response import Response

class ImmigrationStatusView(APIView):
    def get(self, request):
        return Response({'module': 'immigration', 'status': 'coming soon'})
