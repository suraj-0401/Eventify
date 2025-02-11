import { Schema, model } from "mongoose"

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
)

eventSchema.pre("validate", function (next) {
  if (!this.creator && this.isNew) {
    next(new Error("Event validation failed: creator is required."));
  } else {
    next();
  }
});

export default model("Event", eventSchema)