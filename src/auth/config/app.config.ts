const {
  authAppPort,
  authMicroPort,

} = process.env;
export const AppConfig = {
  authAppPort: parseInt(authAppPort, 10) || 3000,
  authMicroPort: parseInt(authMicroPort, 10) || 3002,
};
