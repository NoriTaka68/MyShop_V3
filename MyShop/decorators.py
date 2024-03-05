from django.views.decorators.csrf import csrf_protect
from functools import wraps


def csrf_protect_decorator(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        return csrf_protect(view_func)(request, *args, **kwargs)

    return _wrapped_view
