// import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

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
    // Sending the product as an action to the REDUX store... the basket slice
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <img src={image} height={200} width={200} className="object-contain" />

      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="INR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
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
      <button className="mt-auto button" onClick={addItemToCart}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
