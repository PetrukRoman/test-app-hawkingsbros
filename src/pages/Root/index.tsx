import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { store } from "../../store/store";
import { fetchUserData } from "../../store/userSlice";
import { updateSummaryCartData } from "../../store/cart/actions";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export const loader = async () => {
  await store.dispatch(fetchUserData());
  await store.dispatch(updateSummaryCartData());

  return null;
};

export default Root;
