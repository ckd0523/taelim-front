const AssetStatusData = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: false,
    },
    events: {
      click: function (chart, w, e) {
        console.log(chart, w, e);
      },
    },
  },
  colors: [
    '#4E79A7', // 책상 (차분한 블루)
    '#F28E2B', // 의자 (따뜻한 오렌지)
    '#76B7B2', // 노트북 (시원한 청록)
    '#E15759', // 컴퓨터 (부드러운 레드)
    '#59A14F', // 복합기 (프레시 그린)
    '#acaba6', // 기타 (밝은 옐로우)
  ],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      data: [21, 22, 10, 28, 16, 30],
    },
  ],
  xaxis: {
    categories: ['책상', '의자', '노트북', '컴퓨터', '복합기', '기타'],
    labels: {
      style: {
        colors: [
          '#4E79A7', // 책상 (차분한 블루)
          '#F28E2B', // 의자 (따뜻한 오렌지)
          '#76B7B2', // 노트북 (시원한 청록)
          '#E15759', // 컴퓨터 (부드러운 레드)
          '#59A14F', // 복합기 (프레시 그린)
          '#acaba6', // 기타 (밝은 옐로우),
        ],
        fontSize: '14px',
      },
    },
  },
  yaxis: {
    title: {
      text: '개수',
    },
  },
  legend: {
    offsetY: 7,
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

const OperationData = {
  chart: {
    height: 300,
    type: 'donut',
  },
  series: [75, 25],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    floating: false,
    fontSize: '14px',
    offsetX: 0,
    offsetY: 7,
  },
  labels: ['가동', '비가동'],
  colors: ['#5a85dc', '#cc5f5f'],
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 300,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
};

const OperationData2 = {
  chart: {
    height: 320,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  series: [
    {
      data: [75, 20, 5, 0],
    },
  ],
  colors: ['#5a85dc'],
  xaxis: {
    categories: ['사용중', '부서짐', '유지 보수 중', '기타'],
  },
  // states: {
  //     // hover: {
  //     //     // filter: 'none'
  //     // }
  // },
  grid: {
    borderColor: '#f1f3fa',
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 240,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
};

const DepartmentData = {
  annotations: {
    points: [
      {
        x: 'Bananas',
        seriesIndex: 0,
        label: {
          borderColor: '#3e60d5',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#3e60d5',
          },
          text: 'Bananas are good',
        },
      },
    ],
  },
  chart: {
    height: 380,
    type: 'bar',
    stacked: 'true',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      // endingShape: 'rounded'
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
  },
  colors: [
    '#4E79A7', // 책상 (차분한 블루)
    '#F28E2B', // 의자 (따뜻한 오렌지)
    '#76B7B2', // 노트북 (시원한 청록)
    '#E15759', // 컴퓨터 (부드러운 레드)
    '#59A14F', // 복합기 (프레시 그린)
    '#acaba6', // 기타 (밝은 옐로우),
  ],
  series: [
    {
      name: '책상',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: '의자',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: '노트북',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: '컴퓨터',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: '복합기',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: '기타',
      data: [44, 55, 41, 67, 22, 43, 21],
    },
  ],
  grid: {
    borderColor: '#f1f3fa',
    padding: {
      top: 0,
      right: -2,
      bottom: -35,
      left: 10,
    },
  },
  xaxis: {
    categories: [
      'IT부',
      '관리부',
      '영업부',
      '마케팅부',
      '생산부',
      '운영부',
      '인사부',
    ],
  },
  yaxis: {
    title: {
      text: '개수',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100],
    },
  },
}

export { AssetStatusData, OperationData, OperationData2, DepartmentData };