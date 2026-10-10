function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="logo">
        <img src="/logo.jpg" alt="Logo Boutique ChicasGlam" />
        <span className="logo-texto">
          <small>Boutique</small>
          <strong>ChicasGlam</strong>
        </span>
      </a>
      <nav className="nav">
        <a href="#catalogo">Catálogo</a>
        <a href="#testimonios">Opiniones</a>
        <a href="#contacto" className="btn">Contacto</a>
      </nav>
    </header>
  );
}

export default Header;