from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, Category, Cart, CartItem

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_price = serializers.ReadOnlyField(source='product.price')

    class Meta:
        model = CartItem
        fields = ['id', 'product_name', 'product_price', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(source='cartitem_set', many=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Cart
        fields = ['id', 'user', 'cart_items']
