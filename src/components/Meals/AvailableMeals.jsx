import { useEffect, useState } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
    const [meals, setmMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await fetch("https://bringo-3df0e-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
            if (!res.ok) {
                throw new Error("Something went wrong while fetching the data from Firebase");
            }

            const data = await res.json();

            const loadedMeals = [];
            for (const id in data) {
                loadedMeals.push({
                    id,
                    ...data[id],
                });
            }

            setmMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);

    // LOADER
    if (isLoading) {
        return (
            <div className={classes["lds-facebook"]}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    if (httpError) {
        return (
            <section>
                <p className={classes.mealsError}>{httpError}</p>
            </section>
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
