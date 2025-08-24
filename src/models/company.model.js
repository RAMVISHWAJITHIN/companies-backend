import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      enum: ["IT", "Finance", "Healthcare", "Education", "Retail", "Other"],
      default: "Other",
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Please enter a valid image URL",
      },
    },
    location: {
      city: { type: String, required: [true, "City is required"] },
      state: { type: String },
      country: { type: String, required: [true, "Country is required"] },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
