
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const id = Number(params.id);
        const result = await sql.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) return NextResponse.json({ error: "Utilizador não encontrado" }, { status: 404 });
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao obter utilizador" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const id = Number(params.id);
        const body = await req.json();
        const { name, email } = body;

        if (!name || !email) return NextResponse.json({ error: "Campos inválidos" }, { status: 400 });

        await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`;
        return NextResponse.json({ message: "Utilizador atualizado com sucesso" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar utilizador" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const id = Number(params.id);

        await sql`DELETE FROM users WHERE id = ${id}`;
        return NextResponse.json({ message: "Utilizador eliminado com sucesso" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao eliminar utilizador" }, { status: 500 });
    }
}
