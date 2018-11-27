import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ApartmentTileView from "./ApartmentTileView";
import {fetchLocations} from "../actions/locationActions"
import {fetchApartmentsList, fetchApartmentsListByLocation} from "../actions/apartmentsListActions";


class LocationView extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
  }

  static get propTypes() {
    return {
      locations: PropTypes.object,
      apartmentsList: PropTypes.object,
      isLoading: PropTypes.bool
    }
  }

  componentWillMount() {
    this.props.fetchLocations();
    this.props.fetchApartmentsList();
  }
  handleChange(event) {
    if (event.target.value === "All") {
      this.props.fetchApartmentsList();
    } else {
      this.props.fetchApartmentsListByLocation(event.target.value);
    }
  }

  render() {
    const {apartmentsList, isLoading, locations, selected} = this.props;
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (!apartmentsList.items) {
      return <div>No apartments found</div>
    }
    if (!locations.items) {
      return <div>No apartments found</div>
    }

    const options = locations.items.map(location => (
      <option key={location._id} value={location._id}>{location.title}</option>
    ));
    options.unshift(<option key="All" value="All">All locations</option>);

    return (
      <div>
        <div className="form-control country-selector">
          <label>Filter By Location</label>
          <select autoComplete ="true"
                  className="location-selector"
                  placeholder={"Berlin"}
                  value={selected}
                  onChange={this.handleChange}>
            {options}
          </select>
        </div>
        <div className="container-list container-lg clearfix">
          <div className="col-12 float-left">
            <div className="view-apartment-list">
              {apartmentsList.items.map((item, index) => (
                <ApartmentTileView key={index} apartment={item}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  locations: state.locations.locations,
  apartmentsList: state.apartmentsList.apartments,
  isLoading: state.locations.isLoading
});

export default connect(mapStateToProps, {fetchLocations, fetchApartmentsList, fetchApartmentsListByLocation})(LocationView)