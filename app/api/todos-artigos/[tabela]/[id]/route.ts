// app/api/[tabela]/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Tabelas permitidas para segurança
const tabelasPermitidas = [
  "home", "noticias", "virais", "desporto", "insolito", "tecnologia", "curiosidades", "artigos"
];

function validarTabela(tabela: string) {
  if (!tabelasPermitidas.includes(tabela)) {
    throw new Error("Tabela inválida");
  }
  return tabela;
}

export async function GET(req: NextRequest, context: { params: { tabela: string; id: string } }) {
  const { tabela, id } = context.params;
  validarTabela(tabela);

  let result;
  if (id === "0") {   // string mesmo
    result = await sql.query(`SELECT * FROM ${tabela} ORDER BY id ASC`);
  } else {
    result = await sql.query(`SELECT * FROM ${tabela} WHERE id = $1`, [Number(id)]);
  }

  return NextResponse.json(result.rows);
}




export async function POST(req: NextRequest, context: { params: { tabela: string } }) {
  try {
    const { tabela } = context.params;
    validarTabela(tabela);

    const body = await req.json();
    const columns = Object.keys(body);
    const values = Object.values(body);

    const placeholders = values.map((_, idx) => `$${idx + 1}`).join(", ");

    const result = await sql.query(
      `INSERT INTO ${tabela} (${columns.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar registo" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, context: { params: { tabela: string; id: string } }) {
  try {
    const { tabela, id } = context.params;
    validarTabela(tabela);

    const body = await req.json();

    // Montar SET manualmente
    const sets: string[] = [];
    const values: any[] = [];
    let i = 1;
    for (const [col, val] of Object.entries(body)) {
      sets.push(`${col} = $${i}`);
      values.push(val);
      i++;
    }

    // Adicionar id como último parâmetro
    values.push(Number(id));

    const result = await sql.query(
      `UPDATE ${tabela} SET ${sets.join(", ")} WHERE id = $${i} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Registo não encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar registo" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: { params: { tabela: string; id: string } }) {
  try {
    const { tabela, id } = context.params;
    validarTabela(tabela);

    const result = await sql.query(
      `DELETE FROM ${tabela} WHERE id = $1 RETURNING *`,
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Registo não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Registo eliminado com sucesso", deleted: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao eliminar registo" }, { status: 500 });
  }
}

