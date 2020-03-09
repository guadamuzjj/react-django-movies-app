import React from 'react';
import { Film } from 'react-feather';

const Header = ({ title }) => {
  return (
    <div className="header mb-4">
      <div className="row">
        <div className="col-12">
          <h4 className="d-flex justify-content-center align-items-center font-weight-bold text-center my-4">
            <Film />
            <span className="pl-2">{title}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Header;
