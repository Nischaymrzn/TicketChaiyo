
export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest", // if using Babel to handle ES modules
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
  };
  