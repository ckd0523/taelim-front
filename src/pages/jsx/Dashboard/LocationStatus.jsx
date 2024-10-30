import { Card, Col, Row } from "react-bootstrap";
import styled, { css } from "styled-components";
import bluePrint from '@/assets/images/BluePrint3.png';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useState } from "react";
import Select from 'react-select';
import ChartLocation from './assetSurveyLocation';
import { useEffect } from "react";

// Chart.js에 필요한 요소 및 플러그인 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BlueprintContainer = styled.div`
  position: relative;
  width: 100%;  // Card의 가로 크기에 맞춤
  height: 100%; // Card의 세로 크기에 맞춤
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(30, 1fr); /* 가로 30칸 */
  grid-template-rows: repeat(30, 1fr); /* 세로 30칸 */
`;

const GridCell = styled.div`
   border: 1px solid transparent; /* 기본 테두리는 투명하게 */
  /* border: 1px solid rgba(215, 212, 208, 1);  기본 테두리는 회색 */
  cursor: pointer;

  ${({ mergeColumns, mergeRows, isMerged }) =>
    mergeColumns && mergeRows && isMerged && css`
      grid-column: ${mergeColumns};
      grid-row: ${mergeRows};
      border: 3px solid rgba(255, 0, 0, 0.8); /* 병합된 셀 테두리 색상 */
    `}
`;

const LocationStatus = ({ setLocation }) => {
  const handleGridClick = (gridId) => {
    // if (gridId === "1-1" || gridId === "1-2" || gridId === "1-3") {
    //   setLocation("야임마");
    //   alert(`Clicked grid ${gridId}`);
    // }

    if (gridId === "1-1") {
      setLocation("본관");
    } else if (gridId === "1-2") {
      setLocation("MDCG");
    } else if (gridId === "1-3") {
      setLocation("공장동");
    }

  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title">위치별 현황</h4>
        <BlueprintContainer>
          <img src={bluePrint} className="img-fluid" alt="Blue Print" />
          <GridOverlay>
            {Array.from({ length: 30 }).map((_, rowIndex) =>
              Array.from({ length: 30 }).map((_, colIndex) => {
                const gridId = `${rowIndex}-${colIndex}`;

                // 병합 영역 설정
                let mergeColumns;
                let mergeRows;
                let isMerged = false;
                if (gridId === "1-1") { // 첫 번째 병합 영역
                  mergeColumns = "1 / span 4";
                  mergeRows = "19 / span 11";
                  isMerged = true;
                } else if (gridId === "1-2") { // 두 번째 병합 영역
                  mergeColumns = "6 / span 4";
                  mergeRows = "7 / span 12";
                  isMerged = true;
                } else if (gridId === "1-3") { // 세 번째 병합 영역
                  mergeColumns = "13 / span 12";
                  mergeRows = "6 / span 20";
                  isMerged = true;
                }

                return (
                  <GridCell
                    key={gridId}
                    onClick={() => handleGridClick(gridId)}
                    mergeColumns={mergeColumns}
                    mergeRows={mergeRows}
                    isMerged={isMerged} // 병합된 셀에만 테두리 표시
                  />
                );
              })
            )}
          </GridOverlay>
        </BlueprintContainer>
      </Card.Body>
    </Card>
  );
};

const SelectedLocation = ({ location }) => {
  const data1 = [
    199, 140, 59, 97, 83, 62, 175, 240, 216, 113, 257, 180, 70,
  ];

  const data2 = [
    128, 132, 269, 114, 174, 76, 249, 290, 287, 187, 230, 143, 161,
  ]

  const data3 = [
    206, 81, 107, 263, 180, 55, 256, 76, 297, 211, 290, 158, 65,
  ]

  const [axis, setAxis] = useState('x');
  const [chartData, setData] = useState(data1);

  const handleAxis = (selectedValue) => {
    setAxis(selectedValue); // 선택된 값을 상태에 저장
  };

  const handleLocation = (selectedValue) => {
    console.log(selectedValue);
    // 빈 배열 생성
    const numbers = [];

    // 13개의 랜덤 숫자 생성
    while (numbers.length < 13) {
      // Math.random()은 0~1 사이의 난수를 생성
      // Math.floor로 소수점 아래를 버림
      const randomNumber = Math.floor(Math.random() * (300 - 50 + 1)) + 50;

      // 중복되지 않는 숫자만 배열에 추가
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    setData(numbers);
  };

  useEffect(() => {
    //console.log("이게 되나");
    if (location == '공장동') {
      setData(data1);
    } else if (location == '본관') {
      setData(data2);
    } else {
      setData(data3);
    }
  }, [location]);

  const data = {
    labels: [
      '정보보호시스템', '응용프로그램', '소프트웨어', '전자정보', '문서',
      '특허 및 상표', 'IT 장비 - 시스템', 'IT 장비 – 네트워크', '단말기',
      '가구', '기기', '차량', '기타',
    ],
    datasets: [{
      //label: '자산 수량',
      data: chartData,
      backgroundColor: [
        'rgba(42, 140, 201, 1)', 'rgba(42, 140, 201, 1)', 'rgba(42, 140, 201, 1)', 'rgba(42, 140, 201, 1)', 'rgba(42, 140, 201, 0.8)',
        'rgba(42, 140, 201, 0.8)', 'rgba(42, 140, 201, 0.8)', 'rgba(42, 140, 201, 0.8)', 'rgba(42, 140, 201, 0.7)', 'rgba(42, 140, 201, 0.7)',
        'rgba(42, 140, 201, 0.7)', 'rgba(42, 140, 201, 0.7)', 'rgba(42, 140, 201, 0.6)',
      ],
      borderColor: '#fff',
      borderWidth: 1,
    }],
  };

  const options = {
    indexAxis: axis, // 가로 바 차트로 설정 (세로 차트로 하려면 'y' 제거)
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: axis != 'x',
          text: "개수",
        },
        grid: {
          display: false, // x축 그리드 라인 비활성화
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
        title: {
          display: axis != 'y',
          text: "개수",
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = tooltipItem.raw; // 각 데이터 값
            const percentage = (value / total * 100).toFixed(2); // 퍼센트 계산
            return `${value}개 (${percentage}%)`; // 툴팁에 표시할 내용
          },
        },
      },
    },
  };

  return (
    <Card style={{ width: '100%', height: '95%' }}>
      <Card.Body>

        <Col sm={12} className="d-flex justify-content-between">
          <h4 className="header-title" style={{ display: "inline" }}>{location} 자산 개수 </h4>
          <Row>
            <Col>
              <Select
                options={[
                  { value: 'x', label: '세로' },
                  { value: 'y', label: '가로' },
                ]}
                defaultValue={{ value: 'x', label: '세로' }} // 기본 값 설정
                onChange={(selectedOption) => handleAxis(selectedOption.value)}
              />
            </Col>

            {location === '본관' && (
              <Col>
                <Select
                  defaultValue={{ value: 'MAIN_1F', label: '본관 1층' }}
                  options={ChartLocation}
                  onChange={(selectedOption) => handleLocation(selectedOption.value)}
                />
              </Col>
            )}

          </Row>
        </Col>



        <div style={{ width: "100%", height: "90%" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card >
  );
};

export { LocationStatus, SelectedLocation };
