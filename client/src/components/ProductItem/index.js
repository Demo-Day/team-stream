import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
// ADD LOGIC FOR IF USER IS PREMIUM ALREADY
function ProductItem(item) {
	const [state, dispatch] = useStoreContext();

	const { image, name, _id, price, quantity } = item;

	const { cart } = state;

	const addToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === _id);
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
			idbPromise("cart", "put", {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 },
			});
			idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
		}
	};

	return (
		<div className="">
			<div className="priceColumn position-relative">
				<Link
					className="productTitle position-absolute top-50 start-50 translate-middle"
					to={`/products/${_id}`}
				>
					{/* <img
						style={{ width: "100%" }}
						alt={name}
						src={`/images/${image}`}
						className="productImg"
					/> */}
					<h2>{name}</h2>
				</Link>
				<div>
					<div>
						{quantity} {pluralize("item", quantity)} in stock
					</div>
					<span className="price position-absolute translate-middle ">
						${price}
						<p className="text-muted ">/year</p>
					</span>
				</div>
				<button
					className="position-absolute translate-middle addToCartBtn btn-secondary btn"
					onClick={addToCart}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}

export default ProductItem;
