import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { api, urlImagen } from "../services/api";
import { formatoPrecio } from "../utils/formato";

const vacio = { nombre: "", categoria: "", precio: "", color: "#d9c5b2", nuevo: false };

function Login({ onEntrar }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const { token } = await api.login(usuario, clave);
      sessionStorage.setItem("token", token);
      onEntrar();
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Acceso administrador</h2>
        <div className="campo">
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            value={usuario}
            onChange={(e) => { setUsuario(e.target.value); setError(""); }}
          />
        </div>
        <div className={`campo ${error ? "invalido" : ""}`}>
          <label htmlFor="clave">Contraseña</label>
          <input
            id="clave"
            type="password"
            value={clave}
            onChange={(e) => { setClave(e.target.value); setError(""); }}
          />
          {error && <span className="error" role="alert">{error}</span>}
        </div>
        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

function Panel({ onSalir }) {
  const { productos, agregar, actualizar, eliminar } = useProductos();

  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");

  const [archivo, setArchivo] = useState(null);
  const [imagenActual, setImagenActual] = useState(null);
  const [quitarImagen, setQuitarImagen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [inputKey, setInputKey] = useState(0);

  // Vista previa local del archivo elegido
  useEffect(() => {
    if (!archivo) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(archivo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleArchivo = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      setErrores((prev) => ({ ...prev, imagen: "Solo JPG, PNG o WEBP." }));
      e.target.value = "";
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setErrores((prev) => ({ ...prev, imagen: "La imagen no puede pesar más de 2 MB." }));
      e.target.value = "";
      return;
    }
    setErrores((prev) => ({ ...prev, imagen: undefined }));
    setArchivo(f);
    setQuitarImagen(false);
  };

  const handleQuitarImagen = () => {
    if (archivo) {
      setArchivo(null);
      setInputKey((k) => k + 1); // vacía el input de archivo
    } else {
      setQuitarImagen(true);
    }
  };

  const validar = () => {
    const err = {};
    if (form.nombre.trim().length < 3) err.nombre = "Mínimo 3 caracteres.";
    if (!form.categoria.trim()) err.categoria = "Ingresa una categoría.";
    if (!(Number(form.precio) > 0)) err.precio = "Ingresa un precio mayor a 0.";
    return err;
  };

  const manejarError = (err) => {
    if (err.status === 401) {
      sessionStorage.removeItem("token");
      onSalir();
    } else {
      setErrorServidor(err.message);
    }
  };

  const cancelar = () => {
    setEditandoId(null);
    setForm(vacio);
    setErrores({});
    setErrorServidor("");
    setArchivo(null);
    setImagenActual(null);
    setQuitarImagen(false);
    setInputKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    setErrorServidor("");
    if (Object.keys(err).length > 0) return;

    const datos = new FormData();
    datos.append("nombre", form.nombre.trim());
    datos.append("categoria", form.categoria.trim());
    datos.append("precio", String(Number(form.precio)));
    datos.append("color", form.color);
    datos.append("nuevo", String(form.nuevo));
    if (archivo) datos.append("imagen", archivo);
    if (quitarImagen) datos.append("quitarImagen", "true");

    try {
      if (editandoId) await actualizar(editandoId, datos);
      else await agregar(datos);
      cancelar();
    } catch (e) {
      manejarError(e);
    }
  };

  const editar = (p) => {
    setEditandoId(p.id);
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: String(p.precio),
      color: p.color,
      nuevo: p.nuevo,
    });
    setErrores({});
    setErrorServidor("");
    setImagenActual(p.imagen || null);
    setArchivo(null);
    setQuitarImagen(false);
    setInputKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminar = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.nombre}"?`)) return;
    try {
      await eliminar(p.id);
      if (editandoId === p.id) cancelar();
    } catch (e) {
      manejarError(e);
    }
  };

  return (
    <div className="admin">
      <div className="admin-barra">
        <h1>Panel de productos</h1>
        <div className="admin-acciones">
          <Link to="/" className="btn">Ver tienda</Link>
          <button className="btn btn-sec" onClick={onSalir}>Salir</button>
        </div>
      </div>

      <form className="formulario admin-form" onSubmit={handleSubmit} noValidate>
        <h2>{editandoId ? "Editar producto" : "Nuevo producto"}</h2>

        <div className={`campo ${errores.nombre ? "invalido" : ""}`}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
          {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
        </div>

        <div className={`campo ${errores.categoria ? "invalido" : ""}`}>
          <label htmlFor="categoria">Categoría</label>
          <input id="categoria" name="categoria" value={form.categoria} onChange={handleChange} />
          {errores.categoria && <span className="error" role="alert">{errores.categoria}</span>}
        </div>

        <div className={`campo ${errores.precio ? "invalido" : ""}`}>
          <label htmlFor="precio">Precio (CLP)</label>
          <input id="precio" name="precio" type="number" min="0" value={form.precio} onChange={handleChange} />
          {errores.precio && <span className="error" role="alert">{errores.precio}</span>}
        </div>

        <div className="campo">
          <label htmlFor="color">Color de la imagen</label>
          <input id="color" name="color" type="color" value={form.color} onChange={handleChange} />
        </div>

        <div className={`campo ${errores.imagen ? "invalido" : ""}`}>
          <label htmlFor="imagen">Imagen (JPG, PNG o WEBP, máx. 2 MB)</label>
          <input
            key={inputKey}
            id="imagen"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleArchivo}
          />
          {errores.imagen && <span className="error" role="alert">{errores.imagen}</span>}

          {(preview || (imagenActual && !quitarImagen)) && (
            <div className="preview">
              <img src={preview || urlImagen(imagenActual)} alt="Vista previa del producto" />
              <button type="button" className="link peligro" onClick={handleQuitarImagen}>
                Quitar imagen
              </button>
            </div>
          )}
        </div>

        <label className="check">
          <input type="checkbox" name="nuevo" checked={form.nuevo} onChange={handleChange} />
          Marcar como "Nuevo"
        </label>

        {errorServidor && <p className="error" role="alert">{errorServidor}</p>}

        <div className="admin-acciones">
          <button type="submit" className="btn">
            {editandoId ? "Guardar cambios" : "Agregar producto"}
          </button>
          {editandoId && (
            <button type="button" className="btn btn-sec" onClick={cancelar}>Cancelar</button>
          )}
        </div>
      </form>

      <div className="tabla-wrap">
        <table className="tabla">
          <thead>
            <tr>
              <th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Nuevo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>
                  <span
                    className="muestra"
                    style={
                      p.imagen
                        ? { backgroundImage: `url(${urlImagen(p.imagen)})` }
                        : { background: p.color }
                    }
                  />
                </td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatoPrecio(p.precio)}</td>
                <td>{p.nuevo ? "Sí" : "No"}</td>
                <td className="celda-acciones">
                  <button className="link" onClick={() => editar(p)}>Editar</button>
                  <button className="link peligro" onClick={() => handleEliminar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr><td colSpan="6" className="vacio">No hay productos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Admin() {
  const [autenticado, setAutenticado] = useState(
    () => !!sessionStorage.getItem("token")
  );

  const salir = () => {
    sessionStorage.removeItem("token");
    setAutenticado(false);
  };

  return autenticado ? (
    <Panel onSalir={salir} />
  ) : (
    <Login onEntrar={() => setAutenticado(true)} />
  );
}

export default Admin;