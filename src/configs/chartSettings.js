const chartSettings = (chart, chartType) => {
    switch(chartType){
      case 'line':
        return {
          chart: {
            type: 'line',
          },
          title: {
            text: null,
          },
          xAxis: {
            categories: chart.rows.map((row) => row[0]),
            title: {
              text:chart.columns[0]
            },
          },
          yAxis:{
            title: {
              text: chart.columns[1]
            }
          },
          series: [{
            name: chart.columns[1],
            data: chart.rows.map((row) => parseFloat(row[1]))
          }]
        }
      case 'pie':
        return {
          chart: {
            type: 'pie',
          },
          title: {
            text: null,
          },
          categories:chart.rows.map((row) => row[0]),
          series: [
            {
              name:chart.chartName,
              data: chart.rows.map((row) => ({
                name: row[0],
                y: parseFloat(row[1]),
              })),
            },
          ],
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
          },
        }
        
  };
}

export { chartSettings }