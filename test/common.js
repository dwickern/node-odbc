var odbc = require("../");
//odbc.library = '/usr/lib/odbc/libsqlite3odbc-0.91';
//odbc.library = '/usr/lib/x86_64-linux-gnu/odbc/libtdsodbc';
//odbc.library = '/opt/sqlncli-11.0.1790.0/lib64/libsqlncli-11.0';

exports.connectionString = 'DSN=*LOCAL;UID=MARKIRISH;PWD=my1pass;CHARSET=UTF8';
exports.title = "Sqlite3";
exports.dialect = "sqlite";
exports.user = "";

if (process.argv.length === 3) {
  exports.connectionString = process.argv[2];
}

exports.connectionObject = {
	DRIVER : "{SQLITE3}",
	DATABASE : "data/sqlite-test.db"
};

try {
  exports.testConnectionStrings = require('./config.testConnectionStrings.json');
}
catch (e) {
  exports.testConnectionStrings = [{ title : exports.title, connectionString : exports.connectionString, dialect : exports.dialect }];
}

try {
  exports.benchConnectionStrings = require('./config.benchConnectionStrings.json');
}
catch (e) {
  exports.benchConnectionStrings = [{ title : exports.title, connectionString : exports.connectionString, dialect : exports.dialect }];
}

if (process.argv.length === 3) {
  //look through the testConnectionStrings to see if there is a title that matches
  //what was requested.
  var lookup = process.argv[2];
  
  exports.testConnectionStrings.forEach(function (connectionString) {
    if (connectionString && (connectionString.title == lookup || connectionString.connectionString == lookup)) {
      exports.connectionString = connectionString.connectionString;
      exports.dialect = connectionString.dialect;
      exports.user = connectionString.user;
    }
  });
}

exports.databaseName = "test";
exports.tableName = "MARK.TEST2";

exports.dropTables = function (db, cb) {
  db.query("drop table " + exports.tableName, cb);
};

exports.createTables = function (db, cb) {
  console.log("creating table");
  db.query("create table " + exports.tableName + " (COLINT INTEGER, COLDATETIME DATE, COLTEXT VARCHAR(20));", null, cb);
};
