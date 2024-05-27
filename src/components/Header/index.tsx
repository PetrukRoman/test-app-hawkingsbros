import NavBar from "../Navbar";
import cartIcon from "../../assets/cart.svg";
import { useAppSelector } from "../../store/hooks";
import { NavLink } from "react-router-dom";
const Header = () => {
  const totalProducts = useAppSelector((state) => state.cart.totalProducts);
  return (
    <header className="shadow-sm h-16">
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto flex h-16 gap-2 justify-between items-center">
          <div>Logo</div>

          <NavBar
            links={[
              {
                to: "/",
                title: "Home",
              },
              {
                title: "Store",
                submenu: [
                  {
                    title: "Phones",
                    to: "/store-phones",
                  },
                  {
                    title: "Pc",
                    to: "/store-pc",
                  },
                ],
              },
              {
                title: "About",
                to: "/about",
              },
            ]}
          />
          <NavLink to="/cart" className="group flex h-full justify-center items-center px-2 relative">
            <img className="h-7 object-contain  group-hover:opacity-75" src={cartIcon} alt="cart" />
            <span className="absolute top-2  -right-2 h-6 w-6 flex justify-center items-center rounded-full  bg-indigo-500 text-white font-medium text-sm/[0] ">
              {totalProducts}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
