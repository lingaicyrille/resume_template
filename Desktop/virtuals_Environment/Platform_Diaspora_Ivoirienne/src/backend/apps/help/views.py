from rest_framework.views import APIView
from rest_framework.response import Response

class HelpStatusView(APIView):
    def get(self, request):
        return Response({'module': 'help', 'status': 'coming soon'})
