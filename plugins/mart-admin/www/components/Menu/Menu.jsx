import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <ul>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="create">Create</Link></li>
          <li><Link to="update">Update</Link></li>
          <li><Link to="delete">Delete</Link></li>
        </ul>
      </header>
    );
  }
}
