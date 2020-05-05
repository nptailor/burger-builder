import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} className={classes.OrderIngredients}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}



export default order;