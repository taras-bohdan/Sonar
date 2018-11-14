import loggerService from '../services/logger.service';

export async function logRequestInfo(ctx, next) {
  const start = new Date();

  try {
    // Pass the request to the next middleware function
    await next();
  } catch (e) {
    ctx.status = e.statusCode || 500;
    ctx.body = e.message;
  }

  const method = ctx.req.method.padEnd(8);
  const url = ctx.req.url.padEnd(20);
  const status = ctx.status.toString().padEnd(5);
  const ms = `${new Date() - start}ms`.padStart(5);
  const responseLength = ctx.response.length || null;

  // Log the request to the console
  loggerService.info(`${method} ${url} ${status} ${ms} - ${responseLength}`);
}
