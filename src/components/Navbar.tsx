import ZoeLogo from "../assets/image 33.png";

function Navbar() {
  return (
    <nav className="primary-color" style={{ width: "100%", height: "80px" }}>
      <img src={ZoeLogo} className="zoe-logo" />
    </nav>
  );
}
export default Navbar;
