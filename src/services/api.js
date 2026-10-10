const API = import.meta.env.VITE_API_URL;

async function pedir(ruta, opciones = {}) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${API}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || "Error en la solicitud");
    error.status = res.status;
    throw error;
  }
  return data;
}

export const api = {
  login: (usuario, password) =>
    pedir("/auth/login", { method: "POST", body: JSON.stringify({ usuario, password }) }),
  listar: () => pedir("/productos"),
  crear: (p) => pedir("/productos", { method: "POST", body: JSON.stringify(p) }),
  actualizar: (id, p) => pedir(`/productos/${id}`, { method: "PUT", body: JSON.stringify(p) }),
  eliminar: (id) => pedir(`/productos/${id}`, { method: "DELETE" }),
};