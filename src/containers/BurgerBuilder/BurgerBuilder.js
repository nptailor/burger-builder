import React,{Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Layout/Burger/Burger'

class BurgerBuilder extends Component{
    state ={
        ingredients:{
            salad: 1,
            meat:1,
            bacon:1,
            cheese:1
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Section</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;