"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Artigo = {
  id?: number;
  titulo: string;
  categoria?: string;
  imagem?: string;
  texto?: string;
  tabela: string;
};

export default function TodosArtigosPage() {
  const [search, setSearch] = useState("");
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [filteredArtigos, setFilteredArtigos] = useState<Artigo[]>([]);
  const [selectedArtigo, setSelectedArtigo] = useState<Artigo | null>(null);
  const [open, setOpen] = useState(false);
  const [modoInserir, setModoInserir] = useState(false);

  const tabelas = [
    "home",
    "noticias",
    "virais",
    "desporto",
    "insolito",
    "tecnologia",
    "curiosidades",
    "artigos",
  ];

  const fetchArtigos = async () => {
    const res = await fetch("/api/todos-artigos");
    const data = await res.json();
    setArtigos(data);
    setFilteredArtigos(data);
  };

  useEffect(() => {
    fetchArtigos();
  }, []);

  useEffect(() => {
    setFilteredArtigos(
      artigos.filter(
        (a) =>
          a.titulo.toLowerCase().includes(search.toLowerCase()) ||
          (a.categoria?.toLowerCase().includes(search.toLowerCase()) ?? false)
      )
    );
  }, [search, artigos]);

  const handleEdit = (artigo: Artigo) => {
    setSelectedArtigo(artigo);
    setModoInserir(false);
    setOpen(true);
  };

  const handleDelete = async (artigo: Artigo) => {
    if (
      !confirm(`Tem a certeza que quer apagar "${artigo.titulo}" da tabela "${artigo.tabela}"?`)
    )
      return;
    await fetch(`/api/${artigo.tabela}/${artigo.id}`, { method: "DELETE" });
    fetchArtigos();
  };

  const handleSave = async () => {
    if (!selectedArtigo) return;
    const method = modoInserir ? "POST" : "PUT";
    const url = modoInserir
      ? `/api/${selectedArtigo.tabela}`
      : `/api/${selectedArtigo.tabela}/${selectedArtigo.id}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedArtigo),
    });

    setOpen(false);
    fetchArtigos();
  };

  const handleAdd = (tabela: string) => {
    setSelectedArtigo({
      titulo: "",
      categoria: "",
      imagem: "",
      texto: "",
      tabela,
    });
    setModoInserir(true);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Artigos</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Procurar por título ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-4">
            {tabelas.map((t) => (
              <Button key={t} onClick={() => handleAdd(t)} size="sm">
                + {t}
              </Button>
            ))}
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-1">ID</th>
                <th className="p-2">Título</th>
                <th className="p-2">Categoria</th>
                <th className="p-2">Tabela</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtigos.map((a) => (
                <tr key={`${a.tabela}-${a.id}`} className="border-b hover:bg-gray-100">
                  <td className="p-1">{a.id}</td>
                  <td className="p-2">{a.titulo}</td>
                  <td className="p-2">{a.categoria ?? "-"}</td>
                  <td className="p-2">{a.tabela}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(a)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(a)}>
                      Apagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredArtigos.length === 0 && (
            <p className="text-gray-500 mt-4 text-sm">Nenhum artigo encontrado.</p>
          )}
        </CardContent>
      </Card>

      {/* Modal de edição / inserção */}
      {selectedArtigo && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-96">
            <DialogHeader>
              <DialogTitle>
                {modoInserir
                  ? `Novo artigo em "${selectedArtigo.tabela}"`
                  : `Editar artigo (${selectedArtigo.tabela})`}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Título"
                value={selectedArtigo.titulo}
                onChange={(e) =>
                  setSelectedArtigo({ ...selectedArtigo, titulo: e.target.value })
                }
              />
              <Input
                placeholder="Categoria"
                value={selectedArtigo.categoria ?? ""}
                onChange={(e) =>
                  setSelectedArtigo({ ...selectedArtigo, categoria: e.target.value })
                }
              />
              <Input
                placeholder="Imagem (URL)"
                value={selectedArtigo.imagem ?? ""}
                onChange={(e) =>
                  setSelectedArtigo({ ...selectedArtigo, imagem: e.target.value })
                }
              />
              {selectedArtigo.imagem && selectedArtigo.imagem.trim() !== "" && (
                <img
                  src={selectedArtigo.imagem}
                  alt="Pré-visualização"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              )}
              <textarea
                placeholder="Texto"
                value={selectedArtigo.texto ?? ""}
                onChange={(e) =>
                  setSelectedArtigo({ ...selectedArtigo, texto: e.target.value })
                }
                className="border rounded p-2 min-h-[100px]"
              />
            </div>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button onClick={handleSave}>
                {modoInserir ? "Adicionar" : "Guardar"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
