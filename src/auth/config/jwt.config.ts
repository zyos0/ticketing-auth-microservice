export const jwtConfig = {
  algorithm: 'HS512',
  expiresIn: process.env.JwtExpiresIn || 120,
  issuer: 'ticketing-everest',
};

export const secretKey = process.env.secretKey || 'i-L7H%0;2E/>$O\'X$*zjo[ayLk0F#DFN48W\'cO~p0i"F/>57t,yp{(3?9=0/dM\'';
