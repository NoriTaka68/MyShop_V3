from django.test import TestCase
from shop.models import Product, Category


# Test Unitaire du model

class ProductModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Créez une catégorie pour le test
        cls.category = Category.objects.create(name='Electronics', description='Gadgets and more')
        # Créez un produit pour le test
        cls.product = Product.objects.create(
            name='Smartphone',
            description='Latest model',
            price=999.99,
            available=True
        )
        cls.product.categories.add(cls.category)

    def test_product_content(self):
        self.assertEqual(self.product.name, 'Smartphone')
        self.assertEqual(self.product.description, 'Latest model')
        self.assertEqual(self.product.price, 999.99)
        self.assertTrue(self.product.available)
        self.assertIn(self.category, self.product.categories.all())
