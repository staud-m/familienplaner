function Sidebar({ activeItemsCount }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <strong>MyApp</strong>
        <span>Persönliches Dashboard</span>
      </div>

      <nav className="nav">
        <button className="nav-item active">
          <span>🛒 Einkaufsliste</span>
          <span className="badge">{activeItemsCount}</span>
        </button>

        <button className="nav-item">
          <span>📅 Kalender</span>
          <span className="badge muted">3</span>
        </button>

        <button className="nav-item">
          <span>◔ Budget</span>
        </button>

        <button className="nav-item">
          <span>♙ Konto</span>
        </button>
      </nav>

      <div className="user-box">
        <div className="avatar">MK</div>
        <div>
          <strong>Max K.</strong>
          <span>max@mail.de</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
