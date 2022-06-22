import React, { useEffect } from "react";
import { Row, Col } from "antd";
import {parseToken } from "./const";

export default (): React.ReactElement => {
  useEffect(() => {
    parseToken();
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
