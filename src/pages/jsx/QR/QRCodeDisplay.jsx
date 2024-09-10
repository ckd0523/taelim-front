import React, { useState } from 'react';
import axios from 'axios';
// import Modal from "react-modal";

// QRCodeDisplay 컴포넌트 정의
const QRCodeDisplay = ({ assetCode, assetName }) => {
	// QR 코드 이미지 URL과 모달 상태를 관리하는 상태 변수
	const [qrCodeUrl, setQrCodeUrl] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);

	/**
	 * QR 코드를 서버에서 가져와서 상태를 업데이트합니다.
	 */
	const fetchQrCode = async () => {
		try {
			// 서버에 QR 코드 요청
			const response = await axios.get('http://133.186.153.78:8080/generateQRCode', {
				params: { assetCode, assetName }, // 요청 파라미터로 자산 코드와 자산 이름 전송
				responseType: 'blob', // 응답 유형을 blob으로 설정
			});

			// 서버에서 받은 blob 데이터를 URL로 변환
			const qrCodeUrl = URL.createObjectURL(response.data);
			setQrCodeUrl(qrCodeUrl); // QR 코드 URL 상태 업데이트
			setModalIsOpen(true); // 모달 열기
		} catch (error) {
			console.error('Error generating QR code:', error);
		}
	};

	/**
	 * 모달을 닫고 QR 코드 URL 상태를 초기화합니다.
	 */
	const closeModal = () => {
		setModalIsOpen(false); // 모달 닫기
		setQrCodeUrl(''); // QR 코드 URL 초기화
	};

	/**
	 * QR 코드를 인쇄하기 위해 새로운 창을 열어 인쇄할 내용을 작성합니다.
	 */
	const printQRCode = () => {
		// 새 브라우저 창 열기
		const printWindow = window.open('', '', 'height=600,width=800');

		// 인쇄할 내용을 HTML로 작성
		const htmlContent = `
      <html>
<head>
    <title>Print QR Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .qr-container {
            border: 5px solid #000;
            padding: 20px;
            display: inline-block;
            text-align: left;
            width: 100%;
            height:120px;
            max-width: 200px; /* 원하는 최대 너비 설정 */
            box-sizing: border-box;
        }
        .qr-container img {
            width: 100%; /* 이미지는 너비에 맞게 조정 */
            height: auto;
        }
        .qr-container .content {
            display: flex; /* Flexbox 레이아웃 적용 */
            align-items: center; /* 아이템을 수직 가운데 정렬 */
            justify-content: space-between; /* 요소 사이의 여백을 균등하게 배치 */

        }
        .info {
            flex: 2; /* info는 전체 너비의 66% */
            margin-right: 20px; /* 요소 간 간격 설정 */
        }
        .QR {
            flex: 1; /* QR은 전체 너비의 33% */
            text-align: center; /* QR 코드 가운데 정렬 */
        }
        .qr-container p {
            margin: 0;
            padding: 3px 0;
            font-size: 5px;
        }
        h4 {
            text-align: center; /* 제목과 설명을 가운데 정렬 */
            margin-bottom: 5px;
            margin-top: 0;
        }
        .de{
            text-align: center;
            font-size: 3px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="qr-container">
        <h4><strong>자산식별표</strong></h2>
        <div class="content">
            <div class="info">
                <p><strong>자산명&nbsp;&nbsp;&nbsp;:</strong> ${assetName}</p>
                <p><strong>자산코드:</strong> ${assetCode}</p>
                <p><strong>관리책임:</strong> 정보보안 관리책임자</p>
            </div>
            <div class="QR">
                <img src="${qrCodeUrl}" alt="QR Code"/>
            </div>
        </div>
        <div class="de">이 자산은 태림산업㈜의 소중한 자산입니다.</div>
    </div>
</body>
</html>
    `;

		printWindow.document.write(htmlContent);
		printWindow.document.close();
		printWindow.focus(); // 새 창에 포커스 설정
		printWindow.print(); // 인쇄 대화 상자 표시
	};

	return (
		<div>
			<button onClick={fetchQrCode}>QR출력</button> {/* QR 코드 생성 버튼 */}
			<Modal
				isOpen={modalIsOpen} // 모달의 열림 상태
				onRequestClose={closeModal} // 모달 닫기 요청 시 호출될 함수
				contentLabel="QR Code Modal" // 모달의 레이블
				ariaHideApp={false} // 접근성 관련 설정
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경 색상
					},
					content: {
						top: '50%', // 모달 상단 위치
						left: '50%', // 모달 좌측 위치
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)', // 모달 가운데 정렬
						padding: '20px', // 모달 패딩
					},
				}}
			>
				<h2>QR Code</h2> {/* 모달 제목 */}
				{qrCodeUrl && (
					<img src={qrCodeUrl} alt="QR Code" style={{ width: '100%' }} /> // QR 코드 이미지 표시
				)}
				<button onClick={printQRCode}>Print QR Code</button> {/* QR 코드 인쇄 버튼 */}
				<button onClick={closeModal}>Close</button> {/* 모달 닫기 버튼 */}
			</Modal>
		</div>
	);
};

export default QRCodeDisplay;
