import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ActorList from "./ActorList";
import Home from './Home';
import CategoryList from "./CategoryList";
import FilmList from "./FilmList";
import ActorEdit from "./ActorEdit";
import ActorCreate from "./ActorCreate";


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/actors' exact={true} component={ActorList}/>
                    <Route path='/categories' exact={true} component={CategoryList}/>
                    <Route path='/films' exact={true} component={FilmList}/>
                    <Route path='/actors/edit/:id' component={ActorEdit}/>
                    <Route path='/actors/create' component={ActorCreate}/>
                </Switch>
            </Router>
        )
    }
}

export default App;