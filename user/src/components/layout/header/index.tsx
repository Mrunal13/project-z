import Link from "next/link";
import s from "./header.module.css";

const Header = () => {
  return (
    <div className={s.headerwrapper}>
      <div className="container">
        <div className={s.navbar}>
          <div className={s.logo}>Logo Here</div>
          <div className={s.menu}>
            <ul>
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#about">About</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
              <li>
                <Link href="#catalog">Setting</Link>
              </li>
              <li>
                <Link href="#delivery">Delivery</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
