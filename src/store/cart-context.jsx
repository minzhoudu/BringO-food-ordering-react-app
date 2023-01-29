import React from "react";
//*initial data for createContext function is used not for the app, but for the better code autocompletion
export default React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});
