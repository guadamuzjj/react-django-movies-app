# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

app_name = "frontend"

urlpatterns = [
    url(r'^$', view=views.view, name='index'),
]
