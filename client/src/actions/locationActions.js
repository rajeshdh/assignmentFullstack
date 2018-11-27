import {FETCH_LOCATIONS} from "./types";
import gql from "graphql-tag";
import client from '../ApolloClient'

export const fetchLocations = () => dispatch => {
  client.query({
    query: gql`
    {
      locations {
        items {
          _id
          title
          country {
           title
          }
        }
      }
     }`
  })
    .then(locations => dispatch({
      type: FETCH_LOCATIONS,
      payload: locations.data
    }));
};