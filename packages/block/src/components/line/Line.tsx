import React, { useEffect } from "react";
import { Row, Col } from "antd";

import "./Line.css";
import { Chart } from "@antv/g2";
import { mockData } from "./mockData";

export default (): React.ReactElement => {
  const config = {
    data: mockData,
    scale: {
      year: {
        range: [0, 1],
      },
      value: {
        min: 0,
        nice: true,
      },
    },
    xField: "year",
    yField: "value",
  };
  useEffect(() => {
    const chart = new Chart({
      container: "container",
      width: 600,
      height: 300,
    });

    chart.data(config.data);
    chart.scale(config.scale);
    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });

    chart
      .line()
      .position(`${config.xField}*${config.yField}`)
      .label(config.yField);
    chart.point().position(`${config.xField}*${config.yField}`);

    chart.render();
  });

  return (
    <>
      <Row>
        <Col span={8}>col-8</Col>
        chart container 
        <div id="container"></div>
        <Col span={8}>col-8</Col>
      </Row>
    </>
  );
};
