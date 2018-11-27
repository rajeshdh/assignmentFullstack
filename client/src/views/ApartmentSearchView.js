import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Autocomplete from 'react-autocomplete';

import ApartmentTileView from "./ApartmentTileView";
import { fetchLocations } from "../actions/locationActions"
import { fetchApartmentsList, fetchApartmentsListByLocation } from "../actions/apartmentsListActions";


class LocationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location : ''
        }
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
    handleChange(value, item) {
        if (value === "All") {
            this.props.fetchApartmentsList();
        } else {
            this.setState({location: value});
            this.props.fetchApartmentsListByLocation(item._id);
        }
    }

    render() {
        const { apartmentsList, isLoading, locations, selected } = this.props;
        const {location} = this.state;
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (!apartmentsList.items) {
            return <div>No apartments found</div>
        }
        if (!locations.items) {
            return <div>No apartments found</div>
        }

        // const options = locations.items.map(location => (
        //     <option key={location._id} value={location._id}>{location.title}</option>
        // ));
        // options.unshift(<option key="All" value="All">All locations</option>);

        return (
            <div>
                {/* <div className="form-control country-selector">
                    <label>Filter By Location</label>
                    <select autoComplete="true"
                        className="location-selector"
                        placeholder={"Berlin"}
                        value={selected}
                        onChange={this.handleChange}>
                        {options}
                    </select>
                </div> */}
                <Autocomplete
                    getItemValue={(item) => item.title}
                    items={locations.items}
                    renderItem={(item, isHighlighted) =>
                        <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.title}
                        </div>
                    }
                    value={location}
                    onSelect={(value, item) => this.handleChange(value, item)}
                />
                <div className="container-list container-lg clearfix">
                    <div className="col-12 float-left">
                        <div className="view-apartment-list">
                            {apartmentsList.items.map((item, index) => (
                                <ApartmentTileView key={index} apartment={item} />
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

export default connect(mapStateToProps, { fetchLocations, fetchApartmentsList, fetchApartmentsListByLocation })(LocationView)