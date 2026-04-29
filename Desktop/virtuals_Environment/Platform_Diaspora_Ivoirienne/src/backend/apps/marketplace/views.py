from rest_framework.views import APIView
from rest_framework.response import Response

class MarketplaceStatusView(APIView):
    def get(self, request):
        return Response({'module': 'marketplace', 'status': 'coming soon'})
