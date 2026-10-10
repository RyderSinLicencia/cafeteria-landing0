import { useProductos } from "../context/ProductosContext";
import { formatoPrecio } from "../utils/formato";

function Catalogo() {
  const { productos, cargando, error } = useProductos();

  return (
    <section id="catalogo" className="seccion">
      <h2>Catálogo</h2>
      {cargando ? (
        <p className="vacio">Cargando productos...</p>
      ) : error ? (
        <p className="vacio error">{error}</p>
      ) : productos.length === 0 ? (
        <p className="vacio">Pronto tendremos nuevos productos.</p>
      ) : (
        <div className="catalogo-grid">
          {productos.map((p) => (
            <article key={p.id} className="producto">
              <div className="producto-img" style={{ background: p.color }}>
                {p.nuevo && <span className="badge">Nuevo</span>}
              </div>
              <div className="producto-info">
                <small>{p.categoria}</small>
                <h3>{p.nombre}</h3>
                <strong>{formatoPrecio(p.precio)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Catalogo;