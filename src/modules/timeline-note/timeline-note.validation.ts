import Joi from 'joi';

class TimelineNoteValidation {
  public validateNoteId(data: { ids: any[] }): Joi.ValidationResult {
    const schema = Joi.object({
      ids: Joi.array().items(Joi.number().integer().min(1)).required(),
    });

    return schema.validate(data, { convert: true });
  }

  public validatePageParams(
    data: any,
    defaults: { page: number; pageSize: number; types?: number[] }
  ): Joi.ValidationResult {
    const schema = Joi.object({
      page: Joi.number().integer().min(1).default(defaults.page),
      pageSize: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(defaults.pageSize),
      types: Joi.array().items(Joi.number().integer().min(1)),
    });

    return schema.validate(data, { convert: true });
  }
}

export default new TimelineNoteValidation();
