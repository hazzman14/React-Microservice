import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Button, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavBar';

class Home extends Component {

    componentDidMount(){
        document.title = "Testing Project"
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Entities </h3>
                        <Button color="link"><Link to="/actors">Actors</Link></Button>
                    <p></p>
                        <Button color="link"><Link to="/categories">Categories</Link></Button>
                    <p></p>
                        <Button color="link"><Link to="/films">Films</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;