import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

let { PropTypes } = React;

class Menu extends React.Component {

  render() {
    return (
      <ul className={'menu'}>
        {this.props.items.map((item) => {
          return (
            <MenuItem
              item={item}
              key={'menu-item-' + item.id} />
          );
        })}
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array.isRequired
};

export default Menu;
