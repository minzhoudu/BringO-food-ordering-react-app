import classes from "./Cart.module.css";

const Cart = () => {
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {[
                { id: "c1", name: "pavle", amount: 2, price: 12.99 },
                { id: "c2", name: "ana", amount: 3, price: 21.99 },
            ].map((item) => (
                <li>{item.name}</li>
            ))}
        </ul>
    );

    return (
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.12</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div>
    );
};

export default Cart;
