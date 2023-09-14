/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

function Product({ product }) {
	const dispatch = useDispatch();
	const [qty, setQty] = useState(0);
	const addToCartHandler = () => {
		if (qty < product.countInStock) {
			const newQty = qty + 1;
			setQty(newQty);
			dispatch(addToCart(product._id, newQty));
		}
	};

	return (
		<div id="card" className="my-3 p-3 rounded d-flex flex-wrap  justify-content-between  bg-gradient  ">
			{product.countInStock > 0 ? (
				<Card.Text className="text-success fs-6 m-0">
					In Stock{" "}
					<span className="fas fa-check text-white bg-success rounded-circle"></span>
				</Card.Text>
			) : (
				<Card.Text className="text-danger fs-6" m-0>
					Out of Stock{" "}
					<span className="fas fa-circle-xmark   "></span>
				</Card.Text>
			)}
			<Link className=" ps-1 pe-3" to={`/product/${product._id}`}>
				<Card.Img  style={{ maxWidth: '200px', maxHeight: '200px' }} src={product.image} />
			</Link>

			<Card.Body className="  ">
				<Link className="text-decoration-none " to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong className="text-black fs-6">{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<div className="my-1 fs-6 ">
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
							color={"#f8e825"}
						/>
					</div>
				</Card.Text>

				<Row>
					<Col>
						<Card.Text className="text-black fw-bold  mb-0" as="p">
							{product.price}
							<span className="text-capitalize ">Birr</span>
						</Card.Text>
					</Col>
					<Col className="p-0  justify-content-end d-flex ">
						<button
							hidden={product.countInStock == 0}
							onClick={addToCartHandler}
							className=" rounded-2 border-0 tomato text-black mx-2">
							<span className="fas fa-cart-plus">&nbsp;</span>
						</button>
					</Col>
				</Row>
			</Card.Body>
		</div>
	);
}

export default Product;
