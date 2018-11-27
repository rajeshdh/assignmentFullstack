import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import {fetchLocations} from "../actions/locationActions"
import {fetchApartmentsList, fetchApartmentsListByLocation} from "../actions/apartmentsListActions";
import LocationView from "../views/LocationView"

const mapStateToProps = state => ({
  locations: state.locations.locations,
  apartmentsList: state.apartmentsList.apartments,
  isLoading: state.locations.isLoading
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({fetchLocations, fetchApartmentsList, fetchApartmentsListByLocation}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationView)