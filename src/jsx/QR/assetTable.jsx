import React, { useEffect, useRef, useState } from "react";
import DataTable from "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import QRCodeDisplay from "./QRCodeDisplay";
import ReactDOM from "react-dom";

const AssetTable = () => {
  const tableRef = useRef();
  const [selectedAssets, setSelectedAssets] = useState([]);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      ajax: {
        type: "GET",
        url: "http://localhost:8080/assets/approved-not-disposed",
        dataSrc: "",
      },
      columns: [
        { data: "assetCode", title: "Asset Code" },
        { data: "assetName", title: "Asset Name" },
        {
          data: null,
          title: "QR Code",
          orderable: false,
          render: function (data, type, row) {
            return `<div id="qrcode-${row.assetCode}"></div>`;
          },
        },
        {
          data: null,
          title: "폐기",
          orderable: false,
          render: function (data, type, row) {
            return `<button id="dispose-${row.assetCode}" class="dispose-button">Dispose</button>`;
          },
        },
      ],
      createdRow: function (row, data, dataIndex) {
        ReactDOM.render(
          <QRCodeDisplay
            assetCode={data.assetCode}
            assetName={data.assetName}
          />,
          $(row).find(`#qrcode-${data.assetCode}`)[0]
        );

        $(row)
          .find(`#dispose-${data.assetCode}`)
          .on("click", function () {
            disposeAsset(data.assetCode);
          });
      },
    });

    const disposeAsset = (assetCode) => {
      $.ajax({
        type: "POST",
        url: `http://localhost:8080/dispose/${assetCode}`,
        success: function () {
          alert(`Asset ${assetCode} has been successfully disposed.`);
          table.ajax.reload();
        },
        error: function (xhr, status, error) {
          alert(`Failed to dispose asset ${assetCode}: ${error}`);
        },
      });
    };

    return () => {
      table.destroy();
    };
  }, []);

  // Handle fetching QR codes and displaying in modal
  const fetchQRCodeBatch = async () => {
    const selectedRows = $(tableRef.current)
      .DataTable()
      .rows(".selected")
      .data();
    const assetCodes = selectedRows.map((row) => row.assetCode).toArray();

    if (assetCodes.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/generateQRCodeBatch",
        assetCodes,
        { responseType: "blob" }
      );
      const qrCodeUrl = URL.createObjectURL(response.data);
      setQrCodeUrl(qrCodeUrl);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error generating QR codes:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchQRCodeBatch}>QR 출력</button>
      <table ref={tableRef} style={{ width: "100%" }}></table>
    </div>
  );
};

export default AssetTable;
