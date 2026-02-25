import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import SkillCategory from '@/models/SkillCategory';

export async function GET() {
    try {
        await connectDB();
        const skills = await SkillCategory.find({}).sort({ order: 1 });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const skill = await SkillCategory.create(body);
        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill category' }, { status: 500 });
    }
}
