import Movie from "./movie";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {FormattedMessage} from 'react-intl';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Detail from './movieDetail'
import Navbar from 'react-bootstrap/Navbar'

function MoviesList(props)  {

    let [movies, setMovies] = useState([]);
    let [movie, setMovie] = useState(null);

    const url = props.lan === "es"? "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json"
                : "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("movies") === null) {
                setMovies([])
            } else {
                setMovies(JSON.parse(localStorage.getItem("movies")));
            }
            if(localStorage.getItem("movie") === null) {
                setMovie(null)
            } else {
                setMovie(JSON.parse(localStorage.getItem("movie")));
            }
        } else {
            fetch(url).then(res=>res.json()).then(res=>{
                setMovies(res);
                localStorage.setItem("movies", JSON.stringify(res));
            });
        }
    }, []);

    function changeMovie(e) {
        setMovie(e);
        localStorage.setItem("movie", JSON.stringify(e));
    }

    return (
    <div>
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                React Bootstrap
                </Navbar.Brand>
            </Navbar>
            <Row>
                <Col>
                    <Table striped hover>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col"><FormattedMessage id="Name"/></th>
                        <th scope="col"><FormattedMessage id="Directed by"/></th>
                        <th scope="col"><FormattedMessage id="Country"/></th>
                        <th scope="col"><FormattedMessage id="Budget"/></th>
                        <th scope="col"><FormattedMessage id="Release"/></th>
                        <th scope="col"><FormattedMessage id="Views"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map( (e) => 
                            <tr onClick={() => changeMovie(e)}>
                                <th scope="row">{e.id}</th>
                                <td>{e.name}</td>
                                <td>{e.directedBy}</td>
                                <td>{e.country}</td>
                                <td>{e.budget}</td>
                                <td>{e.releaseDate}</td>
                                <td>{e.views}</td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                </Col>
                {movie != null &&
                    <Col>
                        <Detail movie = {movie}></Detail>
                    </Col>
                }
            </Row>
        </Container>
    </div>
    );
}

export default MoviesList;