from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserListAccessTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.superuser = User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
        cls.normal_user = User.objects.create_user('user', 'user@example.com', 'userpass')

    def test_superuser_access(self):
        refresh = RefreshToken.for_user(self.superuser)
        access_token = str(refresh.access_token)
        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_normal_user_access(self):
        refresh = RefreshToken.for_user(self.normal_user)
        access_token = str(refresh.access_token)
        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
