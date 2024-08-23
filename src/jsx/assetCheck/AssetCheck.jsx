import DataTable from "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useEffect, useRef } from "react";
import { GoTrash } from "react-icons/go";
import { renderToString } from "react-dom/server";
const AssetCheck = () => {
  const tableRef = useRef();
  const trashIcon = renderToString(<GoTrash />);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: [
        [
          "",
          "1",
          "TISAX",
          "TLIA-CMP-DPC-0001",
          "P340",
          "단말기",
          "3D LEAN",
          "본관 1층",
          "BLACK BOX",
          "사용자",
          "소유자",
          trashIcon,
        ],
      ],
      columns: [
        { title: " " },
        { title: "번호" },
        { title: "자산기준" },
        { title: "자산코드." },
        { title: "자산명" },
        { title: "자산분류" },
        { title: "목적/기능" },
        { title: "자산위치" },
        { title: "부서" },
        { title: "사용자" },
        { title: "소유자" },
        { title: trashIcon, sorting: false },
      ],
    });
    return () => {
      table.destroy();
    };
  }, []);
  return (
    <div>
      <table ref={tableRef} style={{ width: "100%" }}></table>
    </div>
  );
};

export default AssetCheck;
