from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    """Permission permettant uniquement aux superutilisateurs d'accéder à une vue."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)
