import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";
import { useLocation,  useParams } from "react-router-dom";

function CategoryScreen() {
	const { categoryName } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	let keyword = location.search;

	useEffect(() => {
		dispatch(listProducts(keyword, categoryName));
		dispatch(listUsers);
	}, [dispatch, keyword, categoryName]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="  rounded-4 pb-xl-5 ">
					<Container className="laptops">
						<Row className="  py-4">
                        {loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<div>
								<Row>
									{products
										.filter((product) => product.category === categoryName)
										.map((product) => (
											<Col key={product._id} xs sm md  lg xl>
												<Product product={product} />
											</Col>
										))}
								</Row>
								<div className=" d-flex justify-content-center "></div>
							</div>
						)}
						</Row>
					
					</Container>
				</Container>
			)}
		</div>
	);
}

export default CategoryScreen;
