import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountToNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountToNumber < 1 || enteredAmountToNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountToNumber);
    };
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: `amount_${props.id}`,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>Add</button>
            {!amountIsValid && <p>Please enter the valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;
