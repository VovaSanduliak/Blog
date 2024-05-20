const HBase = require("hbase");
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.HBASE_HOST,
  port: process.env.HBASE_PORT,
  timeout: process.env.HBASE_TIMEOUT,
};

const hbaseClient = HBase.Client(config);

const userActionTableName = "user_actions";

const tableSchema = {
  name: userActionTableName,
  columnFamilies: [
    { name: "details" }, // Деталі дії
    { name: "timestamp" }, // Дата та час дії
    { name: "user" }, // Інформація про користувача
    { name: "session" }, // Інформація про сесію
    { name: "device" }, // Інформація про пристрій
    { name: "location" }, // Інформація про місцезнаходження
    { name: "browser" }, // Інформація про браузер
  ],
};

hbaseClient.createTable(tableSchema, (error) => {
  if (error) {
    console.error("Error while creating a table:", error);
  } else {
    console.log("The table has been created or already exists");
  }
});

async function addUserAction(
  user_id,
  action_type,
  action_details,
  timestamp,
  session_id,
  device_info,
  location_info,
  browser_info
) {
  try {
    await hbaseClient.putRow(userActionTableName, user_id, {
      details: {
        type: action_type,
        value: action_details,
      },
      timestamp: {
        value: timestamp,
      },
      user: {
        session_id: session_id,
        device_info: device_info,
        location_info: location_info,
        browser_info: browser_info,
      },
    });
    console.log("User action has been added to HBase");
  } catch (error) {
    console.error("Error while adding user action to HBase:", error);
  }
}

async function getUserActionsByTimeRange(startTimestamp, endTimestamp) {
  try {
    const scanner = await hbaseClient.getScanner(userActionTableName, {
      startRow: startTimestamp,
      stopRow: endTimestamp,
    });
    const userActions = [];
    for await (const row of scanner) {
      userActions.push(row);
    }
    return userActions;
  } catch (error) {
    console.error("Error while getting user's actions from HBase:", error);
    return [];
  }
}

module.exports = { addUserAction, getUserActionsByTimeRange };
