import { useContext } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = ({ onCloseCart }) => {
    const cart_ctx = useContext(cartContext);

    const totalAmount = `$${cart_ctx.totalAmount.toFixed(2)}`;
    const isCartEmpty = cart_ctx.items.length > 0;

    const removeCartItemHandler = (id) => {
        cart_ctx.removeItem(id);
    };
    const addCartItemHandler = (item) => {
        cart_ctx.addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cart_ctx.items.map((item) => (
                <CartItem key={item.id} addItem={addCartItemHandler.bind(null, item)} removeItem={removeCartItemHandler.bind(null, item.id)} item={item} />
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

            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={onCloseCart}>
                    Close
                </button>
                {isCartEmpty && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
