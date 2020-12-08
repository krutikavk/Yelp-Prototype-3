const graphql = require('graphql');
const bcrypt = require('bcrypt');
const Customers = require('../Models/custModel');
const Restaurants = require('../Models/restModel');
const Dishes = require('../Models/dishModel');
const Orders = require('../Models/orderModel');
const OrderDish = require('../Models/orderDishModel');
const Reviews = require('../Models/reviewModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
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
    rname: { type: GraphQLString },
    dname: { type: GraphQLString },
    dingredients: { type: GraphQLString },
    dprice: { type: GraphQLFloat },
    dcategory: { type: GraphQLString },
    durl: { type: GraphQLString },
  }),
});

const OrderDishType = new GraphQLObjectType({
  name: 'orderDish',
  fields: () => ({
    oid: { type: GraphQLID },
    did: { type: GraphQLID },
    dname: { type: GraphQLString },
    dprice: { type: GraphQLFloat },
    dquantity: { type: GraphQLInt },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    cid: { type: GraphQLID },
    rid: { type: GraphQLID },
    ooption: { type: GraphQLString },
    ostatus: { type: GraphQLString },
    otype: { type: GraphQLString },
    otime: { type: GraphQLString },
    oaddress: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    retext: { type: GraphQLID },
    rerating: { type: GraphQLString },
    cid: { type: GraphQLID },
    rid: { type: GraphQLID },
    rdate: { type: GraphQLString },
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

const SingleOrderReturnType = new GraphQLObjectType({
  name: 'SingleOrderReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: OrderType },
  }),
});

const OrdersReturnType = new GraphQLObjectType({
  name: 'OrdersReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: GraphQLList(OrderType) },
  }),
});

const SingleReviewReturnType = new GraphQLObjectType({
  name: 'SingleReviewReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: ReviewType },
  }),
});

const ReviewsReturnType = new GraphQLObjectType({
  name: 'ReviewsReturn',
  fields: () => ({
    status: { type: GraphQLInt },
    entity: { type: GraphQLList(ReviewType) },
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

    reviewsForRestaurant: {
      type: ReviewsReturnType,
      args: {
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const reviews = await Reviews.find({ rid: args.rid });
        if (reviews) {
          return { status: 200, entity: reviews };
        }
        return { status: 401 };
      },
    },

    reviewsForCustomer: {
      type: ReviewsReturnType,
      args: {
        cid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const reviews = await Reviews.find({ cid: args.cid });
        if (reviews) {
          return { status: 200, entity: reviews };
        }
        return { status: 401 };
      },
    },

    ordersForCustomer: {
      type: OrdersReturnType,
      args: {
        cid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const orders = await Orders.find({ cid: args.cid });
        if (orders) {
          console.log('orders: ', orders);
          return { status: 200, entity: orders };
        }
        return { status: 401 };
      },
    },

    ordersForRestaurant: {
      type: OrdersReturnType,
      args: {
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const orders = await Orders.find({ rid: args.rid });
        if (orders) {
          return { status: 200, entity: orders };
        }
        return { status: 401 };
      },
    },

    getRestaurantsByDishName: {
      type: RestaurantsReturnType,
      args: {
        dname: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const ridArray = await Dishes.find({ dname: args.dname }).select({ rid: 1 });
        console.log('ridArray: ', ridArray);
        // return { status: 200 };

        const promiseArray = ridArray.map((item) => Restaurants.findById(item.rid));
        Promise.all(promiseArray)
          .then(
            (results) => {
              //possible bug here
              const restaurants = results.filter((entry) => !entry.error);
              console.log('restaurants returned: ', results);
              return { status: 200, entity: restaurants };
            },
          )
          .catch(console.log);
      },
    },

    getRestaurantsByCuisine: {
      type: RestaurantsReturnType,
      args: {
        rcuisine: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const restaurants = await Restaurants.find({ rcuisine: args.rcuisine });
        if (restaurants) {
          return { status: 200, entity: restaurants };
        }
        return { status: 401 };
      },
    },

    getRestaurantsByDelivery: {
      type: RestaurantsReturnType,
      args: {
        rdelivery: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const restaurants = await Restaurants.find({ rdelivery: args.rdelivery });
        if (restaurants) {
          return { status: 200, entity: restaurants };
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
        const hash = await bcrypt.hash(args.cpassword, 10);
        const newCustomer = new Customers({
          cname: args.cname,
          cemail: args.cemail,
          cpassword: hash,
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
        const hash = await bcrypt.hash(args.rpassword, 10);
        const newRestaurant = new Restaurants({
          rname: args.rname,
          remail: args.remail,
          rpassword: hash,
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
        const restaurant = await Restaurants.findOne({ remail: args.remail });
        const loginTrue = await bcrypt.compare(restaurant.rpassword, args.rpassword);
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
        rname: { type: GraphQLString },
        dname: { type: GraphQLString },
        dingredients: { type: GraphQLString },
        dprice: { type: GraphQLFloat },
        dcategory: { type: GraphQLString },
        durl: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log('Add dish hit');
        const newDish = new Dishes({
          rid: args.rid,
          rname: args.rname,
          dname: args.dname,
          dingredients: args.dingredients,
          dprice: args.dprice,
          dcategory: args.dcategory,
          durl: args.durl,
        });
        const savedDish = await newDish.save();
        if (savedDish) {
          console.log('returned 200');
          return { status: 200, entity: newDish };
        }
        return { status: 401 };
      },
    },

    addOrder: {
      type: SingleOrderReturnType,
      args: {
        cid: { type: GraphQLID },
        rid: { type: GraphQLID },
        ooption: { type: GraphQLString },
        ostatus: { type: GraphQLString },
        otime: { type: GraphQLString },
      },

      async resolve(parent, args) {
        console.log('Add order hit');
        const now = new Date();
        const jsonDate = now.toJSON();
        const joined = new Date(jsonDate);
        const newOrder = new Orders({
          cid: args.cid,
          rid: args.rid,
          ooption: args.ooption,
          otime: joined,
        });
        const savedOrder = await newOrder.save();
        if (savedOrder) {
          console.log('returned 200');
          return { status: 200, entity: newOrder };
        }
        return { status: 401 };
      },
    },

    addOrderDish: {
      type: SingleOrderReturnType,
      args: {
        oid: { type: GraphQLID },
        did: { type: GraphQLID },
        dname: { type: GraphQLString },
        dprice: { type: GraphQLFloat },
        dquantity: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        console.log('Add orderdish hit');
        const newOrderDish = new OrderDish({
          oid: args.oid,
          did: args.did,
          dname: args.dname,
          dquantity: args.dprice,
          dprice: args.dquantity,
        });
        const savedOrderDish = await newOrderDish.save();
        if (savedOrderDish) {
          console.log('returned 200');
          return { status: 200 };
        }
        return { status: 401 };
      },
    },

    addReview: {
      type: SingleReviewReturnType,
      args: {
        retext: { type: GraphQLString },
        rerating: { type: GraphQLFloat },
        rdate: { type: GraphQLString },
        cid: { type: GraphQLID },
        rid: { type: GraphQLID },
      },
      async resolve(parent, args) {
        console.log('Add orderdish hit');
        const now = new Date();
        const jsonDate = now.toJSON();
        const joined = new Date(jsonDate);
        const newReview = new Reviews({
          retext: args.retext,
          rerating: args.rerating,
          cid: args.cid,
          rid: args.rid,
          rdate: joined,
        });
        const savedReview = await newReview.save();
        if (savedReview) {
          console.log('returned 200');
          return { status: 200, entity: newReview };
        }
        return { status: 401 };
      },
    },

    updateOrder: {
      type: SingleOrderReturnType,
      args: {
        ostatus: { type: GraphQLString },
        oid: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const updateData = {
          ostatus: args.ostatus,
        };
        const order = Orders.findByIdAndUpdate(args.oid, updateData, { new: true });
        if (order) {
          return { status: 200, entity: order };
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
