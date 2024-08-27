import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

export function DataTable() {
  const tableRef = useRef();

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: [
        [
          "ㅁ",
          "1",
          "TISAX",
          "TLIA-CMP-DPC-0001",
          "P340",
          "단말기",
          "3D LEAN",
          "본관1층",
          "BLACK BOX",
          "사용자",
          "소유자",
          "휴지통",
        ],
        [
          "ㅁ",
          "2",
          "COMMON",
          "ASSET-CMP-DPC-0001",
          "P340",
          "단말기",
          "3D LEAN",
          "본관1층",
          "BLACK BOX",
          "사용자",
          "소유자",
          "휴지통",
        ],
        // ...
      ],
      columns: [
        { title: "SelectBox" },
        { title: "번호" },
        { title: "자산기준" },
        { title: "자산코드" },
        { title: "자산명" },
        { title: "자산분류" },
        { title: "목적/기능" },
        { title: "자산위치" },
        { title: "부서" },
        { title: "사용자" },
        { title: "소유자" },
        { title: "Action" },
      ],
      responsive: true, // 반응형 켜기
      // options
    });

    // 언마운트 시 destroy
    return () => {
      table.destroy();
    };
  }, []);

  return <table ref={tableRef} style={{ width: "100%" }}></table>;
}

export default DataTable;
