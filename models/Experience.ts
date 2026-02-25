import { Schema, model, models } from "mongoose";

export interface Experience {
    _id?: string;
    title: string;
    company: string;
    dates: string;
    description: string;
    skills?: string[];
    logoUrl?: string; // Optional company logo
    createdAt?: Date;
}

const ExperienceSchema = new Schema<Experience>({
    title: { type: String, required: true },
    company: { type: String, required: true },
    dates: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    logoUrl: String,
    createdAt: { type: Date, default: Date.now }
});

export default models.Experience || model<Experience>("Experience", ExperienceSchema);
