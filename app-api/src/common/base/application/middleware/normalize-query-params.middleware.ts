import { Request, Response, NextFunction } from 'express';

export function normalizeQueryParams(req: Request, _res: Response, next: NextFunction) {
  const formatted: Record<string, any> = {};

  for (const [key, value] of Object.entries(req.query)) {
    const match = key.match(/^(\w+)\[(\w+)\]$/);
    if (match) {
      const [, group, subKey] = match;
      formatted[group] = formatted[group] || {};
      formatted[group][subKey] = value;
    } else {
      formatted[key] = value;
    }
  }

  req.query = formatted;
  next();
}
