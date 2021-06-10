import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavBar';

class FilmCreate extends Component {

    emptyItem = {
        description: '',
        title: '',
        releaseYear: '' ,
        lengthMinutes: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const actor = await (await fetch(`http://18.168.164.47:8181/api/films/${this.props.match.params.id}`)).json();
            this.setState({item: actor});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/films' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/films');
    }


    render() {
        const {item} = this.state;
        const title = <h2>Add Film</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="releaseYear">Release Year</Label>
                        <Input type="number" name="releaseYear" id="releaseYear" value={item.releaseYear || ''}
                               onChange={this.handleChange} autoComplete="release Year"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lengthMinutes">Length in Minutes</Label>
                        <Input type="number" name="lengthMinutes" id="lengthMinutes" value={item.lengthMinutes || ''}
                               onChange={this.handleChange} autoComplete="Length in Minutes"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/films">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(FilmCreate);