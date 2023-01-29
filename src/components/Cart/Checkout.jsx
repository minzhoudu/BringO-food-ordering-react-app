import { useRef, useState } from "react";

// import { isEmptyString } from "../../helpers/checkoutHelpers";
import COHelpers from "../../helpers/checkoutHelpers";
import classes from "./Checkout.module.css";

const Checkout = ({ onCloseCart, onSubmitOrder }) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const isValidName = !COHelpers.isEmptyString(nameInputRef.current.value);
        const isValidStreet = !COHelpers.isEmptyString(streetInputRef.current.value);
        const isValidCity = !COHelpers.isEmptyString(cityInputRef.current.value);
        const isValidPostalCode = COHelpers.postalCodeFiveCharsValidation(postalCodeInputRef.current.value);

        setFormInputsValidity({
            name: isValidName,
            street: isValidStreet,
            city: isValidCity,
            postalCode: isValidPostalCode,
        });

        const isValidForm = isValidName && isValidStreet && isValidCity && isValidPostalCode;
        if (!isValidForm) {
            return;
        }

        const userData = {
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            city: cityInputRef.current.value,
            postalCode: postalCodeInputRef.current.value,
        };
        //submit data
        onSubmitOrder(userData);
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCloseCart}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
