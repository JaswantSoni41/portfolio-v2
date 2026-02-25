import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find({}).sort({ featured: -1, createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
