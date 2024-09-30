import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import VariablePie from 'highcharts/modules/variable-pie';

HighchartsMore(Highcharts);
VariablePie(Highcharts);

const Blog = () => {
  const options = {
    chart: {
      type: 'variablepie',
    },
    title: {
      text: 'Loan Distribution by Interest and Principal Amount',
      align: 'left',
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false // Disable the Highcharts watermark
    },
    series: [
      {
        minPointSize: 10,
        innerSize: '0%',
        zMin: 0,
        name: 'Loan Distribution',
        borderRadius: 0,
        data: [
          { name: 'Principal', y: 551695, z: 119 },
          { name: 'Interest', y: 505992, z: 92 },
        ],
        colors: ['#1FC593', '#4caefe'],
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
          style: {
            textOutline: 'none',
            color: 'white',
          },
          distance: -90,
          align: 'center',
          verticalAlign: 'middle',
        },
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="blogcontainer">
        <div className="leftblogcontainer">
          <img
            width={'506px'}
            alt="Blog Image"
          />
          
        </div>

        <div className="rightblogcontainer">
          <div className="rightblogcontainerrecent">
            <div>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="rightsidediv">
              <img
                src="https://ambak.com/blog/wp-content/themes/mytheme/images/time.png"
                alt="Time Icon"
              />
            </div>
            
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;