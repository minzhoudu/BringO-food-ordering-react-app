import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";

const MealItem = ({ item }) => {
    const price = `$${item.price.toFixed(2)}`;

    return (
        <li className={classes.meal}>
            <div>
                <h3>{item.name}</h3>
                <div className={classes.description}>{item.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={item.id} />
            </div>
        </li>
    );
};

export default MealItem;
