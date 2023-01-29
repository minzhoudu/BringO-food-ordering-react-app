import { useContext, useState, useEffect } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = ({ onCloseCart }) => {
    const cart_ctx = useContext(cartContext);
    const [checkoutMode, setCheckoutMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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

    const submitOrderHandler = async (userData) => {
        setIsLoading(true);
        try {
            const res = await fetch("https://bringo-3df0e-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userData,
                    order: { ...cart_ctx.items, orderDate: new Date().toLocaleString("sr-RS") },
                }),
            });

            if (!res.ok) {
                throw new Error("Order could not be confirmed, please try again!");
            }

            setIsSubmitted(true);
            cart_ctx.clearCart();
        } catch (error) {
            setIsError(true);
            setErrorMsg(error.message);
        }
        setIsLoading(false);
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

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {checkoutMode && !isCartEmpty && <Checkout onSubmitOrder={submitOrderHandler} onCloseCart={onCloseCart} />}
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
        </>
    );
    return (
        <Modal onCloseCart={onCloseCart}>
            {!isLoading && !isSubmitted && cartModalContent}
            {isLoading && <p>Sending order data...</p>}
            {isSubmitted && (
                <>
                    <p>Order successfully submitted!</p>
                    <div className={classes.actions}>
                        <button className={classes.button} onClick={onCloseCart}>
                            Close
                        </button>
                    </div>
                </>
            )}
            {isError && <p>{errorMsg}</p>}
        </Modal>
    );
};

export default Cart;
