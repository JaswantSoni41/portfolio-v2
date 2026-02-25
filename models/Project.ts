import mongoose, { Schema, model, models } from "mongoose"
import { Project } from "@/types/project"

const ProjectSchema = new Schema<Project>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    images: [String],
    videoUrl: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

export default models.Project || model<Project>("Project", ProjectSchema)
