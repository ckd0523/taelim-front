import React, { useEffect, useRef } from 'react';
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import QRCodeDisplay from './QRCodeDisplay';
import ReactDOM from 'react-dom';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetTable = () => {
	// useRef 훅을 사용하여 테이블 요소를 참조
	const tableRef = useRef();

	useEffect(() => {
		// DataTable 초기화
		const table = $(tableRef.current).DataTable({
			ajax: {
				type: 'GET',
				url: `${urlConfig}/assets/approved-not-disposed`, // Ensure the URL is correct
				dataSrc: '', // Assuming the data is an array at the root of the response
			},
			columns: [
				{ data: 'assetCode', title: 'Asset Code' },
				{ data: 'assetName', title: 'Asset Name' },
				{
					data: null,
					title: 'QR Code',
					orderable: false,
					render: function (data, type, row) {
						// Return a placeholder div for the QR code
						return `<div id="qrcode-${row.assetCode}"></div>`;
					},
				},
				{
					data: null,
					title: '폐기',
					orderable: false,
					render: function (data, type, row) {
						// Return a button for the "Dispose" action
						return `<button id="dispose-${row.assetCode}" class="dispose-button">Dispose</button>`;
					},
				},
			],
			createdRow: function (row, data, dataIndex) {
				// Render the QRCodeDisplay component into the placeholder div
				ReactDOM.render(
					<QRCodeDisplay
						assetCode={data.assetCode} // Use the assetCode from the fetched data
						assetName={data.assetName} // Use the assetName from the fetched data
					/>,
					$(row).find(`#qrcode-${data.assetCode}`)[0] // Find the placeholder div by its ID
				);

				// Attach a click event handler to the "Dispose" button
				$(row)
					.find(`#dispose-${data.assetCode}`)
					.on('click', function () {
						// Handle the disposal logic
						disposeAsset(data.assetCode);
					});
			},
		});

		// Function to handle disposal
		const disposeAsset = (assetCode) => {
			$.ajax({
				type: 'POST',
				url: `${urlConfig}/dispose/${assetCode}`,
				success: function () {
					alert(`Asset ${assetCode} has been successfully disposed.`);
					// Optionally, you can refresh the table data
					table.ajax.reload();
				},
				error: function (xhr, status, error) {
					alert(`Failed to dispose asset ${assetCode}: ${error}`);
				},
			});
		};

		// 컴포넌트 언마운트 시 DataTable 파괴
		return () => {
			table.destroy();
		};
	}, []);

	return (
		<div>
			{/* 테이블 요소에 참조를 연결 */}
			<table ref={tableRef} style={{ width: '100%' }}></table>
		</div>
	);
};

export default AssetTable;
