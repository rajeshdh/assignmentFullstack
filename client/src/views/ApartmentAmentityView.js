import React from 'react';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let { apartment, limit = 3 } = this.props;
    return apartment.amenities.slice(0, limit).map((item, index) =>
      (<span key={index} className="_1h9l4w0vvX6d56ZnJ3NLod"><i></i><span>{item}</span></span>));
  }
}
