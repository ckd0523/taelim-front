import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// QRCodeDisplay 컴포넌트 정의
const QRCodeDisplay = ({ assetCode, assetName }) => {
  // QR 코드 이미지 URL과 모달 상태를 관리하는 상태 변수
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /**
   * QR 코드를 서버에서 가져와서 상태를 업데이트합니다.
   */
  const fetchQrCode = async () => {
    try {
      // 서버에 QR 코드 요청
      const response = await axios.get("http://localhost:8080/generateQRCode", {
        params: { assetCode, assetName }, // 요청 파라미터로 자산 코드와 자산 이름 전송
        responseType: "blob", // 응답 유형을 blob으로 설정
      });

      // 서버에서 받은 blob 데이터를 URL로 변환
      const qrCodeUrl = URL.createObjectURL(response.data);
      setQrCodeUrl(qrCodeUrl); // QR 코드 URL 상태 업데이트
      setModalIsOpen(true); // 모달 열기
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  /**
   * 모달을 닫고 QR 코드 URL 상태를 초기화합니다.
   */
  const closeModal = () => {
    setModalIsOpen(false); // 모달 닫기
    setQrCodeUrl(""); // QR 코드 URL 초기화
  };

  /**
   * QR 코드를 인쇄하기 위해 새로운 창을 열어 인쇄할 내용을 작성합니다.
   */
  const printQRCode = () => {
    // 새 브라우저 창 열기
    const printWindow = window.open("", "", "height=600,width=800");

    // 인쇄할 내용을 HTML로 작성
    printWindow.document.write("<html><head><title>Print QR Code</title>");
    printWindow.document.write("<style>");
    printWindow.document.write(
      "body { font-family: Arial, sans-serif; text-align: center; }"
    );
    printWindow.document.write(
      ".qr-container { border: 1px solid #000; padding: 20px; display: inline-block; }"
    );
    printWindow.document.write(
      ".qr-container img { width: 200px; height: 200px; }"
    );
    printWindow.document.write(".info { margin-top: 20px; font-size: 16px; }");
    printWindow.document.write("</style>");
    printWindow.document.write("</head><body>");

    // QR 코드와 추가 정보를 포함한 HTML 작성
    printWindow.document.write('<div class="qr-container">');
    printWindow.document.write("<p><strong>자산식별표</strong></p>");
    printWindow.document.write('<img src="' + qrCodeUrl + '" alt="QR Code"/>');
    printWindow.document.write('<div class="info">');
    printWindow.document.write(
      "<p><strong>자산명:</strong> " + assetName + "</p>" // 자산명 표시
    );
    printWindow.document.write(
      "<p><strong>자산코드:</strong> " + assetCode + "</p>" // 자산코드 표시
    );
    printWindow.document.write(
      "<p><strong>관리책임 :</strong> 정보보안 관리책임자 </p>" // 관리책임자 정보
    );
    printWindow.document.write(
      "<p>이 자산은 태림산업㈜의 소중한 자산입니다.</p>" // 자산 소속 정보
    );
    printWindow.document.write("</div>");
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");

    // 문서 작성 완료 후 인쇄
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경 색상
          },
          content: {
            top: "50%", // 모달 상단 위치
            left: "50%", // 모달 좌측 위치
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)", // 모달 가운데 정렬
            padding: "20px", // 모달 패딩
          },
        }}
      >
        <h2>QR Code</h2> {/* 모달 제목 */}
        {qrCodeUrl && (
          <img src={qrCodeUrl} alt="QR Code" style={{ width: "100%" }} /> // QR 코드 이미지 표시
        )}
        <button onClick={printQRCode}>Print QR Code</button>{" "}
        {/* QR 코드 인쇄 버튼 */}
        <button onClick={closeModal}>Close</button> {/* 모달 닫기 버튼 */}
      </Modal>
    </div>
  );
};

export default QRCodeDisplay;
