const HBase = require("hbase");

const config = {
  host: "localhost",
  port: 16010,
  timeout: 3000,
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
    console.error("Помилка при створенні таблиці:", error);
  } else {
    console.log("Таблицю створено або вже існує");
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
    console.log("Дія користувача успішно додана до HBase");
  } catch (error) {
    console.error("Помилка при додаванні дії користувача до HBase:", error);
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
    console.error("Помилка при отриманні дій користувачів з HBase:", error);
    return [];
  }
}

module.exports = { addUserAction, getUserActionsByTimeRange };
