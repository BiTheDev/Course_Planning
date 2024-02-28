import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema({
    courseCode: {type: String},
    professor:{
      type: String
    },
    preference:{
      type:Array
    },
    lab: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    registrationCode:{
      type: String
    },
    students:{
      type:Number
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },

  // Additional fields can be added as needed
});

const Section = models.Section || model("Section", SectionSchema);
export default Section;
