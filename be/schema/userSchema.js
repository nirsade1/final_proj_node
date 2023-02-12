const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JOI = require("joi");

class userSchema {
  constructor(object) {
    (this.user = object.user),
      (this.email = object.email),
      (this.password = object.password),
      (this.biz = object.biz);
  }

  validatePost() {
    const postSchema = JOI.object({
      user: JOI.string().required(),
      email: JOI.string().email().required(),
      password: JOI.string().required().min(6).max(12),
      biz: JOI.boolean(),
    });

    const result = postSchema.validate(this, { abortEarly: false });
    return result.error ? result.error : null;
  }
}
module.exports = userSchema;
