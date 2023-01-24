import { useEffect, useState, useCallback } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
    const [meals, setmMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMeals = useCallback(async () => {
        const res = await fetch("https://bringo-3df0e-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
        const data = await res.json();

        const loadedMeals = [];
        for (const key in data) {
            loadedMeals.push({
                id: key,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price,
            });
        }

        setmMeals(loadedMeals);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);

    if (isLoading) {
        //loader
        return (
            <div class={classes["lds-facebook"]}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
