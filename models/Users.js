import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profession: { type: String },
    dob: { type: Date },
    experiences: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    phone: { type: [String], default: [] },
    grades: { type: [String], default: [] },
    testing: { type: [String], default: [] },
    friends: { type: [String], default: [] },
    projects: { type: [String], default: [] }, // <-- aquí cambias a string
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
