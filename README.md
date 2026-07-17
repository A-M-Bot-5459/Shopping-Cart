# Blinkit Premium Marketplace

A high-performance, responsive e-commerce front-end application built with **AngularJS**. This project features a "Dark Liquid Glass" aesthetic, providing a modern, immersive shopping experience for organic grocery delivery.

---

## 🚀 Overview
The **Blinkit Premium Marketplace** is a single-page application (SPA) designed for mobile-first usability and aesthetic appeal. It includes a simulated shopping cart, category-based product browsing, real-time search functionality, and a secure, multi-stage checkout flow.

## ✨ Key Features
*   **Immersive Design:** Dark-themed UI utilizing `backdrop-filter` for a modern "glassmorphism" look.
*   **Interactive Shopping:** Real-time cart management, quantity adjustment, and dynamic basket total calculations.
*   **Smart Filtering & Sorting:** Users can search products in real-time or sort by popularity and price.
*   **Checkout Simulation:** A three-stage checkout process (Payment Selection → Verification → Success) with simulated feedback.
*   **Responsive Architecture:** Fluid grid layouts that adjust seamlessly from wide-screen desktops to small mobile devices.

## 🛠️ Technical Stack
*   **Framework:** AngularJS 1.8.2
*   **Styling:** CSS3 (Flexbox/Grid), `backdrop-filter`, and CSS Keyframe Animations.
*   **Icons:** Native Unicode/Emoji integration for a lightweight footprint.
*   **Environment:** Vanilla HTML5, CSS, and JS (No build pipeline required).

## 📂 Project Structure
*   `index.html`: Contains the core structure, styling, and application logic.
*   **Global Styling:** Located in the `<style>` block, including media queries for responsive design.
*   **Angular Controller (CartCtrl):** Handles the application state, including:
    *   `products`: Data array of items (Dairy, Bakery, Snacks, Fruits, Beverages, Frozen).
    *   `cart`: Logic for adding, removing, and updating item quantities.
    *   `checkoutStage`: Manages the UI transitions between viewing, paying, and order success.

## 💻 How to Run
1.  Clone the repository (or download the file).
2.  Open `index.html` in any modern web browser.
*Note: As this application uses external CDN resources (AngularJS), ensure you have an active internet connection to load the framework.*

## 🎨 UI/UX Design Philosophy
The application follows a "Dark Liquid Glass" theme:
*   **Depth & Hierarchy:** Uses subtle blurs and varying transparencies (`rgba`) to separate content layers from the background image.
*   **Tactile Feedback:** Buttons and cards feature smooth `transition` properties and `transform` states for a premium, responsive feel.
*   **Mobile Containment:** Features strict horizontal scroll locking and dynamic grids to ensure usability on smaller handheld devices.

## 💡 Customization
*   **Adding Products:** To add new items, modify the `$scope.products` array in the `<script>` block. Ensure you assign a unique `id` and a valid `category`.
*   **Changing Categories:** Update the `$scope.categories` array to adjust the navigation tabs.
*   **Theming:** Adjust the `background` property in the `body` CSS selector to swap the scenery background.

## 👤 Author & Support
Built for high-end, organic grocery exploration. If you encounter issues with the checkout handshake or UI rendering, please clear your browser cache or check your connection to the Google CDN hosting AngularJS.
