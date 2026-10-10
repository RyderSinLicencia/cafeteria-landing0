import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../services/api";

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    try {
      setError("");
      setProductos(await api.listar());
    } catch {
      setError("No se pudo cargar el catálogo. Intenta de nuevo más tarde.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const agregar = async (producto) => {
    const creado = await api.crear(producto);
    setProductos((prev) => [...prev, creado]);
  };

  const actualizar = async (id, cambios) => {
    const actualizado = await api.actualizar(id, cambios);
    setProductos((prev) => prev.map((p) => (p.id === id ? actualizado : p)));
  };

  const eliminar = async (id) => {
    await api.eliminar(id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductosContext.Provider
      value={{ productos, cargando, error, recargar: cargar, agregar, actualizar, eliminar }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}