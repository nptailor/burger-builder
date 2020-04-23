import React,{Component} from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    showSideDrawerHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer};})
    }
    sideDrawerHandler=()=>{
        this.setState({showSideDrawer: false});
    }
    render(){
        return(
            <Aux>
                <Toolbar openSideDrawer={this.showSideDrawerHandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
                <div> Toolbar SideDrawer Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;