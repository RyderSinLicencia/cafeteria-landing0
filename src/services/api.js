const API = import.meta.env.VITE_API_URL;
const BASE = API.replace(/\/api\/?$/, "");

export const urlImagen = (nombre) => (nombre ? `${BASE}/uploads/${nombre}` : null);

async function pedir(ruta, opciones = {}) {
  const token = sessionStorage.getItem("token");
  const esFormData = opciones.body instanceof FormData;

  const res = await fetch(`${API}${ruta}`, {
    ...opciones,
    headers: {
      ...(esFormData ? {} : { "Content-Type": "application/json" }),
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
  crear: (formData) => pedir("/productos", { method: "POST", body: formData }),
  actualizar: (id, formData) => pedir(`/productos/${id}`, { method: "PUT", body: formData }),
  eliminar: (id) => pedir(`/productos/${id}`, { method: "DELETE" }),
};