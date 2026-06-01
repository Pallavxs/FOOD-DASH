# PROJECT_EXPLANATION

## 1. Authentication Flow

1. **Login Screen** – The user enters email and password. The credentials are sent to `POST /api/auth/login`. On success the backend returns a **JWT**.
2. The JWT is stored in **AsyncStorage** and added to the `Authorization` header of every subsequent API request via an Axios interceptor (`frontend/src/api/api.js`).
3. After a successful login the client calls `initSocket(userId)` (see *Socket.IO Flow*). The socket remains alive for the whole session.
4. **Logout** – Clears the stored token, resets Redux auth state, and disconnects the socket.

## 2. Redux State Management

- The app uses **Redux Toolkit** with a single store (`frontend/src/redux/store.js`).
- Slices are defined for **auth**, **restaurant**, **cart**, **order**, and **socket**.
- Each slice exposes actions (e.g., `loginSuccess`, `addToCart`, `placeOrder`) and selectors used by the screens.
- Middleware (`redux-thunk`) handles async API calls, and the state is persisted across navigation via the Redux provider placed at the root of the app.

## 3. Search Flow

1. The **SearchBar** component debounces input (300 ms) and dispatches `searchRestaurants(query)`.
2. The thunk calls `GET /api/restaurants/search?query=`. Results are stored in `restaurantSlice.searchResults`.
3. UI reacts to three states:
   - **Loading** – activity indicator.
   - **Empty** – shows a friendly empty‑state message.
   - **No Results** – displays a *no results* illustration.
4. Selecting a restaurant navigates to the **Restaurant Details** screen.

## 4. Cart Flow

- Items added from the **Restaurant Details** screen dispatch `addToCart(item)`.
- The `cartSlice` holds an array of `{id, name, price, quantity}` objects.
- The **Cart** screen computes subtotal, taxes, delivery fee, and any discount codes.
- Users can increase/decrease quantity or remove items; the UI updates instantly thanks to Redux state changes.

## 5. Checkout Flow

1. The **Checkout** screen reads the current cart from Redux and displays a summary.
2. When the user taps **Place Order**, the thunk `createOrder(orderPayload)` posts to `POST /api/orders`.
3. The backend creates the order, saves it to MongoDB, and immediately emits `order-status-updated` to the user’s socket room.
4. On success the client navigates to **Order Success** and clears the cart slice.

## 6. Order Placement Flow

- The order payload contains cart items, total amount, user ID, and delivery address.
- The server validates the payload, creates a new **Order** document, and returns the order ID.
- The client stores the order ID to fetch detailed information later.

## 7. Real‑Time Tracking Flow

- After the order is placed, the **Track Order** screen subscribes to the `order-status-updated` socket event.
- The server updates the order status (e.g., *Preparing*, *Out for Delivery*, *Delivered*) and broadcasts the new status.
- The UI shows a badge that changes color and text in real time without a page refresh.

## 8. Socket.IO Integration

- A single socket instance lives in `frontend/src/services/socketService.js`.
- `initSocket(userId)` creates the connection and joins a room named after the user.
- The exported helper `onOrderStatusUpdated(callback)` registers a listener; before each registration the previous listener is removed with `socket.off` to avoid duplicates.
- On **Logout** the socket is explicitly disconnected via `socket.disconnect()`.

