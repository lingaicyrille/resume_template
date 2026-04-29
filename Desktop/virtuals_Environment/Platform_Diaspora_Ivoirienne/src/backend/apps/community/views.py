from rest_framework.views import APIView
from rest_framework.response import Response

class CommunityStatusView(APIView):
    def get(self, request):
        return Response({'module': 'community', 'status': 'coming soon'})
