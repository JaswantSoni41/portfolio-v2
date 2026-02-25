import { Schema, model, models } from "mongoose";

export interface SkillCategory {
    _id?: string;
    title: string;
    description: string;
    skills: string[]; // Array of skill names like ["React", "Node.js"]
    gradient: string; // CSS class for gradient
    order?: number;
}

const SkillCategorySchema = new Schema<SkillCategory>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    gradient: String,
    order: { type: Number, default: 0 }
});

export default models.SkillCategory || model<SkillCategory>("SkillCategory", SkillCategorySchema);
