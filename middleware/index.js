import { fi } from "date-fns/locale";

export async function runMiddleware(req, res, ...middlewares) {
  middlewares = middlewares.filter((fn) => typeof fn === "function");

  for (const middleware of middlewares) {
    await new Promise((resolve, reject) => {
      middleware(req, res, (error) => {
        error instanceof Error ? reject(error) : resolve();
      });
    });
  }
}

/**
 *
 * @param {string[]} methods
 * @default 'GET,HEAD,PUT,PATCH,POST,DELETE'
 */
export function allowRequestMethods(
  methods = ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"]
) {
  return (req, res, next) => {
    const method = req.method;
    if (methods.includes(method)) {
      return next();
    }

    res.status(400).end();
  };
}