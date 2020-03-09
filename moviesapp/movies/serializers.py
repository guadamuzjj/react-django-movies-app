
from rest_framework import serializers
from .models import Movie, Comment


class CommentSerializer(serializers.ModelSerializer):
    movie = serializers.StringRelatedField()
    class Meta:
        model = Comment
        fields = ['comment', 'movie']


class MovieSerializer(serializers.ModelSerializer):
    movie_comments = CommentSerializer(many=True)
    
    class Meta:
        model = Movie
        fields = ['id', 'title', 'year', 'rating', 'rated', 'released_on', 'genre', 'director', 'plot', 'movie_comments']
