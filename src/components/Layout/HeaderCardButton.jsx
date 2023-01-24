import { useContext, useEffect, useState } from "react";
import CartIcon from "./../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import cartContext from "../../store/cart-context";

const HeaderCardButton = ({ onOpenCart }) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const cart_ctx = useContext(cartContext);
    const { items } = cart_ctx;
    const numberOfCartItems = items.reduce((currValue, item) => {
        return currValue + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

    useEffect(() => {
        if (items.length === 0) return;

        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={onOpenCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCardButton;
