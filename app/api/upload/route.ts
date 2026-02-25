import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // For resume, enforce the name "Jaswant_Soni.pdf" regardless of input name?
        // Or handle dynamic names. The user wants "CRUD for resume file".
        // It's easiest to overwrite "Jaswant_Soni.pdf" directly if it's the resume.
        // Let's allow flexible uploads but note the resume path.

        // If the file name is 'resume', save as Jaswant_Soni.pdf
        let filename = file.name.replaceAll(" ", "_");

        // Special logic: if creating a resume, force name or just allow selection?
        // I'll just save it with its name to public/pdfs/

        const uploadDir = path.join(process.cwd(), "public/pdfs"); // target /public/pdfs
        // Ensure dir exists? It does.

        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({
            message: "Success",
            url: `/pdfs/${filename}`
        });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
