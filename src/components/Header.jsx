function Header() {
    return (
        <header className="header">
            <a href="#inicio" className="logo">☕ Café Aroma</a>
            <nav className="nav">
                <a href="#menu">Menú</a>
                <a href="#testimonios">Testimonios</a>
                <a href="#contacto" className="btn">Contacto</a>
            </nav>
        </header>
    );
}

export default Header;