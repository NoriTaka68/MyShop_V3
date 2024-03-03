from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from shop.models import Product, Cart, CartItem

User = get_user_model()


# Test d'intégration
class CartTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.product = Product.objects.create(name='Test Product', price=10.00)
        self.token = self.obtain_jwt_token()

    def obtain_jwt_token(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {'username': 'testuser', 'password': 'testpassword'}, format='json')
        return response.data['access']

    def test_add_product_to_cart(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        url = reverse('add_product_to_cart')
        data = {'product_id': self.product.id, 'quantity': 1}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['product_name'], 'Test Product')
        self.assertEqual(response.data['quantity'], 1)
