from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    is_business = models.BooleanField(default=False)
    national_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Ad(models.Model):
    SELL_METHOD_CHOICES = [
        ('fixed', 'Fixed'),
        ('negotiable', 'Negotiable'),
        ('auction', 'Auction'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    condition = models.CharField(max_length=50)
    sell_method = models.CharField(max_length=20, choices=SELL_METHOD_CHOICES)
    image = models.ImageField(upload_to='ads/')
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

class BusinessRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=200)
    national_id = models.CharField(max_length=20)
    document = models.FileField(upload_to='business_documents/')
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ])
    created_at = models.DateTimeField(auto_now_add=True)

class Store(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='store_logos/')
    description = models.TextField()
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    national_id = models.CharField(max_length=20)

class Product(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField()
    max_ads = models.PositiveIntegerField(null=True, blank=True)
    max_categories = models.PositiveIntegerField(null=True, blank=True)
    editable_categories = models.BooleanField(default=False)
    highlight_ads = models.BooleanField(default=False)

class SubscriptionTransaction(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateTimeField(default=timezone.now)
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)

class Report(models.Model):
    reporter = models.ForeignKey(User, on_delete=models.CASCADE)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)
    reason = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
