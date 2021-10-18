const oracledb = require("./oracle");

module.exports.oraclelib = async (event) => {
  console.log(event.body);

  const query = "SELECT * FROM EMPLOYEES";

  try {
    const rows = await oracledb.execute(query);

    const response = {
      message: "Your function executed successfully!",
      rows
    };

    return { statusCode: 200, body: JSON.stringify(response, null, 2) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: JSON.stringify(err, null, 2) };
  }
};
