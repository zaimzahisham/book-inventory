from django_filters.rest_framework import FilterSet, CharFilter, DateFilter, NumberFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Book

class BookFilter(FilterSet):
    title = CharFilter(lookup_expr='icontains')
    min_date = DateFilter(field_name="publication_date", lookup_expr='gte')
    max_date = DateFilter(field_name="publication_date", lookup_expr='lte')
    price = NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Book
        fields = ['title', 'author', 'genre', 'price', 'min_date', 'max_date']


class PageFilter(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size': int(self.request.GET.get('page_size', self.page_size)),
            'page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })