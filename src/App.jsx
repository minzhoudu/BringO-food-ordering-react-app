import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [showCart, setShowCart] = useState(false);

    const openCartHandler = () => {
        setShowCart(true);
    };

    const closeCarthandler = () => {
        setShowCart(false);
    };

    return (
        <CartProvider>
            {showCart && <Cart onCloseCart={closeCarthandler} />}
            <Header onOpenCart={openCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
