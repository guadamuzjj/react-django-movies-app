import React from 'react';
import { Star } from 'react-feather';
import { NavLink } from 'react-router-dom';

const MovieWidget = ({ id, title, rating, year }) => {
  return (
    <div className="movie-widget card my-2">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title text-uppercase font-bold">{title}</h5>
        <div className="card-content">
          <div className="d-flex align-items-center pb-4">
            <Star color="#f1c40f" />
            <span className="text-lg font-weight-light ml-2">{rating}</span>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            <span className="badge badge-primary">{year}</span>
          </h6>
          <NavLink to={`/movies/${id}`} className="text-decoration-none">
            <span href="#" className="card-link text-xs text-center text-uppercase">Rate this movie</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MovieWidget;
