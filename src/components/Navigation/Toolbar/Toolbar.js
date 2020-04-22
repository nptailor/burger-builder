import React from 'react';
import Logo from '../../../components/Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <NavigationItems/>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;