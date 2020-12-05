import React from 'react';
import Card from 'react-bootstrap/Card'

export default class Movie extends React.Component {

    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.props.movie.poster} />
                <Card.Body>
                    <Card.Title>{this.props.movie.name}</Card.Title>
                <Card.Text>
                    {this.props.movie.description}
                </Card.Text>
                    <strong>Cast: {this.props.movie.cast}</strong>
                </Card.Body>
            </Card>
        );
    }
}
