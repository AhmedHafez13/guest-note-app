import Joi from 'joi';

class NoteValidation {
  public validateCreateNote(data: any): Joi.ValidationResult {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(255).required(),
      content: Joi.string().trim().min(3).required(),
      typeId: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data);
  }

  public validateNoteId(data: any): Joi.ValidationResult {
    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data, { convert: true });
  }

  public validatePageParams(
    data: any,
    defaults: { page: number; pageSize: number }
  ): Joi.ValidationResult {
    const schema = Joi.object({
      page: Joi.number().integer().min(1).default(defaults.page),
      pageSize: Joi.number().integer().min(1).max(100).default(defaults.pageSize),
    });

    return schema.validate(data, { convert: true });
  }
}

export default new NoteValidation();
