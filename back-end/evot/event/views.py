from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import EventSerializer
from .models import Event
from candidate.models import Candidate
from candidate.serializers import CandidateSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
class EventView(ModelViewSet):
    queryset=Event.objects.all()
    serializer_class=EventSerializer
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    # checking the user in event
    # http://127.0.0.1:8000/event/is_cnd?event=${eid}
    @action(detail=False, methods=['GET'])
    def is_cnd(self, request):
        eid = request.query_params.get('event')
        event = Event.objects.get(id=eid)
        candidates = event.candidates.all()
        for i in candidates:
            if(i.student == request.user):
                serializer = CandidateSerializer(i)
                return Response(serializer.data)
        return Response(False)
    # checking th euser in voters
    @action(detail=False, methods=['GET'])
    def is_voter(self, request):
        eid = request.query_params.get('event')
        event = Event.objects.get(id=eid)
        if request.user in event.voters.all():
            return Response(True)
        return Response(False)
        
            
    # Add new candidate in event
    # http://127.0.0.1:8000/event/${eid}/?cnd=${cid}/?u=${u}
    def partial_update(self, request, pk=None):
        cid = request.query_params.get('cid')
        u = request.query_params.get('u')
        event = Event.objects.get(pk=pk) 
        
        # add user to voters list 
        if u == '1':
            # Check if the user is already a voter in the event
            if request.user not in event.voters.all():
                event.voters.add(request.user)
                event.save()
                c = Candidate.objects.get(id=cid)
                c.votes +=1
                c.save()
                return Response({'msg':'user added to voters and added 1 vote'})
            else:
                return Response({'msg':'You Already voted'})
        # add new candidate to event
        else:
            try:
                c = Candidate.objects.get(id=cid)
                # Check if the candidate is already in the event
                if c not in event.candidates.all():
                    event.candidates.add(c)
                    event.save()
                else:
                    return Response({'msg': 'Candidate already in the event'})
            except Candidate.DoesNotExist:
                return Response({'msg': 'Candidate not found'})

        serializer = EventSerializer(event)
        return Response(serializer.data)




