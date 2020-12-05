import React from 'react';

export default class Movie extends React.Component {

    render() {
        return (
            <div>
                <th scope="row">{this.props.movie.id}</th>
                <td>{this.props.movie.name}</td>
                <td>{this.props.movie.directedBy}</td>
                <td>{this.props.movie.country}</td>
                <td>{this.props.movie.budget}</td>
                <td>{this.props.movie.releaseDate}</td>
                <td>{this.props.movie.views}</td>
            </div>
        );
    }
}
