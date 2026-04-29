from rest_framework.views import APIView
from rest_framework.response import Response

class EventsStatusView(APIView):
    def get(self, request):
        return Response({'module': 'events', 'status': 'coming soon'})
