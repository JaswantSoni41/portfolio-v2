import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Experience from '@/models/Experience';

export async function GET() {
    try {
        await connectDB();
        const experiences = await Experience.find({}).sort({ createdAt: -1 });
        return NextResponse.json(experiences);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }
}
