import { useEffect, useState } from 'react';
import api from '@/common/api/authAxios';
import { Table } from 'react-bootstrap';
import { Spinner } from '@/components';
const urlConfig = import.meta.env.VITE_BASIC_URL;
function Crawler() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const requestOptions = async () => {
			try {
				const resposne = await api.get(`${urlConfig}/api/crawl/products`);
				if (Array.isArray(resposne.data)) {
					console.log(resposne.data);
					setProducts(resposne.data);
					return resposne.data;
				}
			} catch (error) {
				console.log('error fetching data : ', error);
			}
		};
		requestOptions();
	}, []);

	console.log(products);
	return (
		<div>
			<div className="d-flex justify-content-center">
				<h1>Product List</h1>
			</div>

			<div className="d-flex justify-content-center">
				{Array.isArray(products) && products.length > 0 ? (
					<Table>
						<thead>
							<tr>
								<th>image</th>
								<th>title</th>
								<th>price</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => (
								<tr key={index}>
									<td
									// style={{
									// 	border: '1px solid black',
									// 	width: 100,
									// 	height: 100,
									// }}
									>
										<img src={product.image} />
									</td>
									<td>{product.productTitle}</td>
									<td>{product.productPrice}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<div className="d-flex justify-content-center">
						<Spinner />
					</div>
				)}
			</div>
		</div>
	);
}

export { Crawler };
