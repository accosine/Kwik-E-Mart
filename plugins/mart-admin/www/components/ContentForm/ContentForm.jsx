import React from 'react';

let { PropTypes } = React;

class ContentForm extends React.Component {

  render() {
    return (
      <div>{this.props.selectedNavItem}</div>
    );
  }
}

ContentForm.propTypes = {
  selectedNavItem: PropTypes.string.isRequired
};

export default ContentForm;
