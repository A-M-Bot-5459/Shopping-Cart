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

       $scope.products = [
  // ==========================================
  // DAIRY
  // ==========================================
  { id: 1, name: 'Milky Mist Mango Flavoured Yogurt', price: 36, weight: '100 g', icon: '🥭', category: 'Dairy' },
  { id: 2, name: 'Amul Taaza Toned Fresh Milk', price: 27, weight: '500 ml', icon: '🥛', category: 'Dairy' },
  { id: 3, name: 'Amul Malai Paneer', price: 95, weight: '200 g', icon: '🧀', category: 'Dairy' },
  { id: 4, name: 'Farm Fresh White Eggs', price: 65, weight: '6 pieces', icon: '🥚', category: 'Dairy' },
  { id: 5, name: 'Amul Butter Pasteurized', price: 58, weight: '100 g', icon: '🧈', category: 'Dairy' },
  { id: 6, name: 'Amul Cheese Slices', price: 130, weight: '200 g', icon: '🧀', category: 'Dairy' },
  { id: 7, name: 'Mother Dairy Classic Curd', price: 32, weight: '400 g', icon: '🥣', category: 'Dairy' },
  { id: 8, name: 'Amul Masti Spiced Buttermilk', price: 15, weight: '200 ml', icon: '🥛', category: 'Dairy' },
  { id: 9, name: 'Yakult Probiotic Health Drink', price: 80, weight: '5 x 65 ml', icon: '🍼', category: 'Dairy' },
  { id: 10, name: 'Epigamia Greek Yogurt - Blueberry', price: 70, weight: '120 g', icon: '🫐', category: 'Dairy' },
  { id: 11, name: 'Nandini GoodLife Toned Milk', price: 27, weight: '500 ml', icon: '🥛', category: 'Dairy' },
  { id: 12, name: 'Britannia Cheese Cubes', price: 125, weight: '200 g', icon: '🧀', category: 'Dairy' },
  { id: 13, name: 'Amul Fresh Cream', price: 65, weight: '250 ml', icon: '🍶', category: 'Dairy' },
  { id: 14, name: 'Gowardhan Cow Ghee', price: 315, weight: '500 ml', icon: '🍯', category: 'Dairy' },
  { id: 15, name: 'Milky Mist Set Curd', price: 40, weight: '500 g', icon: '🥣', category: 'Dairy' },
  { id: 16, name: 'Mother Dairy Mishti Doi', price: 75, weight: '400 g', icon: '🍮', category: 'Dairy' },
  { id: 17, name: 'Amul Kool Kesar Milk', price: 25, weight: '180 ml', icon: '🧋', category: 'Dairy' },
  { id: 18, name: 'Gowardhan Paneer Block', price: 90, weight: '200 g', icon: '🧀', category: 'Dairy' },
  { id: 19, name: 'Nestle Everyday Dairy Whitener', price: 155, weight: '400 g', icon: '☕', category: 'Dairy' },
  { id: 20, name: 'Amul Garlic & Herbs Butter', price: 55, weight: '100 g', icon: '🧈', category: 'Dairy' },

  // ==========================================
  // BAKERY
  // ==========================================
  { id: 21, name: 'Britannia Daily Fresh White Bread', price: 40, weight: '400 g', icon: '🍞', category: 'Bakery' },
  { id: 22, name: 'Harvest Gold Burger Buns', price: 30, weight: '4 pieces', icon: '🍔', category: 'Bakery' },
  { id: 23, name: 'Britannia Toastea Premium Rusk', price: 45, weight: '200 g', icon: '🥖', category: 'Bakery' },
  { id: 24, name: 'English Oven Pizza Base', price: 40, weight: '2 pieces', icon: '🍕', category: 'Bakery' },
  { id: 25, name: 'Bauli Moonfils Croissant - Choco', price: 20, weight: '45 g', icon: '🥐', category: 'Bakery' },
  { id: 26, name: 'Winkies English Butter Cake', price: 120, weight: '250 g', icon: '🍰', category: 'Bakery' },
  { id: 27, name: 'Britannia Muffills - Choco', price: 15, weight: '35 g', icon: '🧁', category: 'Bakery' },
  { id: 28, name: 'Modern 100% Whole Wheat Bread', price: 50, weight: '400 g', icon: '🍞', category: 'Bakery' },
  { id: 29, name: 'The Baker\'s Dozen Sourdough', price: 150, weight: '400 g', icon: '🥖', category: 'Bakery' },
  { id: 30, name: 'Britannia Little Hearts', price: 20, weight: '75 g', icon: '🥨', category: 'Bakery' },
  { id: 31, name: 'Bonn Multigrain Bread', price: 55, weight: '400 g', icon: '🍞', category: 'Bakery' },
  { id: 32, name: 'Elite Plum Cake', price: 150, weight: '330 g', icon: '🥮', category: 'Bakery' },
  { id: 33, name: 'Waffle Mill Classic Waffles', price: 160, weight: '200 g', icon: '🧇', category: 'Bakery' },
  { id: 34, name: 'Karachi Bakery Fruit Biscuits', price: 170, weight: '400 g', icon: '🍪', category: 'Bakery' },
  { id: 35, name: 'English Oven Garlic Bread', price: 45, weight: '200 g', icon: '🥖', category: 'Bakery' },
  { id: 36, name: 'Britannia Bourbon Chocolate Cream', price: 30, weight: '150 g', icon: '🍫', category: 'Bakery' },
  { id: 37, name: 'The Baker\'s Dozen Pita Bread', price: 60, weight: '150 g', icon: '🥙', category: 'Bakery' },
  { id: 38, name: 'Bisk Farm Just Baked Sweet Buns', price: 25, weight: '4 pieces', icon: '🧁', category: 'Bakery' },
  { id: 39, name: 'Pillsbury Choco Chip Cookie Cake', price: 40, weight: '120 g', icon: '🍪', category: 'Bakery' },
  { id: 40, name: 'Britannia 50-50 Sweet & Salty', price: 25, weight: '100 g', icon: '🍘', category: 'Bakery' },

  // ==========================================
  // SNACKS
  // ==========================================
  { id: 41, name: 'Cadbury Dairy Milk Silk', price: 80, weight: '60 g', icon: '🍫', category: 'Snacks' },
  { id: 42, name: 'Lay\'s India\'s Magic Masala', price: 20, weight: '50 g', icon: '🌶️', category: 'Snacks' },
  { id: 43, name: 'Haldiram\'s Bhujia Sev', price: 105, weight: '400 g', icon: '🥡', category: 'Snacks' },
  { id: 44, name: 'Bingo! Mad Angles Tomato Madness', price: 20, weight: '72 g', icon: '🔺', category: 'Snacks' },
  { id: 45, name: 'Parle-G Gold Biscuits', price: 25, weight: '1 kg', icon: '🍪', category: 'Snacks' },
  { id: 46, name: 'Britannia Good Day Cashew', price: 30, weight: '120 g', icon: '🍪', category: 'Snacks' },
  { id: 47, name: 'Doritos Nacho Cheese', price: 40, weight: '85 g', icon: '🧀', category: 'Snacks' },
  { id: 48, name: 'ACT II Golden Sizzle Popcorn', price: 15, weight: '30 g', icon: '🍿', category: 'Snacks' },
  { id: 49, name: 'Kurkure Masala Munch', price: 20, weight: '90 g', icon: '🌶️', category: 'Snacks' },
  { id: 50, name: 'Haldiram\'s Salted Peanuts', price: 55, weight: '200 g', icon: '🥜', category: 'Snacks' },
  { id: 51, name: 'Too Yumm! Veggie Stix', price: 20, weight: '60 g', icon: '🍟', category: 'Snacks' },
  { id: 52, name: 'Pringles Original', price: 110, weight: '110 g', icon: '🥫', category: 'Snacks' },
  { id: 53, name: 'Sunfeast Dark Fantasy Choco Fills', price: 40, weight: '75 g', icon: '🍪', category: 'Snacks' },
  { id: 54, name: 'Ferrero Rocher Chocolates', price: 149, weight: '4 pieces', icon: '🍬', category: 'Snacks' },
  { id: 55, name: 'Bikano Aloo Bhujia', price: 105, weight: '400 g', icon: '🥡', category: 'Snacks' },
  { id: 56, name: 'Cheetos Cheese Puffs', price: 15, weight: '30 g', icon: '🧀', category: 'Snacks' },
  { id: 57, name: 'Balaji Wafers Simply Salted', price: 20, weight: '65 g', icon: '🥔', category: 'Snacks' },
  { id: 58, name: 'Haldiram\'s Moong Dal', price: 55, weight: '200 g', icon: '🥣', category: 'Snacks' },
  { id: 59, name: 'Snickers Peanut Chocolate Bar', price: 50, weight: '45 g', icon: '🍫', category: 'Snacks' },
  { id: 60, name: 'Mr. Makhana Roasted Fox Nuts', price: 120, weight: '75 g', icon: '🍿', category: 'Snacks' },
  { id: 61, name: 'Kinder Joy For Kids', price: 45, weight: '20 g', icon: '🥚', category: 'Snacks' },

  // ==========================================
  // FRUITS
  // ==========================================
  { id: 62, name: 'Robusta Bananas', price: 45, weight: '500 g', icon: '🍌', category: 'Fruits' },
  { id: 63, name: 'Fresh Shimla Apples', price: 180, weight: '4 pieces', icon: '🍎', category: 'Fruits' },
  { id: 64, name: 'Nagpur Oranges', price: 110, weight: '1 kg', icon: '🍊', category: 'Fruits' },
  { id: 65, name: 'Green Seedless Grapes', price: 95, weight: '500 g', icon: '🍇', category: 'Fruits' },
  { id: 66, name: 'Ripe Papaya', price: 65, weight: '1 pc (Approx 1kg)', icon: '🍈', category: 'Fruits' },
  { id: 67, name: 'Alphonso Mangoes', price: 350, weight: '6 pieces', icon: '🥭', category: 'Fruits' },
  { id: 68, name: 'Kiran Watermelon', price: 75, weight: '1 pc (Approx 2kg)', icon: '🍉', category: 'Fruits' },
  { id: 69, name: 'Zespri Green Kiwi', price: 140, weight: '3 pieces', icon: '🥝', category: 'Fruits' },
  { id: 70, name: 'Fresh Pomegranate', price: 160, weight: '2 pieces', icon: '🔴', category: 'Fruits' }, 
  { id: 71, name: 'Imported Hass Avocados', price: 299, weight: '2 pieces', icon: '🥑', category: 'Fruits' },
  { id: 72, name: 'Fresh Dragon Fruit', price: 120, weight: '1 piece', icon: '🐉', category: 'Fruits' },
  { id: 73, name: 'Mahabaleshwar Strawberries', price: 95, weight: '200 g', icon: '🍓', category: 'Fruits' },
  { id: 74, name: 'Sweet Lime (Mosambi)', price: 85, weight: '1 kg', icon: '🍋', category: 'Fruits' },
  { id: 75, name: 'Allahabad Guava', price: 70, weight: '500 g', icon: '🍏', category: 'Fruits' }, 
  { id: 76, name: 'Kharbuja (Muskmelon)', price: 55, weight: '1 piece', icon: '🍈', category: 'Fruits' },
  { id: 77, name: 'Indian Blackberries (Jamun)', price: 110, weight: '250 g', icon: '🟣', category: 'Fruits' },
  { id: 78, name: 'Fresh Queen Pineapple', price: 99, weight: '1 piece', icon: '🍍', category: 'Fruits' },
  { id: 79, name: 'Banganapalli Mangoes', price: 180, weight: '1 kg', icon: '🥭', category: 'Fruits' },
  { id: 80, name: 'Fresh Figs (Anjeer)', price: 85, weight: '200 g', icon: '🌰', category: 'Fruits' },
  { id: 81, name: 'Red Globe Grapes', price: 145, weight: '500 g', icon: '🍇', category: 'Fruits' },
  { id: 82, name: 'Sapota (Chikoo)', price: 65, weight: '500 g', icon: '🥝', category: 'Fruits' }, 

  // ==========================================
  // BEVERAGES
  // ==========================================
  { id: 83, name: 'Coca-Cola Original', price: 40, weight: '750 ml', icon: '🥤', category: 'Beverages' },
  { id: 84, name: 'Thums Up Soft Drink', price: 40, weight: '750 ml', icon: '🥤', category: 'Beverages' },
  { id: 85, name: 'Tropicana 100% Orange Juice', price: 110, weight: '1 L', icon: '🧃', category: 'Beverages' },
  { id: 86, name: 'Red Bull Energy Drink', price: 125, weight: '250 ml', icon: '⚡', category: 'Beverages' },
  { id: 87, name: 'Bisleri Mineral Water', price: 20, weight: '1 L', icon: '💧', category: 'Beverages' },
  { id: 88, name: 'Nescafe Intense Cold Coffee', price: 35, weight: '180 ml', icon: '🧋', category: 'Beverages' },
  { id: 89, name: 'Taj Mahal Tea Powder', price: 165, weight: '250 g', icon: '☕', category: 'Beverages' },
  { id: 90, name: 'Bru Instant Coffee', price: 180, weight: '50 g', icon: '☕', category: 'Beverages' },
  { id: 91, name: 'Paper Boat Aamras', price: 30, weight: '200 ml', icon: '🥭', category: 'Beverages' },
  { id: 92, name: 'Raw Pressery Cold Pressed Coconut Water', price: 60, weight: '200 ml', icon: '🥥', category: 'Beverages' },
  { id: 93, name: 'Sprite Soft Drink', price: 40, weight: '750 ml', icon: '🥤', category: 'Beverages' },
  { id: 94, name: 'Frooti Mango Drink', price: 65, weight: '1.2 L', icon: '🧃', category: 'Beverages' },
  { id: 95, name: 'Lipton Honey Lemon Green Tea', price: 160, weight: '25 bags', icon: '🍵', category: 'Beverages' },
  { id: 96, name: 'Catch Club Soda', price: 20, weight: '750 ml', icon: '🍾', category: 'Beverages' },
  { id: 97, name: 'MTR Badam Drink', price: 35, weight: '180 ml', icon: '🥛', category: 'Beverages' },
  { id: 98, name: 'Mountain Dew', price: 40, weight: '750 ml', icon: '🥤', category: 'Beverages' },
  { id: 99, name: 'Maaza Mango Drink', price: 70, weight: '1.2 L', icon: '🧃', category: 'Beverages' },
  { id: 100, name: 'Tata Tea Gold Premium', price: 145, weight: '250 g', icon: '🍵', category: 'Beverages' },
  { id: 101, name: 'Gatorade Blue Bolt Sports Drink', price: 50, weight: '500 ml', icon: '⚡', category: 'Beverages' },
  { id: 102, name: 'Limca Lemon Soft Drink', price: 40, weight: '750 ml', icon: '🥤', category: 'Beverages' },
  { id: 103, name: 'Kinley Club Soda', price: 20, weight: '750 ml', icon: '🍾', category: 'Beverages' },

  // ==========================================
  // FROZEN
  // ==========================================
  { id: 104, name: 'Amul Vanilla Magic Ice Cream', price: 100, weight: '1 L', icon: '🍦', category: 'Frozen' },
  { id: 105, name: 'McCain French Fries', price: 130, weight: '420 g', icon: '🍟', category: 'Frozen' },
  { id: 106, name: 'Safal Frozen Green Peas', price: 140, weight: '1 kg', icon: '🫛', category: 'Frozen' },
  { id: 107, name: 'Yummiez Chicken Nuggets', price: 195, weight: '400 g', icon: '🍗', category: 'Frozen' },
  { id: 108, name: 'Magnum Classic Ice Cream', price: 90, weight: '80 ml', icon: '🍨', category: 'Frozen' },
  { id: 109, name: 'ITC Master Chef Veg Burger Patty', price: 150, weight: '320 g', icon: '🍔', category: 'Frozen' },
  { id: 110, name: 'Sumeru Frozen Sweet Corn', price: 110, weight: '500 g', icon: '🌽', category: 'Frozen' },
  { id: 111, name: 'Kwality Wall\'s Cornetto Double Chocolate', price: 40, weight: '105 ml', icon: '🍦', category: 'Frozen' },
  { id: 112, name: 'ITC Master Chef Aloo Tikki', price: 120, weight: '400 g', icon: '🥔', category: 'Frozen' },
  { id: 113, name: 'Godrej Yummiez Chicken Sausages', price: 160, weight: '250 g', icon: '🌭', category: 'Frozen' },
  { id: 114, name: 'Switz Spring Roll Pastry', price: 115, weight: '275 g', icon: '🌯', category: 'Frozen' },
  { id: 115, name: 'Baskin Robbins Praline Ice Cream', price: 320, weight: '450 ml', icon: '🍨', category: 'Frozen' },
  { id: 116, name: 'McCain Smiles', price: 145, weight: '415 g', icon: '🙂', category: 'Frozen' },
  { id: 117, name: 'Sumeru Frozen Grated Coconut', price: 65, weight: '200 g', icon: '🥥', category: 'Frozen' },
  { id: 118, name: 'Vadilal Quick Treat Paneer Paratha', price: 110, weight: '400 g', icon: '🫓', category: 'Frozen' },
  { id: 119, name: 'Keventer Chicken Meatballs', price: 175, weight: '250 g', icon: '🧆', category: 'Frozen' },
  { id: 120, name: 'Dairy Day Vanilla Ice Cream Family Pack', price: 140, weight: '700 ml', icon: '🍨', category: 'Frozen' }
];

        // ADD RATINGS TO PREVENT UI ERRORS (Since product data lacked a rating attribute)
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