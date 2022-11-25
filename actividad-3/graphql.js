const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

const schema = buildSchema(`
    type Query {
        employees: [Employee]
        employee(id: String!): Employee
        departments: [Deparment]
  }
  
    type Employee {
        name: String!
        age: Int
        status: Boolean!
  }
  type Deparment {
    name: String!
    description: String
  }
  `);
const resolvers = {
  employee: (params) => {
    console.log(params.id);
    return {
      name: "Pablo Ganan",
      age: 38,
      status: true,
    };
  },

  departments: () => {
    return [
      {
        name: "Ventas",
        description: "Ventas autos",
      },
      {
        name: "Talento Humano",
        description: "RRHH",
      },
    ];
  },

  employees: () => {
    return [
      {
        name: "Pablo Ganan",
        age: 38,
        status: true,
      },
      {
        name: "Ana Ganan",
        age: 7,
        status: true,
      },
    ];
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("Running"));
