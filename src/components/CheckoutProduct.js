import { StarIcon } from "@heroicons/react/solid";
// import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  rating,
  price,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id,
      title,
      rating,
      price,
      description,
      category,
      image,
      hasPrime,
    };
    // Push item into REDUX
    dispatch(addToBasket(product));
  };

  const removeItemFromCart = () => {
    // Remove items from cart
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      {/* Left */}
      <img src={image} height={200} width={200} className="object-contain" />
      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" key={i} />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="INR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-20"
              src={
                "https://images-na.ssl-images-amazon.com/images/G/01/dex/2022/Delivery_Choices/091222_DEX_PrimeAmazonDay_LP_Steps_1_Mobile_750x220.jpg"
              }
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right */}
      {}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToCart}>
          Add to cart
        </button>
        <button className="button" onClick={removeItemFromCart}>
          Remove from cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
