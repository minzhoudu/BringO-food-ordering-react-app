import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const updatedTotalAmound = state.totalAmount + action.item.price * action.item.amount;
            const existingCartItem = state.items.find((item) => item.id === action.item.id) || null;
            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[updatedItems.indexOf(existingCartItem)] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmound,
            };

        case "REMOVE_ITEM":
            let currentCart = [...state.items];
            const currentItem = currentCart.find((item) => item.id === action.id || null);
            // const currentItemIndex2 = currentCart.findIndex((item) => item.id === action.id); better approach than find
            // const currentItem2 = currentCart[currentItem2];
            const updatedAmount = state.totalAmount.toFixed(2) - currentItem.price;
            if (currentItem.amount > 1) {
                const itemUpdated = {
                    ...currentItem,
                    amount: currentItem.amount - 1,
                };
                currentCart[currentCart.indexOf(currentItem)] = itemUpdated;
                // currCart[currentItemIndex2] = itemUpdated
            } else {
                currentCart = currentCart.filter((item) => item.id !== action.id);
            }

            return {
                items: currentCart,
                totalAmount: updatedAmount,
            };

        case "CLEAR_CART":
            return defaultCartState;

        default:
            return defaultCartState;
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCart({ type: "ADD_ITEM", item: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCart({ type: "REMOVE_ITEM", id: id });
    };

    const clearCartHandler = () => {
        dispatchCart({ type: "CLEAR_CART" });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
