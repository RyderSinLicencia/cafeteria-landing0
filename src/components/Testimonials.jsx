const testimonios = [
    {
        id: 1,
        nombre: "Camila S.",
        texto: "La calidad de las telas es excelente y el calce es perfecto.",
        estrellas: 5,
    },
    {
        id: 2,
        nombre: "Matías R.",
        texto: "Compré la chaqueta denim y me llegó rapidísimo. La uso todos los días.",
        estrellas: 5,
    },
    {
        id: 3,
        nombre: "Javiera L.",
        texto: "Muy buen estilo y buenos precios. Me encantó el vestido de lino.",
        estrellas: 4,
    },
];

function Testimonials() {
    return (
        <section id="testimonios" className="seccion">
            <h2>Lo que dicen nuestros clientes</h2>
            <div className="testimonios-grid">
                {testimonios.map((t) => (
                    <blockquote key={t.id} className="testimonio">
                        <div className="estrellas" aria-label={`${t.estrellas} de 5 estrellas`}>
                            {"★".repeat(t.estrellas)}{"☆".repeat(5 - t.estrellas)}
                        </div>
                        <p>"{t.texto}"</p>
                        <footer>— {t.nombre}</footer>
                    </blockquote>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;