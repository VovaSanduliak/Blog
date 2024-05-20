import neo4j, { Driver } from "neo4j-driver";

const config = {
  uri: "neo4j+s://3e9024c9.databases.neo4j.io:7687",
  user: "neo4j",
  password: "AiseGUL5ZqWqBCSTBK1wdQyCge6oPGaK7CYeqAsCc8U",
};

let driver: Driver;

const connectToNeo4j = async () => {
  try {
    driver = neo4j.driver(
      config.uri,
      neo4j.auth.basic(config.user, config.password)
    );

    const serverInfo = await driver.getServerInfo();
    console.log("Neo4j connection established");
    console.log(serverInfo);

    return driver;
  } catch (err) {
    console.log(`Neo4j connection error: ${err}`);
  }
};

const getSession = () => {
  if (!driver) {
    throw new Error("Driver is not initialized. Call connectToNeo4j first.");
  }
  return driver.session();
};

export { connectToNeo4j, getSession };
