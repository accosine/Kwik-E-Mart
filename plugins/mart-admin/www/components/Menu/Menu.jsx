import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

let { PropTypes } = React;

class Menu extends React.Component {

  render() {
    return (
      <ul className={'menu'}>
        <MenuItem navitem='Create' navclass='menu-item-create' />
        <MenuItem navitem='Update' navclass='menu-item-update' />
        <MenuItem navitem='Delete' navclass='menu-item-delete' />
      </ul>
    );
  }
}

Menu.propTypes = {
  //items: PropTypes.array.isRequired
};

export default Menu;
