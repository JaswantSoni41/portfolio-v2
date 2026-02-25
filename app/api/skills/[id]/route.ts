import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import SkillCategory from '@/models/SkillCategory';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        await SkillCategory.findByIdAndDelete(params.id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await req.json();
        const skill = await SkillCategory.findByIdAndUpdate(params.id, body, { new: true });
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
