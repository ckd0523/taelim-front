import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import QRCodeDisplay from "./QRCodeDisplay";
import ReactDOM from "react-dom";

const AssetTable = () => {
  // useRef 훅을 사용하여 테이블 요소를 참조
  const tableRef = useRef();

  useEffect(() => {
    // 샘플 자산 데이터
    const assets = [
      { code: "ASSET123", name: "Asset 1" },
      { code: "ASSET456", name: "Asset 2" },
    ];

    // DataTable 초기화
    const table = $(tableRef.current).DataTable({
      // DataTable에 사용될 데이터 배열
      data: assets.map((asset) => [
        asset.code, // 자산 코드
        asset.name, // 자산 이름
        `<div id="qrcode-${asset.code}"></div>`, // QR 코드를 렌더링할 div
      ]),
      // 테이블의 각 열에 대한 설정
      columns: [
        { title: "Asset Code" }, // 첫 번째 열: 자산 코드
        { title: "Asset Name" }, // 두 번째 열: 자산 이름
        { title: "QR Code", orderable: false }, // 세 번째 열: QR 코드 (정렬 비활성화)
      ],
      // 행이 생성된 후 호출되는 콜백 함수
      createdRow: function (row, data, dataIndex) {
        // ReactDOM.render를 사용하여 QRCodeDisplay 컴포넌트를 동적으로 렌더링
        ReactDOM.render(
          <QRCodeDisplay
            assetCode={assets[dataIndex].code} // 현재 행의 자산 코드
            assetName={assets[dataIndex].name} // 현재 행의 자산 이름
          />,
          $(row).find(`#qrcode-${assets[dataIndex].code}`)[0] // 해당 셀에 컴포넌트 렌더링
        );
      },
    });

    // 컴포넌트 언마운트 시 DataTable 파괴
    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div>
      {/* 테이블 요소에 참조를 연결 */}
      <table ref={tableRef} style={{ width: "100%" }}></table>
    </div>
  );
};

export default AssetTable;
