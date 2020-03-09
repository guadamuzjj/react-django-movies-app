import React, { Component } from 'react';
import axios from 'axios';
import { Header, MovieWidget } from '../components';

class MovieList extends Component {
  state = {
    list: [],
    filter: '',
  }

  async componentDidMount() {
    await axios.get('/api/movies/')
      .then(({ data: list }) => {
        this.setState({ list });
      });
  }

  getFilteredItems() {
    let { list, filter } = this.state;
    return list.filter(item => {
      filter = filter.toLowerCase();
      let title = item.title.toLowerCase();
      return title.includes(filter);
    });
  }

  render() {
    return (
      <div className="container">
        <Header title="Movie App" />
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <input 
                value={this.state.filter}
                placeholder={'Filter by title'}
                onChange={(e) => this.setState({ filter: e.target.value})} 
                className="form-control" />
            </div>
            <div className="d-flex flex-wrap justify-content-between">
              {this.getFilteredItems().map(movie => <MovieWidget key={movie.id} {...movie} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieList;