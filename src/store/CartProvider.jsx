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
            const existingCartItem = state.items.find((item) => item.id === action.item.id);
            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                // updatedItems[existingCartItem.id] = updatedItem;
                updatedItems[updatedItems.indexOf(existingCartItem)] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmound,
            };

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

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
