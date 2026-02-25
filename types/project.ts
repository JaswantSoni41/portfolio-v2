export interface Project {
    _id?: string
    title: string
    description: string
    techStack: string[]
    liveUrl?: string
    githubUrl?: string
    images?: string[]
    videoUrl?: string
    featured?: boolean
    createdAt?: Date
}
