import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class FilmList extends Component {

    constructor(props) {
        super(props);
        this.state = {films: []};

    }

    componentDidMount() {
        fetch('http://18.168.164.47:8181/api/films/all')
            .then(response => response.json())
            .then(data => this.setState({films: data}));
    }
    async remove(id) {
        await fetch(`http://18.168.164.47:8181/api/films/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedFilms = [...this.state.films].filter(i => i.id !== id);
            this.setState({films: updatedFilms});
        });
    }


    render() {
        const {films, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const filmList = films.map(film => {
            return <tr key={film.id}>
                <td style={{whiteSpace: 'nowrap'}}>{film.id}</td>
                <td>{film.title}</td>
                <td>{film.description}</td>
                <td>{film.rating}</td>
                <td>{film.lengthMinutes}</td>
                <td>{film.releaseYear}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/films/edit/" + film.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(film.id)}>Delete</Button>
                        <Button size="sm" color="info" tag={Link} to={"/films/actors/" + film.id}>View Worked Actors</Button>
                    </ButtonGroup>
                </td>


            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/films/create">Add Film</Button>
                    </div>
                    <p></p>
                    <h3>List of Films </h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Title:</th>
                            <th>Description:</th>
                            <th>Rating:</th>
                            <th>Runtime (mins):</th>
                            <th>Release Year:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filmList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

}
export default FilmList;