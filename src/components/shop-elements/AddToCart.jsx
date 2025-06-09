import { useState } from "react";

const AddToCart = ({ id, addToCart, }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex gap-2 items-center">

			<div className="flex  gap-2 items-center boder border-gray-500 border-solid">
				<span onClick={() => addToCart(id)} className="px-3 py-2 bg-blue-400 rounded-sm text-white text-xl">+</span>
				<span className="px-3 py-2  rounded-sm  text-xl">1</span>
				<span onClick={() => addToCart(id)} className="px-3 py-2 bg-blue-400 rounded-sm text-white text-xl">-</span>
			</div>
			<div onClick={() => addToCart(id)} className="bg-blue-600 text-white px-4 py-3 rounded-sm">Add To Cart</div>


		</div>
	);
};

export default AddToCart;
