import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],        // [{ product, quantity }]
        totalItems: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((i) => i.product._id === product._id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ product, quantity: 1 });
            }
            state.totalItems += 1;
            state.totalPrice += product.price;
        },

        removeFromCart: (state, action) => {
            const productId = action.payload;
            const existing = state.items.find((i) => i.product._id === productId);
            if (!existing) return;
            state.totalItems -= existing.quantity;
            state.totalPrice -= existing.product.price * existing.quantity;
            state.items = state.items.filter((i) => i.product._id !== productId);
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existing = state.items.find((i) => i.product._id === productId);
            if (!existing) return;
            const diff = quantity - existing.quantity;
            existing.quantity = quantity;
            state.totalItems += diff;
            state.totalPrice += diff * existing.product.price;
            // Remove if quantity reaches 0
            if (quantity <= 0) {
                state.items = state.items.filter((i) => i.product._id !== productId);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.totalItems;
export const selectCartTotal = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
