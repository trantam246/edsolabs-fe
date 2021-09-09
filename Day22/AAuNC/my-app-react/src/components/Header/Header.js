import '../Header/Header.css'

function Header() {
  return (
    <div id="l-header">
        <div className="time">9:41</div>
        <div className="list-icon">
            <i className="fas fa-signal"></i>
            <i className="fas fa-wifi"></i>
            <i className="fas fa-battery-full"></i>
        </div>
    </div>
  );
}

export default Header;
