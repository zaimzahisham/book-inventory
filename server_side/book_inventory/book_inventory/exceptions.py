from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    """
    Custom exception handler to modify DRF's error responses.
    """
    # Call the default exception handler provided by DRF first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Customize the response structure
        custom_response_data = {
            "error": {
                "detail": response.data,
                "status_code": response.status_code,
            }
        }
        return Response(custom_response_data, status=response.status_code)

    # If the exception is not handled by DRF, handle it here.
    return Response(
        {
            "error": {
                "detail": str(exc),
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
