const productos = [
    { id: 1, nombre: "Espresso", precio: 2.5, descripcion: "Intenso, de granos de origen único.", emoji: "☕" },
    { id: 2, nombre: "Cappuccino", precio: 3.5, descripcion: "Espresso con leche vaporizada y espuma cremosa.", emoji: "🥛" },
    { id: 3, nombre: "Cold Brew", precio: 4, descripcion: "Extracción en frío durante 12 horas.", emoji: "🧊" },
    { id: 4, nombre: "Croissant", precio: 2.8, descripcion: "Horneado cada mañana con mantequilla.", emoji: "🥐" },
    { id: 5, nombre: "Cheesecake", precio: 4.5, descripcion: "Con salsa de frutos rojos.", emoji: "🍰" },
    { id: 6, nombre: "Té chai", precio: 3.2, descripcion: "Especiado, con leche y miel.", emoji: "🍵" },
];

function Menu() {
    return (
        <section id="menu" className="seccion">
            <h2>Nuestro menú</h2>
            <div className="menu-grid">
                {productos.map((p) => (
                    <article key={p.id} className="card">
                        <span className="card-emoji">{p.emoji}</span>
                        <h3>{p.nombre}</h3>
                        <p>{p.descripcion}</p>
                        <strong>${p.precio.toFixed(2)}</strong>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Menu;