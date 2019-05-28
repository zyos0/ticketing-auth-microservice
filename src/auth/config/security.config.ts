const {
  saltRounds,
  confirmExpiration,
  forgotExpiration,
  points,
  duration,
} = process.env;
export const SecurityConf = {
  saltRounds: parseInt(saltRounds, 10) || 5,
  confirmExpiration: parseInt(confirmExpiration, 10) || 216000000,
  forgotExpiration: parseInt(forgotExpiration, 10) || 600000,
  points: parseInt(points, 10) || 50,
  duration: parseInt(duration, 10) || 10,
};
