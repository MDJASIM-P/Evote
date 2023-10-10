from django.shortcuts import render

# Create your views here.


from .serializers import CandidateSerializer
from .models import Candidate
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import action
class CandidateView(ModelViewSet):
    queryset=Candidate.objects.all()
    serializer_class=CandidateSerializer
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    filter_backends = [filters.OrderingFilter]
    ordering_fields= ['votes']
    def create(self, request, *args, **kwargs):
        serializer = CandidateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    @action(detail=False, methods=['GET'])
    def EventCandidates(self, request):
        # Retrieve the 'ids' query parameter and split it into a list of IDs
        ids = self.request.query_params.get('ids', '').split(',')
        queryset = Candidate.objects.all()

        # Filter the candidates by the 'ids' query parameter
        if ids:
            queryset = queryset.filter(id__in=ids)
        queryset = queryset.order_by('-votes')
        serializer=CandidateSerializer(queryset, many=True)
        return Response(serializer.data)

