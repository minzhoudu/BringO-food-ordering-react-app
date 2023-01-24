import HeaderCardButton from "./HeaderCardButton";
import headerImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import logo from "../../assets/bringo-logo.png";

const Header = ({ onOpenCart }) => {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <HeaderCardButton onOpenCart={onOpenCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={headerImage} alt="Header food table" />
            </div>
        </>
    );
};

export default Header;
