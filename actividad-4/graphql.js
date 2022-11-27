const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { importSchema } = require("graphql-import");
const app = express();

const schema = buildSchema(importSchema("./schema.graphql"));

let DBEmployee = [];
const resolvers = {
  Result: {
    __resolveType: (obj) => {
      console.log("Result" + result);
      if (obj.description) {
        return "Department";
      }
      if (obj.age) {
        return "Employee";
      }
      return null;
    },
  },
  Search: (params) => {
    console.log(params.search);
    let result = DBEmployee.find((obj) => obj.id === params.search);
    console.log(result);
    return result;
  },
  CreateEmployee: ({ body }) => {
    DBEmployee.push(body);
    return {
      ...body,
      id: DBEmployee.length - 1,
    };
  },
  ListEmployees: () => {
    return DBEmployee.map((item, id) => ({ ...item, id: id + 1 }));
  },
  RemoveEmployee: (params) => {
    DBEmployee.splice(params.id, 1);
    return DBEmployee.map((item, id) => ({ ...item, id: id + 1 }));
  },

  GetEmployee: (params) => {
    return { ...DBEmployee[params.id], id: params.id };
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
