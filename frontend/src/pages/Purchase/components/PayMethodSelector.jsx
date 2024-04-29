import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../../reducers/cartSlice";

export const PayMethodSelector = () => {
  const { payment_method: userPayMethod } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const checkedColor = (val) => {
    return {
      backgroundColor: val === userPayMethod ? "#ef5e78" : "",
      border: val === userPayMethod ? "2px solid transparent" : "",
    };
  };
  return (
    <div>
      <form>
        <div className="form-item-heading">Төлбөрийн хэрэгсэлээ сонгох</div>
        <div className="form-pay-options">
          <div
            className="pay-input-container"
            key="Credit Card"
            style={checkedColor("Credit Card")}
          >
            <input
              type="radio"
              id={3}
              name="Select Payment"
              value="Credit Card"
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              checked={"Credit Card" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={3}>
              Credit Card
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
