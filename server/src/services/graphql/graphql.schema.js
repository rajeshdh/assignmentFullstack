import locationsSchema from '../locations/locations.graphql.schema.js';
import apartmentsSchema from '../apartments/apartments.graphql.schema.js';
import usersSchema from '../users/users.graphql.schema.js';
import CountriesSchema from '../countries/countries.graphql.schema.js';

const rootSchema = [
  `
  type Query {
    user(_id: String): Users
    users(owner: String limit: Int skip: Int): UsersWithPagination
    apartment(_id: String): Apartments
    apartments(active: Boolean owner: String location: String limit: Int skip: Int): ApartmentsWithPagination
    
    location(_id: String): Locations
    locations(active: Boolean country: String limit: Int skip: Int): LocationsWithPagination
    country(_id: String): Countries
    countries(active: Boolean limit: Int skip: Int): CountriesWithPagination
  }
  type Mutation {
   deleteApartment( _id: String! ): Apartments
  }
  schema {
    query: Query
    mutation: Mutation
  }
`,
];

export default [
  ...rootSchema,
  ...locationsSchema,
  ...apartmentsSchema,
  ...usersSchema,
  ...CountriesSchema,
];