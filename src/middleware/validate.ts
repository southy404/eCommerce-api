import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ZodSchema } from "zod";

type ValidateSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export function validate(schemas: ValidateSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as ParamsDictionary;
      }

      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      next();
    } catch (error: any) {
      if (error?.issues) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue: any) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
        return;
      }

      console.error("VALIDATION ERROR:", error);

      res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }
  };
}
