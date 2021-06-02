import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {categories: []};

    }

    componentDidMount() {
        fetch('/api/categories/all')
            .then(response => response.json())
            .then(data => this.setState({categories: data}));
    }

    render() {
        const {categories, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const categoryList = categories.map(category => {
            return <tr key={category.categoryId}>
                <td style={{whiteSpace: 'nowrap'}}>{category.categoryId}</td>
                <td>{category.name}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/api/categories/create">Add Category</Button>
                    </div>
                    <p></p>
                    <h3>List of Categories </h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Name:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

}
export default CategoryList;