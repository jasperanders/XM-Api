import m2s from "mongoose-to-swagger";
import mongoose, { Schema } from "mongoose";
import { paginate, filter, ownership } from "s/mongoose";
import rules from "./acl";
import userAcl from "a/user/acl";

// Data schema for multiple_choice_question

const dataSchema = new Schema(
  {
    content: {
      questionId: String,
      possibleAnswers: [String],
    },
    author: {
      type: "ObjectId",
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

dataSchema.plugin(filter, { rules });
dataSchema.plugin(paginate, { rules, populateRules: { author: userAcl } });
dataSchema.plugin(ownership);

const model = mongoose.model("MultipleChoiceQuestion", dataSchema);
model.swaggerSchema = m2s(model);
export const schema = model.schema;

export default model;
