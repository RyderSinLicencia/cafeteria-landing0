import { useState } from "react";

const inicial = { nombre: "", email: "", mensaje: "" };

function validar({ nombre, email, mensaje }) {
    const errores = {};
    if (nombre.trim().length < 3) errores.nombre = "Ingresa tu nombre (mínimo 3 letras).";
    if (!/^\S+@\S+\.\S+$/.test(email)) errores.email = "Ingresa un correo válido.";
    if (mensaje.trim().length < 10) errores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return errores;
}

function ContactForm() {
    const [datos, setDatos] = useState(inicial);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
        setEnviado(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = validar(datos);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            // Aquí iría el envío real (Formspree, EmailJS o tu propia API)
            setEnviado(true);
            setDatos(inicial);
        }
    };

    return (
        <section id="contacto" className="seccion">
            <h2>Contáctanos</h2>
            <form className="formulario" onSubmit={handleSubmit} noValidate>
                <div className={`campo ${errores.nombre ? "invalido" : ""}`}>
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" value={datos.nombre} onChange={handleChange}
                        aria-invalid={!!errores.nombre} />
                    {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
                </div>

                <div className={`campo ${errores.email ? "invalido" : ""}`}>
                    <label htmlFor="email">Correo</label>
                    <input id="email" name="email" type="email" value={datos.email} onChange={handleChange}
                        aria-invalid={!!errores.email} />
                    {errores.email && <span className="error" role="alert">{errores.email}</span>}
                </div>

                <div className={`campo ${errores.mensaje ? "invalido" : ""}`}>
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea id="mensaje" name="mensaje" rows="4" value={datos.mensaje} onChange={handleChange}
                        aria-invalid={!!errores.mensaje} />
                    {errores.mensaje && <span className="error" role="alert">{errores.mensaje}</span>}
                </div>

                <button type="submit" className="btn">Enviar mensaje</button>
                {enviado && <p className="exito" role="status">¡Gracias! Te responderemos pronto. 💌</p>}
            </form>
        </section>
    );
}

export default ContactForm;