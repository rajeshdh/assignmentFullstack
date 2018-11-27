const createService = require('feathers-mongodb');
const hooks = require('./locations.hooks');

module.exports = function() {
  const app = this;
  const mongoClient = app.get('mongoClient');

  const locationService = createService({});
  app.use('/locations', locationService);

  const service = app.service('locations');

  mongoClient.then(db => {
    service.Model = db.collection('locations');
  });

  service.hooks(hooks);
};
