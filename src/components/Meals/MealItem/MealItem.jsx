import { useContext } from "react";
import cartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";

const MealItem = ({ item }) => {
    const cart_ctx = useContext(cartContext);

    const price = `$${item.price.toFixed(2)}`;
    const addToCartHandler = (amount) => {
        cart_ctx.addItem({
            id: item.id,
            name: item.name,
            amount: amount,
            price: item.price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{item.name}</h3>
                <div className={classes.description}>{item.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={item.id} />
            </div>
        </li>
    );
};

export default MealItem;
