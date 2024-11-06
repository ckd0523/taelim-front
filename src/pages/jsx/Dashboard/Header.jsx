// import api from '@/common/api/authAxios';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { Row, Col, Table, Card } from 'react-bootstrap';

// const URL = import.meta.env.VITE_BASIC_URL;

// const Header = () => {

//   const [data, setData] = useState();

//   useEffect(() => {
//     const getData = async () => {
//       const response = await api.get(`${URL}/chart/1`);
//       console.log("헤더1 : " + JSON.stringify(response.data));
//       setData(response.data);
//     }

//     getData();

//   }, []);

//   return (
//     <Card>
//       <Row className="p-3">
//         <Col lg={6}>
//           <h4 className="header-title" style={{ color: 'red' }}>자산 정보</h4>
//           <Table className="border-black">
//             <thead className="table-dark">
//               <tr>
//                 <th>유지보수</th>
//                 <th>자산 조사</th>
//                 <th>총 자산 수</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{data ? data.repairAmount : '-'}건</td>
//                 <td>{data ? data.assetSurveyAmount : '-'}건</td>
//                 <td>{data ? data.totalAssetAmount : '-'}개</td>
//               </tr>
//             </tbody>
//           </Table>
//         </Col>

//         <Col lg={6}>
//           <h4 className="header-title" style={{ color: 'red' }}>자산총액</h4>
//           <Table className="border-black">
//             <thead className="table-dark">
//               <tr>
//                 <th>총액</th>
//                 <th>소유</th>
//                 <th>임대</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{data ? data.ownCost + data.leasedCost : '-'}원</td>
//                 <td>{data ? data.ownCost : '-'}원</td>
//                 <td>{data ? data.leasedCost : '-'}원</td>
//               </tr>
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//     </Card >
//   );
// };

// export default Header;