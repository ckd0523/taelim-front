import { useState } from 'react';
import api from '@/common/api/authAxios';
import { Button, Table } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { Input } from 'react-bootstrap-typeahead';
const urlConfig = import.meta.env.VITE_BASIC_URL;
function Crawler() {
	const [products, setProducts] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchProducts = async () => {
		if (!keyword) {
			setProducts([]);
			setLoading(true);
			return;
		}
		try {
			setLoading(true);
			const resposne = await api.get(`${urlConfig}/api/crawl/products?keyword=${keyword}`);
			if (Array.isArray(resposne.data)) {
				console.log(resposne.data);
				setProducts(resposne.data);
				return resposne.data;
			}
		} catch (error) {
			console.log('error fetching data : ', error);
		} finally {
			setLoading(false);
		}
	};

	const handleButton = () => {
		fetchProducts();
	};
	console.log(products);
	return (
		<div>
			<div className="d-flex justify-content-center">
				<h1>Web Search</h1>
			</div>
			<div className="d-flex justify-content-end">
				<Input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="상품을 검색하세요"
				/>
				<Button type="button" onClick={handleButton} variant="dark">
					검색
				</Button>
			</div>
			<div className="d-flex justify-content-center">
				<Table>
					<thead>
						<tr>
							<th>image</th>
							<th>title</th>
							<th>price</th>
						</tr>
					</thead>
					{loading ? (
						<tbody>
							<tr>
								<td colSpan={3}>
									<div className="pt-5 pb-5 d-flex justify-content-center">
										<PropagateLoader color="#3760b3" size={20} />
									</div>
								</td>
							</tr>
						</tbody>
					) : Array.isArray(products) && products.length > 0 ? (
						<tbody>
							{products.map((product, index) => (
								<tr key={index}>
									<td>
										<img src={product.image} />
									</td>
									<td>{product.productTitle}</td>
									<td>{product.productPrice}</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td colSpan={3}>
									<div className="pt-5 pb-5 d-flex justify-content-center">
										<PropagateLoader color="#3760b3" size={20} />
									</div>
								</td>
							</tr>
						</tbody>
					)}
				</Table>
			</div>
		</div>
	);
}

export { Crawler };
