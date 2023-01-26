import { useContext, useState, useEffect } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = ({ onCloseCart }) => {
    const [checkoutMode, setCheckoutMode] = useState(false);
    const cart_ctx = useContext(cartContext);

    const totalAmount = `$${cart_ctx.totalAmount.toFixed(2)}`;
    const isCartEmpty = cart_ctx.items.length === 0;

    useEffect(() => {
        if (isCartEmpty) {
            setCheckoutMode(false);
        }
    }, [isCartEmpty]);

    const removeCartItemHandler = (id) => {
        cart_ctx.removeItem(id);
    };
    const addCartItemHandler = (item) => {
        cart_ctx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setCheckoutMode(true);
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cart_ctx.items.map((item) => (
                <CartItem
                    key={item.id}
                    addItem={addCartItemHandler.bind(null, item)}
                    removeItem={removeCartItemHandler.bind(null, item.id)}
                    item={item}
                />
            ))}
        </ul>
    );

    return (
        <Modal onCloseCart={onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {checkoutMode && !isCartEmpty && <Checkout onCloseCart={onCloseCart} />}
            {!checkoutMode && (
                <div className={classes.actions}>
                    <button className={classes["button--alt"]} onClick={onCloseCart}>
                        Close
                    </button>
                    {!isCartEmpty && (
                        <button onClick={orderHandler} className={classes.button}>
                            Order
                        </button>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default Cart;
