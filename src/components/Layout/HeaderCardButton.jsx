import { useContext } from "react";
import CartIcon from "./../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import cartContext from "../../store/cart-context";

const HeaderCardButton = ({ onOpenCart }) => {
    const card_ctx = useContext(cartContext);

    const numberOfCartItems = card_ctx.items.reduce((currValue, item) => {
        return currValue + item.totalAmount;
    }, 0);

    return (
        <button className={classes.button} onClick={onOpenCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCardButton;
