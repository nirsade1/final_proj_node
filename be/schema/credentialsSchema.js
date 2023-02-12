const mongoose = require("mongoose");
const JOI = require("joi");

class credentialsSchema {
  constructor(object) {
    (this.email = object.email), (this.password = object.password);
  }

  validatePost2() {
    const postSchema = JOI.object({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
    });

    const result = postSchema.validate(this, { abortEarly: false });
    return result.error ? result.error : null;
  }
}

module.exports = credentialsSchema;
