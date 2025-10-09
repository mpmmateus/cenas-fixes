export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbUrl = process.env.POSTGRES_URL;

    if (!dbUrl) {
      return new Response("POSTGRES_URL não encontrada!", { status: 500 });
    }

    return new Response(`POSTGRES_URL encontrada: ${dbUrl}`);
  } catch (err) {
    console.error("Erro ao ler variável de ambiente:", err);
    return new Response("Erro ao ler variável de ambiente", { status: 500 });
  }
}
