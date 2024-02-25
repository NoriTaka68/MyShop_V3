from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import Product, Category, Cart, CartItem

User = get_user_model()


class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = ()


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'available')
    list_filter = ('available', 'categories')
    search_fields = ('name', 'description')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


class CartAdmin(admin.ModelAdmin):
    # Personnalisez l'affichage des paniers
    list_display = ('user', 'get_items_count', 'get_total_price')
    search_fields = ('user__username',)

    def get_items_count(self, obj):
        return obj.cartitem_set.count()

    get_items_count.short_description = 'Nombre d\'articles'

    def get_total_price(self, obj):
        return sum(item.product.price * item.quantity for item in obj.cartitem_set.all())

    get_total_price.short_description = 'Prix Total'


class CartItemAdmin(admin.ModelAdmin):
    # Personnalisez l'affichage des articles du panier
    list_display = ('cart', 'product', 'quantity')
    search_fields = ('cart__user__username', 'product__name')


admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
