from django.shortcuts import render_to_response
from django.template import RequestContext


def handle_404(request):
    response = render_to_response('ebonsignori/404.html', {})
    response.status_code = 404
    return response


def handle_500(request):
    response = render_to_response('ebonsignori/500.html', {})
    response.status_code = 500
    return response