(function () {
      'use strict';

      var app = angular.module('blinkitApp', []);

      app.controller('CartCtrl', function ($scope, $timeout, $interval) {
        
        // REPLACED CATEGORY ARRAY TO PERFECTLY MATCH THE PRODUCT DATA
        $scope.categories = [
          { id: 'Dairy', name: '🥛 Pure Dairy & Probiotics' },
          { id: 'Bakery', name: '🍞 Fresh Bakery' },
          { id: 'Snacks', name: '🍿 Clean Snacks & Crisps' },
          { id: 'Fruits', name: '🍎 Fresh Fruits' },
          { id: 'Beverages', name: '🧃 Beverages & Drinks' },
          { id: 'Frozen', name: '🍦 Frozen Delights' }
        ];

        $scope.activeCategory = 'Dairy';
        $scope.searchQuery = '';
        $scope.sortStrategy = 'popularity';
        $scope.toasts = [];
        
        $scope.checkoutStage = 'none';
        $scope.selectedMethod = 'upi';
        $scope.timerSeconds = 3;

        var sampleAddresses = [
          { title: 'Home Sanctuary', address: 'Apartment 4B, Lotus Green Towers, Sector 45' },
          { title: 'Creative Studio Office', address: 'Tech Innovation Space, Floor 2, Block C, Phase 3' }
        ];
        var addressIndex = 0;
        $scope.activeAddress = sampleAddresses[addressIndex];

        $scope.switchAddress = function() {
          addressIndex = (addressIndex + 1) % sampleAddresses.length;
          $scope.activeAddress = sampleAddresses[addressIndex];
          $scope.showToast("Switched delivery destination to " + $scope.activeAddress.title, "info");
        };

        $scope.setCategory = function(catId) {
          $scope.activeCategory = catId;
        };

        $scope.showToast = function(msg, type) {
          var id = Date.now();
          var newToast = { id: id, message: msg, type: type || 'success' };
          $scope.toasts.push(newToast);
          $timeout(function() {
            $scope.toasts = $scope.toasts.filter(function(t) { return t.id !== id; });
          }, 3500);
        };

       
        // ADD RATINGS TO PREVENT UI ERRORS (Since product data lacked a rating attribute)
        $scope.products = productsData;
        $scope.products.forEach(function(p) {
          // Generates a predictable, static mock rating between 4.0 - 5.0 so sorting works seamlessly
          p.rating = (4.0 + (p.id % 11) / 10).toFixed(1); 
        });

        $scope.platformFee = 10;
        $scope.cart = { items: [] };
        $scope.Math = window.Math;

        $scope.productFilter = function(product) {
          if ($scope.searchQuery && $scope.searchQuery.trim() !== '') {
            return product.name.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1;
          }
          return product.category === $scope.activeCategory;
        };

        $scope.sortExpression = function(product) {
          if ($scope.sortStrategy === 'priceLow') return product.price;
          if ($scope.sortStrategy === 'priceHigh') return -product.price;
          return -product.rating; 
        };

        $scope.getIcon = function(id) {
          var matching = $scope.products.find(function(p){ return p.id === id; });
          return matching ? matching.icon : '🛍️';
        };

        $scope.isImageUrl = function(iconStr) {
          if (!iconStr) return false;
          return iconStr.indexOf('/') !== -1 || iconStr.indexOf('.') !== -1;
        };

        function findItem(id) {
          return $scope.cart.items.find(function (x) { return x.id === id; });
        }

        $scope.isInCart = function(id) { return !!findItem(id); };
        $scope.getCartItem = function(id) { return findItem(id); };

        $scope.add = function (p) {
          var it = findItem(p.id);
          if (it) {
            it.qty += 1;
          } else {
            $scope.cart.items.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
          }
          $scope.showToast("Added " + p.name + " to your harvest basket.");
        };

        $scope.inc = function (it) { it.qty += 1; };

        $scope.dec = function (it) {
          it.qty -= 1;
          if (it.qty <= 0) {
            var idx = $scope.cart.items.indexOf(it);
            if (idx >= 0) {
              $scope.cart.items.splice(idx, 1);
              $scope.showToast("Removed " + it.name + " from basket.", "info");
            }
          }
        };

        $scope.remove = function (it) {
          var idx = $scope.cart.items.indexOf(it);
          if (idx >= 0) {
            $scope.cart.items.splice(idx, 1);
            $scope.showToast("Removed " + it.name + " from basket.", "info");
          }
        };

        $scope.triggerCheckout = function() {
          if ($scope.cart.items.length === 0) return;
          $scope.selectedMethod = 'upi';
          $scope.checkoutStage = 'payment';
        };

        $scope.selectPayment = function(method) {
          $scope.selectedMethod = method;
        };

        $scope.cancelCheckout = function() {
          $scope.checkoutStage = 'none';
        };

        $scope.proceedToVerify = function() {
          $scope.checkoutStage = 'verifying';
          $scope.timerSeconds = 3;
          
          var countdown = $interval(function() {
            $scope.timerSeconds--;
            if ($scope.timerSeconds <= 0) {
              $interval.cancel(countdown);
              $scope.checkoutStage = 'success';
            }
          }, 1000);
        };

        $scope.closeSuccessScreen = function() {
          $scope.cart.items = [];
          $scope.checkoutStage = 'none';
          $scope.searchQuery = '';
          $scope.activeCategory = 'Dairy'; // Reverts to match default on completion
        };

        function computeTotals() {
          var subtotal = 0;
          var itemsCount = 0;
          for (var i = 0; i < $scope.cart.items.length; i++) {
            var it = $scope.cart.items[i];
            subtotal += it.price * it.qty;
            itemsCount += it.qty;
          }
          $scope.subtotal = subtotal;
          $scope.itemsCount = itemsCount;

          var chargedBase = subtotal + $scope.platformFee;
          $scope.delivery = (chargedBase > 149 || subtotal === 0) ? 0 : 30;
          $scope.total = subtotal + $scope.platformFee + $scope.delivery;
          $scope.discountEligible = $scope.total > 599;

          var seed = ($scope.itemsCount * 9301 + subtotal * 49297) % 233280;
          var rnd = seed / 233280;

          $scope.hasDiscount = $scope.discountEligible && rnd < 0.85; 
          $scope.discount = $scope.hasDiscount ? Math.round(0.15 * $scope.total) : 0;
          $scope.finalTotal = $scope.total - $scope.discount;
        }

        $scope.$watch('cart.items', function () {
          computeTotals();
        }, true);
      });
    })();
