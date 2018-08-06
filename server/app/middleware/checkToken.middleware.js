import jwt from 'jsonwebtoken';
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.

/**
 * Verify provided user token
 * @param {object} ctx - context
 * @param {function} next - next middleware or function to be called
 * @returns {Promise<*>}
 */
export async function checkToken(ctx, next) {
  // check header or url parameters or post parameters for token
  let token = ctx.headers['authorization'];
  if (!token) return ctx.throw(401, 'Please specify auth token'); //if no token, continue

  token = token.replace('Bearer ', '');

  try {
    ctx.user = jwt.verify(token, process.env.JWT_SECRET); //set the user to req so other routes can use it
  } catch (err) {
    ctx.throw(401, err.message);
  }

  await next();
}
