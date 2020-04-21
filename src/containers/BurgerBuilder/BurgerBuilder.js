import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES= {
    meat:1.3,
    salad:0.4,
    cheese:0.5,
    bacon:0.7
}
class BurgerBuilder extends Component{
    state ={
        ingredients:{
            salad: 0,
            meat:0,
            bacon:0,
            cheese:0
        },
        totalPrice: 4,
        purchasable: false
    }

    addIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({totalPrice:priceAddition, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount<=0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] - this.state.totalPrice;
        this.setState({totalPrice:priceAddition, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);

    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el)=> {
            return sum+el;
        },0)
        this.setState({purchasable: sum>0});
    }

    render(){
        const disabledinfo= {...this.state.ingredients};
        for (let key in disabledinfo){
            disabledinfo[key] = disabledinfo[key]<=0;
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientsHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabledBtn={disabledinfo}
                price={this.state.totalPrice}
                purchase={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;