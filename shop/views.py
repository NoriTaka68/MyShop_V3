from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, Category, Cart, CartItem, User
from .serializers import ProductSerializer, CategorySerializer, UserSerializer, CartSerializer, CartItemSerializer
from rest_framework import status
from .permissions import IsSuperUser
import logging


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
# Je spécifie que seul l'administrateur pour avoir access a cette route
@permission_classes([IsSuperUser])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, id):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=204)


@api_view(['GET'])
def cart_detail(request, user_id):
    permission_classes = [IsAuthenticated]
    cart = get_object_or_404(Cart, user__id=user_id)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    product = get_object_or_404(Product, pk=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.update_or_create(
        cart=cart, product=product,
        defaults={'quantity': quantity}
    )

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def update_cart_item(request):
    cart_item_id = request.data.get('cart_item_id')
    quantity = request.data.get('quantity')

    cart_item = get_object_or_404(CartItem, pk=cart_item_id)
    cart_item.quantity = quantity
    cart_item.save()

    return Response({'message': 'Cart item updated successfully.'})


@api_view(['DELETE'])
def remove_product_from_cart(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, pk=cart_item_id)
    cart_item.delete()

    return Response({'message': 'Product removed from cart successfully.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def cart_list(request):
    carts = Cart.objects.all()
    serializer = CartSerializer(carts, many=True)
    return Response(serializer.data)
