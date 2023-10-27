import schemaMiddleware from "./schema.middleware";
import compileSchema from "../services/schema/compile.schema";
import errorSchema from "../services/schema/error.schema";
import ValidateSchema from "../services/schema/validate.schema";
import { errorMessageObject } from "../types/error.types";

class Validation {
    validate = async(event: string, object: unknown): Promise<errorMessageObject> => {
        let errorRes: errorMessageObject = {isValid: false, errorMsg: ""};
        const key = event as (keyof typeof schemaMiddleware.schema);
        let schema: object = schemaMiddleware.schema[key];
        if (schema) {
            const validateSchemaFn = await compileSchema.compile(schema);
            errorRes =  await ValidateSchema.validateSchema(object as object, validateSchemaFn);
        } else {
            errorRes.isValid = true;
        }
        return errorRes;
    }
}

export default new Validation();
