# -*- coding: utf-8 -*-

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import MovieSerializer
from .models import Movie, Rating, Comment
from django.db.models import Avg


class MovieViewSet(viewsets.ViewSet):
    serializer_class = MovieSerializer
    
    def list(self, request):
        queryset = Movie.objects.order_by('-released_on')
        serializer = MovieSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Movie.objects.all()
        movie = get_object_or_404(queryset, pk=pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['POST'])
def MovieRatingView(request, id):
    movie = Movie.objects.get(id=id)
    if request.method == 'POST':
        if 'rating' in request.data:
          try:
            rating = Rating(movie=movie, rating=request.data['rating'])
            rating.save()
            serializer = MovieSerializer(Movie.objects.get(id=id))
            return Response(serializer.data)
          except:
            return Response({'status': 'failed'})
        


@api_view(['POST'])
def MovieCommentView(request, id):
    movie = Movie.objects.get(id=id)
    if request.method == 'POST':
        if 'comment' in request.data:
          try:
            comment = Comment(movie=movie, comment=request.data['comment'])
            comment.save()
            serializer = MovieSerializer(Movie.objects.get(id=id))
            return Response(serializer.data)
          except:
            return Response({'status': 'failed'})
        
