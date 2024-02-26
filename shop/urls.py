from django.urls import path
from . import views

# J'importe toutes les vues

urlpatterns = [
    # URLs pour les utilisateurs
    path('users/', views.user_list, name='user-list'),  # cette url n'est accessible uniquement à l'admin
    path('users/<int:id>/', views.user_detail, name='user-detail'),

    # URLs pour les catégories
    path('categories/', views.category_list, name='category-list'),
    path('categories/<int:id>/', views.category_detail, name='category-detail'),

    # URLs pour les produits
    path('products/', views.product_list, name='product-list'),
    path('products/<int:id>/', views.product_detail, name='product-detail'),

    # URLs pour le panier
    path('cart/<int:user_id>/', views.cart_detail, name='cart-detail'),
    path('carts/', views.cart_list, name='cart-list'),  # Liste tous les paniers
    path('cart/add/', views.add_product_to_cart, name='add_product_to_cart'),
    path('cart/update/', views.update_cart_item, name='update-cart-item'),
    path('cart/remove/<int:cart_item_id>/', views.remove_product_from_cart, name='remove-product-from-cart'),
]
