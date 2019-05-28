const {
  dbHost,
  dbName,
  dbPort,
  dbUserName,
  dbPass,

} = process.env;
export const DataBaseConfig = {
  dbHost: dbHost || 'localhost',
  dbName: dbName || 'ticketing-auth',
  dbPort: dbPort || 27017,
  dbUserName: dbUserName || '',
  dbPass: dbPass || '',
};
