const oracledb = require("oracledb");

module.exports.execute = async (query, params = {}) => {
  const credentials = {
    user: process.env.DB_SCHEMA,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
  };

  /**
   ** Creates a new, standalone, non-pooled connection.
   For situations where connections are used infrequently, creating a standalone connection may be more efficient than creating and managing a connection pool. 
   However, in most cases, Oracle recommends getting connections from a connection pool.
   */
  const connection = await oracledb.getConnection(credentials);

  /** 
   An array of node-oracledb types. The valid types are oracledb.DATE, oracledb.NUMBER, oracledb.BUFFER, and oracledb.CLOB. 
   When any column having one of the specified types is queried with execute () or queryStream (), 
   the column data is returned as a string instead of the default representation.
   */
  oracledb.fetchAsString = [oracledb.CLOB];

  /**
   ** This call executes a single SQL or PL/SQL statement.
   @param sql — The SQL statement that is executed. The statement may contain bind parameters.
   @param bindParams — This function parameter is needed if there are bind parameters in the SQL statement.
   @param options — This is an optional parameter to execute() that may be used to control statement execution.
   */

  const result = await connection.execute(query, params, {
    outFormat: oracledb.OBJECT
  });

  /**
   ** Releases a connection.
   Calling close() as soon as a connection is no longer required is strongly encouraged for system efficiency. 
   Calling close() for pooled connections is required to prevent the pool running out of connections.
   When a connection is released, any ongoing transaction on the connection is rolled back.
   If an error occurs on a pooled connection and that error is known to make the connection unusable, 
   then close() will drop that connection from the connection pool so a future pooled getConnection() call that grows the pool will create a new, valid connection.
   */
  connection.close();

  return result.rows;
};
