
export default function(Query, Service, GetServiceName, FindServiceName) {
  Object.assign(Query, {
    [`${GetServiceName}`]: (root, args, context) => {
      return Service.find(Object.assign({}, context, { query: args })).then(result => result[0]);
    },
  });
  Object.assign(Query, {
    [`${FindServiceName}`]: (root, args, context) => {
      Object.assign(args, {$skip: args.skip });
      Object.assign(args, {$limit: args.limit });
      
      delete args.skip;
      delete args.limit;

      let paginate = {default: Number.MAX_SAFE_INTEGER};
      // required by feathersjs to enable pagination for a service.

      return Service.find(Object.assign({}, context, { query: args, paginate})).then(result => {
        return { total: result.total, items: result.data };
      });
    },
  });
}