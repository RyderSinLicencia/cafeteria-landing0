function Header() {
    return (
        <header className="header">
            <a href="#inicio" className="logo">NOVA Studio</a>
            <nav className="nav">
                <a href="#catalogo">Catálogo</a>
                <a href="#testimonios">Opiniones</a>
                <a href="#contacto" className="btn">Contacto</a>
            </nav>
        </header>
    );
}

export default Header;