package com.example.ecommerce_cart.service;

import com.example.ecommerce_cart.model.CartItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    private List<CartItem> cart = new ArrayList<>();

    public List<CartItem> getAllItems() {
        return cart;
    }

    public void addItem(CartItem item) {
        cart.add(item);
    }

    public void removeItem(String productId) {
        cart.removeIf(item -> item.getProductId().equals(productId));
    }

    public void clearCart() {
        cart.clear();
    }
}
