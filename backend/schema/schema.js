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
    GraphQLNonNull
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
    })
});

const RestType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        id: { type: GraphQLID },
        remail: { type: GraphQLString },
        rpassword: { type: GraphQLString },
        rname: { type: GraphQLString },
        rphone: { type: GraphQLInt },
        rabout: { type: GraphQLString },
        rlatitude: { type: GraphQLInt },
        rlongitude: { type: GraphQLInt },
        raddress: { type: GraphQLString },
        rcuisine: { type: GraphQLString },
        rdelivery: { type: GraphQLString },
        rhours: {
          sunday: { type: GraphQLBoolean },
          monday: { type: GraphQLBoolean },
          tuesday: { type: GraphQLBoolean },
          wednesday: { type: GraphQLBoolean },
          thursday: { type: GraphQLBoolean },
          friday: { type: GraphQLBoolean },
          saturday: { type: GraphQLBoolean },
          startTime: { type: GraphQLString },
          endTime: { type: GraphQLString },
        },
        rrating: { type: GraphQLFloat },
    })
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
            }
        },
        restaurant: {
            type: RestType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Restaurants.findById(args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustType),
            resolve(parent, args) {
                return Customers.find({});
            }
        },
        restaurants: {
            type: new GraphQLList(RestType),
            resolve(parent, args) {
                return Restaurants.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustType,
      args: {
        cname: { type: GraphQLString },
        cemail: { type: GraphQLString },
        cpassword: { type: GraphQLString }
      },
      resolve(parent, args) {
        let customer = new Customer({
          cname: args.cname,
          cemail: args.cemail,
          cpassword: args.cpassword
        });
        return customer.save();
      }
    },

    addRestaurant: {
      type: RestType,
      args: {
        rname: { type: GraphQLString },
        remail: { type: GraphQLString },
        rpassword: { type: GraphQLString },
      },
      resolve(parent, args) {
        let restaurant = new Customer({
          rname: args.cname,
          remail: args.cemail,
          rpassword: args.cpassword
        });
        return customer.save();
      }
    }

  }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;