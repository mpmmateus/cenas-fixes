"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UtilizadoresPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch de utilizadores
const fetchUsers = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""; // ex: https://teu-projeto.vercel.app
    const res = await fetch(`${baseUrl}/api/utilizadores`);
    if (!res.ok) throw new Error("Falha ao buscar utilizadores");
    const data = await res.json();
    setUsers(data);
    setFilteredUsers(data);
  } catch (error) {
    console.error("Erro no fetchUsers:", error);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // Abrir modal para editar
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // Apagar utilizador
  const handleDelete = async (id: number) => {
    if (!confirm("Tem a certeza que quer apagar este utilizador?")) return;
    await fetch(`/api/utilizadores/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // Guardar alterações do utilizador
  const handleSave = async () => {
    if (!selectedUser) return;
    await fetch(`/api/utilizadores/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    });
    setOpen(false);
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Utilizadores</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Procurar por nome ou email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4"
          />

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-1">ID</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Email</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-100">
                  <td className="p-1">{u.id}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(u)}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)}>Apagar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-gray-500 mt-4 text-sm">Nenhum utilizador encontrado.</p>
          )}
        </CardContent>
      </Card>

      {/* Modal de edição */}
      {selectedUser && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-96">
            <DialogHeader>
              <DialogTitle>Editar Utilizador</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Nome"
                value={selectedUser.name}
                onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={selectedUser.email}
                onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </div>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button onClick={handleSave}>Guardar</Button>
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
