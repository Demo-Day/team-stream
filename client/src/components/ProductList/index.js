import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
	const [state, dispatch] = useStoreContext();

	const { currentCategory } = state;

	const { loading, data } = useQuery(QUERY_PRODUCTS);

	useEffect(() => {
		if (data) {
			dispatch({
				type: UPDATE_PRODUCTS,
				products: data.products,
			});
			data.products.forEach((product) => {
				idbPromise("products", "put", product);
			});
		} else if (!loading) {
			idbPromise("products", "get").then((products) => {
				dispatch({
					type: UPDATE_PRODUCTS,
					products: products,
				});
			});
		}
	}, [data, loading, dispatch]);

	function filterProducts() {
		if (!currentCategory) {
			return state.products;
		}

		return state.products.filter(
			(product) => product.category._id === currentCategory
		);
	}

	return (
		<div className="">
			<div className="productHeader ">
				<h2>Billed Annually</h2>
			</div>
			<div className="container-fluid">
				<div className="">
					{state.products.length ? (
						<div className="d-flex flex-row">
							{filterProducts().map((product) => (
								<div className="col-12 col-md-4 ">
									<ProductItem
										key={product._id}
										_id={product._id}
										image={product.image}
										name={product.name}
										price={product.price}
										quantity={product.quantity}
									/>
								</div>
							))}
						</div>
					) : (
						<h3 className="">
							You haven't added any products yet!
						</h3>
					)}
					{loading ? <img src={spinner} alt="loading" /> : null}
				</div>
			</div>
		</div>
	);
}

export default ProductList;
