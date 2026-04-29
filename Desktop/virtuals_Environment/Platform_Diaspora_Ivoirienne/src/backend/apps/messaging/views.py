from rest_framework.views import APIView
from rest_framework.response import Response

class MessagingStatusView(APIView):
    def get(self, request):
        return Response({'module': 'messaging', 'status': 'coming soon'})
