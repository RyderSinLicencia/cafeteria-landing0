function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <h3>NOVA Studio</h3>
                    <p>Moda femenina cómoda y atemporal.</p>
                </div>
                <div>
                    <h3>Horarios</h3>
                    <ul>
                        <li>Lunes a viernes: 10:00 - 19:00</li>
                        <li>Sábado: 11:00 - 17:00</li>
                        <li>Domingo: cerrado</li>
                    </ul>
                </div>
                <div>
                    <h3>Síguenos</h3>
                    <ul>
                        <li><a href="#inicio">Instagram</a></li>
                        <li><a href="#inicio">Facebook</a></li>
                        <li><a href="#inicio">TikTok</a></li>
                    </ul>
                </div>
            </div>
            <p className="copy">© 2026 NOVA Studio. Proyecto de portafolio.</p>
        </footer>
    );
}

export default Footer;