import CartIcon from "./../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = ({ onOpenCart }) => {
    return (
        <button className={classes.button} onClick={onOpenCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>3</span>
        </button>
    );
};

export default HeaderCardButton;
