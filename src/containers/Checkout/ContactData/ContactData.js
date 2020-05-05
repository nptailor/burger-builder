import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Sally Andrews',
                address: {
                    street: 'Sample street 1',
                    zipcode: '123456',
                    country: 'Denmark'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'pickup'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type='text' name="name" placeholder="Your Name" />
                <Input inputtype="input" type='email' name="email" placeholder="Your Mail" />
                <Input inputtype="input" type='text' name="street" placeholder="Your Street" />
                <Input inputtype="input" type='text' name="postal_code" placeholder="Your Postal Code" />
            </form>
        );
        if (this.state.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
            </div>
        )
    }
}

export default ContactData;