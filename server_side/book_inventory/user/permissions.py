from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow users with the 'author' permission
    to edit or delete books.
    """

    def has_permission(self, request, view):
        # Grant read-only access for safe methods (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # For DELETE and PUT/PATCH, check if the user has 'author' permission
        return request.user.has_perm('book.author')
