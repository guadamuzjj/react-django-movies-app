import React, { Component } from 'react';
import axios from 'axios';
import { Header } from '../components';
import { withRouter } from 'react-router-dom';
import { Star, User } from 'react-feather';
import ReactStars from 'react-stars';

class MovieDetail extends Component {
  state = {
    movie: {},
    rating: null,
    comment: '',
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`/api/movies/${params.id}`)
      .then(({ data: movie }) => {
        this.setState({ movie });
      });
  }

  onChangeComment(comment) {
    this.setState({ comment });
  }

  onChangeRating(rating) {
    this.setState({ rating });
    const { match: { params: { id } } } = this.props;
    axios.post(`/api/movies/${id}/rating/`, { rating })
      .then(({ status, data: movie }) => {
        if (!status || status !== 'failed') {
          this.setState({ movie });
        }
      });
  }

  onSubmitComment = async (e) => {
    e.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { comment } = this.state;
    axios.post(`/api/movies/${id}/comment/`, { comment })
      .then(({ status, data: movie }) => {
        if (!status || status !== 'failed') {
          this.setState({ movie, comment: '' });
        }
      });
  };

  render() {
    const { movie, rating, comment } = this.state;
    const genres = movie.genre && movie.genre.split(',') || [];
    return (
      <div className="container">
        <Header title={movie.title} />
        <div className="row">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-body">
                <section>
                  <div className="card-title">
                    <div className="mb-3">
                      {genres.map((genre, index) => <span key={index} className="mr-1 badge badge-primary">{genre}</span>)}
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 text-md text-uppercase">Rating: </span>
                      <Star color="#f1c40f" />
                      <span className="text-lg font-weight-light ml-1">{movie.rating}</span>
                    </div>
                  </div>
                  <p className="card-text">Plot: {movie.plot}</p>
                  <p className="card-text mb-1">
                    <small className="text-muted"> Director: <span className="font-weight-bold">{movie.director}</span></small>
                  </p>
                  <p className="card-text mb-1">
                    <small className="text-muted">Released: <span className="font-weight-bold">{movie.released_on}</span></small>
                  </p>
                  <p className="card-text mb-1">
                    <small className="text-muted">Rated: <span className="font-weight-bold">{movie.rated}</span></small>
                  </p>
                </section>
                <section className="mt-4">
                  <div className="alert alert-warning" role="alert">
                    Rate this movie and/or leave a comment...
                  </div>
                  <div className="form-group">
                    <ReactStars
                      count={5}
                      half={false}
                      size={34}
                      color2={'#ffd700'}
                      onChange={(rating) => this.onChangeRating(rating)}
                      value={rating} />
                  </div>
                  <form onSubmit={this.onSubmitComment}>
                    <div className="form-group">
                      <textarea value={comment} onChange={(e) => this.onChangeComment(e.target.value)} className="form-control" id="comment" rows="3"></textarea>
                    </div>
                    <button className="btn float-right btn-sm btn-primary">Send Comment</button>
                  </form>
                </section>
                <section>
                  <div className="mt-4">
                    <h6>Comments</h6>
                    {((movie && movie.movie_comments) || []).map((item, idx) => {
                      return (
                        <div key={idx} className="d-flex">
                          <div className="d-flex align-items-center"><User size={16} /> <span className="pl-1 text-muted">Anonymus {idx + 1}</span>:</div>
                          <span className="ml-2">{item.comment}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieDetail);
