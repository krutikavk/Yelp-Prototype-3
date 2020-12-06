const graphql = require('graphql');
const Customers = require('../Models/custModel');
const Restaurants = require('../Models/restModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const CustType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID },
    cemail: { type: GraphQLString },
    cpassword: { type: GraphQLString },
    cname: { type: GraphQLString },
    cphone: { type: GraphQLInt },
    cabout: { type: GraphQLString },
    cjoined: { type: GraphQLString },
    cphoto: { type: GraphQLString },
    cfavrest: { type: GraphQLString },
    cfavcuisine: { type: GraphQLString },
  }),
});

const RestType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    remail: { type: GraphQLString },
    rpassword: { type: GraphQLString },
    rname: { type: GraphQLString },
    rphone: { type: GraphQLString },
    rabout: { type: GraphQLString },
    rlatitude: { type: GraphQLFloat },
    rlongitude: { type: GraphQLFloat },
    raddress: { type: GraphQLString },
    rcuisine: { type: GraphQLString },
    rdelivery: { type: GraphQLString },
    rrating: { type: GraphQLFloat },
  }),
});

const CustomerLoginType = new GraphQLObjectType({
  name: 'CustomerLogin',
  fields: () => ({
    status: { type: GraphQLString },
    entity: { type: CustType },
  }),
});

const RestaurantLoginType = new GraphQLObjectType({
  name: 'RestaurantLogin',
  fields: () => ({
    status: { type: GraphQLString },
    entity: { type: RestType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    customer: {
      type: CustType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customers.findById(args.id);
      },
    },
    restaurant: {
      type: RestType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurants.findById(args.id);
      },
    },
    customers: {
      type: new GraphQLList(CustType),
      resolve(parent, args) {
        return Customers.find({});
      },
    },
    restaurants: {
      type: new GraphQLList(RestType),
      resolve(parent, args) {
        return Restaurants.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerLoginType,
      args: {
        cname: { type: GraphQLString },
        cemail: { type: GraphQLString },
        cpassword: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const customer = await Customers.findOne({ cemail: args.cemail });
        if (customer) {
          return { status: 401 };
        }
        const now = new Date();
        const jsonDate = now.toJSON();
        const joined = new Date(jsonDate);
        const newCustomer = new Customers({
          cname: args.cname,
          cemail: args.cemail,
          cpassword: args.cpassword,
          cjoined: joined,
        });
        newCustomer.save();
        return { status: 200, entity: newCustomer };
      },
    },

    addRestaurant: {
      type: RestaurantLoginType,
      args: {
        rname: { type: GraphQLString },
        remail: { type: GraphQLString },
        rpassword: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const restaurant = await Restaurants.findOne({ remail: args.remail });
        if (restaurant) {
          return { status: 401 };
        }
        const newRestaurant = new Restaurants({
          rname: args.rname,
          remail: args.remail,
          rpassword: args.rpassword,
        });
        newRestaurant.save();
        return { status: 200, entity: newRestaurant };
      },
    },

    loginCustomer: {
      type: CustomerLoginType,
      args: {
        cemail: { type: GraphQLString },
        cpassword: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const customer = await Customers.findOne({ cemail: args.cemail, cpassword: args.cpassword });
        if (customer) {
          return { status: 200, entity: customer };
        }
        return { status: 401 };
      },
    },

    loginRestaurant: {
      type: RestaurantLoginType,
      args: {
        remail: { type: GraphQLString },
        rpassword: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const restaurant = await Restaurants.findOne({ remail: args.remail, rpassword: args.rpassword });
        if (restaurant) {
          return { status: 200, entity: restaurant };
        }
        return { status: 401 };
      },
    },

    updateRestaurantInfo: {
      type: RestaurantLoginType,
      args: {
        rphone: { type: GraphQLString },
        rabout: { type: GraphQLString },
        rcuisine: { type: GraphQLString },
        rdelivery: { type: GraphQLString },
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const updateData = {
          rphone: args.rphone,
          rabout: args.rabout,
          rcuisine: args.rcuisine,
          rdelivery: args.rdelivery,
        };
        const restaurant = await Restaurants.findByIdAndUpdate(args.rid, updateData, { new: true });
        if (restaurant) {
          return { status: 200, entity: restaurant };
        }
        return { status: 401 };
      },
    },

    updateRestaurantLocation: {
      type: RestaurantLoginType,
      args: {
        raddress: { type: GraphQLString },
        rlatitude: { type: GraphQLFloat },
        rlongitude: { type: GraphQLFloat },
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const updateData = {
          rlatitude: args.rlatitude,
          rlongitude: args.rlongitude,
          raddress: args.raddress,
        };
        const restaurant = await Restaurants.findByIdAndUpdate(args.rid, updateData, { new: true });
        if (restaurant) {
          return { status: 200, entity: restaurant };
        }
        return { status: 401 };
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
