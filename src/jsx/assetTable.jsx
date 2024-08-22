import React from "react";
import DataTable from "react-data-table-component";
import QRCodeDisplay from "./QRCodeDisplay";

const AssetTable = () => {
  const assets = [
    { code: "ASSET123", name: "Asset 1" },
    { code: "ASSET456", name: "Asset 2" },
  ];

  const columns = [
    {
      name: "Asset Code",
      selector: (row) => row.code,
    },
    {
      name: "Asset Name",
      selector: (row) => row.name,
    },
    {
      name: "QR Code",
      cell: (row) => (
        <QRCodeDisplay assetCode={row.code} assetName={row.name} />
      ),
    },
  ];

  return <DataTable title="Asset List" columns={columns} data={assets} />;
};

export default AssetTable;
