from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Book
from .serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import BookFilter, PageFilter
from rest_framework.permissions import IsAuthenticated
from user.permissions import IsAuthorOrReadOnly

# Create your views here.

class BookDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class BookListCreateView(ListCreateAPIView):    
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter
    pagination_class = PageFilter
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    