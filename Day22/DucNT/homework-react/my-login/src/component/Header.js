import img from '../assets/img/sally.png';
function Header() {
  return (
    <div>
      <header className="header">
          <img src={img} alt="Ảnh Sally" className="page-image" />
      </header>
    </div>
  );
}

export default Header;
