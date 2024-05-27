import { changeQuantityDec, changeQuantityInc, clearCart, deleteProductFromCart, getCartProductsData } from "../../store/cart/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { store } from "../../store/store";
import deleteIcon from "../../assets/delete.svg";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import arrorRight from "../../assets/arrow-right.svg";
import { Link } from "react-router-dom";
import { formatter } from "../../utils/formatter";
const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, total, loading } = useAppSelector((state) => state.cart);
  const userGuid = useAppSelector((state) => state.user.userGuid);

  const handleDeleteItem = (productId: number) => {
    dispatch(
      deleteProductFromCart({
        productId,
        userGuid,
      })
    );
  };

  const handleChangeQuantityDec = (productId: number) => {
    dispatch(changeQuantityDec({ productId, userGuid }));
  };

  const handleChangeQuantityInc = (productId: number) => {
    dispatch(changeQuantityInc({ productId, userGuid }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="py-9 px-6">
      <div className="container mx-auto gap-8 relative">
        {loading === "pending" && <div className=" absolute h-full w-full bg-white opacity-35" />}

        {items.length === 0 ? (
          <h1 className="text-2xl font-bold text-center">Your cart is emty</h1>
        ) : (
          <div className="flex gap-5">
            <div className="flex-1">
              <div className="mb-2 text-right">
                <button className="py-2 px-4 rounded-md bg-red-300  text-md font-semibold hover:bg-red-400" onClick={handleClearCart}>
                  Clear cart
                </button>
              </div>
              <table className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="text-sm text-indigo-950 uppercase ">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500" />
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Price</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {items.map((item) => {
                    console.log(item);
                    return (
                      <tr key={item.Id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          <img
                            className="w-full h-20  object-contain"
                            src={`data:image/${item.Images[0].FileExtension};base64,${item.Images[0].Image}`}
                            alt={item.Images[0].FileName}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.Name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          <div className="flex justify-left items-center gap-3 ">
                            <button
                              disabled={item.Quantity === 1}
                              className="h-6 w-6 rounded-full p-1 bg-indigo-200 hover:bg-indigo-300 active:scale-105 duration-75 disabled:bg-slate-200  disabled:active:scale-100"
                              onClick={() => handleChangeQuantityDec(item.Id)}
                            >
                              <img className="h-4 object-contain" src={minusIcon} alt="-" />
                            </button>

                            <span className="text-md w-5 text-center">{item.Quantity}</span>

                            <button
                              disabled={item.Quantity === 10}
                              className="h-6 w-6 rounded-full p-1 bg-indigo-200 hover:bg-indigo-300 active:scale-105 duration-75 disabled:bg-slate-200  disabled:active:scale-100"
                              onClick={() => handleChangeQuantityInc(item.Id)}
                            >
                              <img className="h-4 object-contain" src={plusIcon} alt="+" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {formatter("RUB", item.Price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          <button className="flex h-full justify-center items-center p-1" onClick={() => handleDeleteItem(item.Id)}>
                            <img className="h-5 object-contain" src={deleteIcon} alt="delete" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex-initial max-h-svh w-1/3 px-4 pb-2 flex flex-col justify-between ">
              <div>
                <Link
                  className="inline-flex py-4 pr-2 w-full  justify-end items-center gap-2 bg-indigo-200 text-xl font-semibold hover:bg-indigo-300 duration-75"
                  to="/checkout"
                >
                  Checkout
                  <img className="h-6 w-6 mt-1 object-contain" src={arrorRight} alt="arrow right" />
                </Link>
              </div>

              <div className="flex justify-between pt-2 border-t-2 border-indigo-950">
                <h2 className="mb-2 text-md font-semibold uppercase">Total</h2>
                <p className="text-2xl font-semibold">{formatter("RUB", total)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const loader = async () => {
  await store.dispatch(getCartProductsData());
  return null;
};
export default Cart;
