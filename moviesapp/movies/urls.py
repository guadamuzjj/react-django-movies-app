# # -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

from .views import MovieViewSet, MovieRatingView, MovieCommentView

app_name = 'api'


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet, basename='user')

# Wire up our API using automatic URL routing.
urlpatterns = [
    url(r'^movies/(?P<id>[\d\-]+)/rating/$', MovieRatingView),
    url(r'^movies/(?P<id>[\d\-]+)/comment/$', MovieCommentView)
]

urlpatterns += router.urls
