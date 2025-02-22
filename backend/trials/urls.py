# backend/trials/urls.py
from rest_framework.routers import DefaultRouter
from .views import TrialViewSet

router = DefaultRouter()
router.register(r'trials', TrialViewSet)

urlpatterns = router.urls