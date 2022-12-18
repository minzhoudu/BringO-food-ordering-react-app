import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = ({ onCloseCart }) => {
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {[
                { id: "c1", name: "pavle", amount: 2, price: 12.99 },
                { id: "c2", name: "ana", amount: 3, price: 21.99 },
            ].map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );

    return (
        <Modal onCloseCart={onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.12</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={onCloseCart}>
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;
