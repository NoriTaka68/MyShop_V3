from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from shop.models import Product


# Test d'intégration

class ProductAPITest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Création de plusieurs produits pour le test
        Product.objects.create(name='Smartphone', description='Latest model', price=999.99, available=True)
        Product.objects.create(name='Laptop', description='Powerful performance', price=1299.99, available=True)

    def test_view_products(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
