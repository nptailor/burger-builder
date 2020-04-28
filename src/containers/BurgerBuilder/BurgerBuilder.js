import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES= {
    meat:1.3,
    salad:0.4,
    cheese:0.5,
    bacon:0.7
}
class BurgerBuilder extends Component{
    state ={
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-6a44b.firebaseio.com/ingredients.json')
        .then(response => {
            console.log('entering axios')
            this.setState({ingredients: response.data})
        })
        .catch(error => {this.setState({error: true})})
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

    purhcaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler=()=>{
        // alert('You Continue');
        this.setState({loading: true});
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Sally Andrews',
                address: {
                    street: 'Teststreet 1',
                    zipcode: '123456',
                    country: 'Denmark'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'pickup'
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false,purchasing:false})
        })
        .catch(error => {
            this.setState({loading:false, purchasing:false})
        });
    }

    render(){
        const disabledinfo= {...this.state.ingredients};
        for (let key in disabledinfo){
            disabledinfo[key] = disabledinfo[key]<=0;
        }

        let orderSummary = 'Hello'; 

        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
           burger= (<Aux>
           <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
          ingredientAdded={this.addIngredientsHandler} 
          ingredientRemoved={this.removeIngredientHandler}
          disabledBtn={disabledinfo}
          price={this.state.totalPrice}
          purchase={this.state.purchasable}
          ordered={this.purhcaseHandler}/>
          </Aux>);

          orderSummary=<OrderSummary 
        ingredients={this.state.ingredients}
        purchasedCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}>
         </OrderSummary>
        }

        if (this.state.loading === true){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default  withErrorHandler(BurgerBuilder,axios);