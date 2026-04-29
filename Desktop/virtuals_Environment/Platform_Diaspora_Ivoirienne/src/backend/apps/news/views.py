from rest_framework.views import APIView
from rest_framework.response import Response

class NewsStatusView(APIView):
    def get(self, request):
        return Response({'module': 'news', 'status': 'coming soon'})
