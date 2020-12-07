const graphql = require('graphql');
const Customers = require('../Models/custModel');
const Restaurants = require('../Models/restModel');
const Dishes = require('../Models/dishModel');

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
    rdish: { type: GraphQLList(GraphQLID) },
  }),
});

const DishType = new GraphQLObjectType({
  name: 'Dish',
  fields: () => ({
    id: { type: GraphQLID },
    rid: { type: GraphQLID },
    dname: { type: GraphQLString },
    dingredients: { type: GraphQLString },
    dprice: { type: GraphQLFloat },
    dcategory: { type: GraphQLString },
    durl: { type: GraphQLString },
  }),
});

const SingleCustomerReturnType = new GraphQLObjectType({
  name: 'SingleCustomerReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: CustType },
  }),
});

const CustomersReturnType = new GraphQLObjectType({
  name: 'CustomersReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: GraphQLList(CustType) },
  }),
});

const SingleRestaurantReturnType = new GraphQLObjectType({
  name: 'SingleRestaurantReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: RestType },
  }),
});

const RestaurantsReturnType = new GraphQLObjectType({
  name: 'RestaurantsReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: GraphQLList(RestType) },
  }),
});

const SingleDishReturnType = new GraphQLObjectType({
  name: 'SingleDishReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: DishType },
  }),
});

const DishesReturnType = new GraphQLObjectType({
  name: 'DishesReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: GraphQLList(DishType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    customer: {
      type: SingleCustomerReturnType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const customer = await Customers.findById(args.id);
        if (customer) {
          return { status: 200, entity: customer };
        }
        return { status: 401 };
      },
    },

    restaurant: {
      type: SingleRestaurantReturnType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const restaurant = await Restaurants.findById(args.id);
        if (restaurant) {
          return { status: 200, entity: restaurant };
        }
        return { status: 401 };
      },
    },

    dish: {
      type: SingleDishReturnType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const dish = await Dishes.findById(args.id);
        if (dish) {
          return { status: 200, entity: dish };
        }
        return { status: 401 };
      },
    },

    customers: {
      type: CustomersReturnType,
      async resolve(parent, args) {
        const customers = await Customers.find({});
        if (customers) {
          return { status: 200, entity: customers };
        }
        return { status: 401 };
      },
    },
    restaurants: {
      type: RestaurantsReturnType,
      async resolve(parent, args) {
        const restaurants = await Restaurants.find({});
        if (restaurants) {
          return { status: 200, entity: restaurants };
        }
        return { status: 401 };
      },
    },
    dishes: {
      type: DishesReturnType,
      args: {
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const dishes = await Dishes.find({ rid: args.rid });
        if (dishes) {
          return { status: 200, entity: dishes };
        }
        return { status: 401 };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: SingleCustomerReturnType,
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
        const saved = await newCustomer.save();
        if (saved) {
          return { status: 200, entity: newCustomer };
        }
        return { status: 401 };
      },
    },

    addRestaurant: {
      type: SingleRestaurantReturnType,
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
      type: SingleCustomerReturnType,
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
      type: SingleRestaurantReturnType,
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
      type: SingleRestaurantReturnType,
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
      type: SingleRestaurantReturnType,
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

    addDish: {
      type: SingleDishReturnType,
      args: {
        rid: { type: GraphQLID },
        dname: { type: GraphQLString },
        dingredients: { type: GraphQLString },
        dprice: { type: GraphQLFloat },
        dcategory: { type: GraphQLString },
        durl: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const newDish = new Dishes({
          rid: args.rid,
          dname: args.dname,
          dingredients: args.dingredients,
          dprice: args.dprice,
          dcategory: args.dcategory,
          durl: args.durl,
        });
        const savedDish = await newDish.save();
        if (savedDish) {
          return { status: 200, entity: newDish };
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
