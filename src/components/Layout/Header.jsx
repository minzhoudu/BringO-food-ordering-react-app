import HeaderCardButton from "./HeaderCardButton";
import headerImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = ({ onOpenCart }) => {
    return (
        <>
            <header className={classes.header}>
                <h1>BringO</h1>
                <HeaderCardButton onOpenCart={onOpenCart}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={headerImage} alt="Header food table" />
            </div>
        </>
    );
};

export default Header;