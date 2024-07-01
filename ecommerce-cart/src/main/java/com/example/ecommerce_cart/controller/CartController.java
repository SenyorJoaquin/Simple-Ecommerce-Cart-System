package com.example.ecommerce_cart.controller;

import com.example.ecommerce_cart.model.CartItem;
import com.example.ecommerce_cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItem>> viewCart() {
        return ResponseEntity.ok(cartService.getAllItems());
    }

    @PostMapping
    public ResponseEntity<Void> addItem(@RequestBody CartItem item) {
        cartService.addItem(item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeItem(@PathVariable String productId) {
        cartService.removeItem(productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}
