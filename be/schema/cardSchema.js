//const mongoose = require("mongoose");
const Joi = require("joi");

class cardSchema {
  constructor(card) {
    (this.bizName = card.bizName),
      (this.about = card.about),
      (this.address = card.address),
      (this.phone = card.phone),
      (this.pic = card.pic);
  }

  validateCard() {
    const cardSchema = Joi.object({
      bizName: Joi.string().min(2).max(250).required(),
      about: Joi.string().min(2).max(1000).required(),
      address: Joi.string().min(2).max(250).required(),
      phone: Joi.string().min(9).max(10).required(),
      pic: Joi.string().min(11).max(1024),
    });
    const result = cardSchema.validate(this, { abortEarly: false });
    return result.error ? result.error : null;
    //return schema.validate(card);
  }
}
module.exports = cardSchema;
