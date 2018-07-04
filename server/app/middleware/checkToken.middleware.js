import jwt from 'jsonwebtoken';
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.

export async function checkToken(ctx, next) {
  // check header or url parameters or post parameters for token
  let token = ctx.headers['authorization'];
  if (!token) return await next(); //if no token, continue

  token = token.replace('Bearer ', '');

  const user = jwt.verify(token, process.env.JWT_SECRET);
  ctx.throw(401, 'Please register Log in using a valid email to submit posts');

  ctx.user = user; //set the user to req so other routes can use it
  await next();
}
