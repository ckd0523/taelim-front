const noData = [
	{
		afterDraw: function (chart) {
			//console.log(chart);
			if (chart.data.datasets[0].data.length < 1) {
				let ctx = chart.ctx;
				let width = chart.width;
				let height = chart.height;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = '30px Arial';
				ctx.fillText('No data to display', width / 2, height / 2);
				ctx.restore();
			}
		},
	},
];

export default noData;
