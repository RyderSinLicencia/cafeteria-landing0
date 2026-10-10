const productos = [
    { id: 1, nombre: "Polera Oversize", categoria: "Poleras", precio: 19990, color: "#d9c5b2", nuevo: true },
    { id: 2, nombre: "Jeans Slim Fit", categoria: "Pantalones", precio: 39990, color: "#7a8ba3", nuevo: false },
    { id: 3, nombre: "Chaqueta Denim", categoria: "Chaquetas", precio: 54990, color: "#4f6a8a", nuevo: true },
    { id: 4, nombre: "Vestido Lino", categoria: "Vestidos", precio: 44990, color: "#e6d8c3", nuevo: false },
    { id: 5, nombre: "Hoodie Básico", categoria: "Polerones", precio: 34990, color: "#3a3a3a", nuevo: false },
    { id: 6, nombre: "Camisa Blanca", categoria: "Camisas", precio: 27990, color: "#f0ede8", nuevo: true },
];

const formatoPrecio = (n) => "$" + n.toLocaleString("es-CL");

function Catalogo() {
    return (
        <section id="catalogo" className="seccion">
            <h2>Catálogo</h2>
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
        </section>
    );
}

export default Catalogo;