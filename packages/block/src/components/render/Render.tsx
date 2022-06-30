import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { Canvas2DApplication, Application } from "../../utils/canvas/application";
// import {parseToken } from "../../utils/doom";
// import { step } from "../../utils/canvas/tools";
import "./Render.css";
export default (): React.ReactElement => {
  let app: Application;
  let timer0 = -1;
  useEffect(() => {
    // parseToken();
    // step(0);
    const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
    console.log("canvas ", canvas);
    app = new Canvas2DApplication(canvas);
    app.update(0, 0);
    app.render();
  });
  const timerCallback = (id: number, data: string): void => {
    console.log(`id: ${id}, data: ${data}`);
  }
  const onStartBtnClick = () => {
    console.log("start");
    timer0 = app.addTimer(timerCallback,
      3, true, 'callback data');
    app.start();
  };
  const onStopBtnClick = () => {
    console.log("stop");
    app.stop();
    app.removeTimer(timer0);
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Button type="primary" onClick={onStartBtnClick}>start</Button>
        </Col>
        <Col span={8}>
          <Button type="default" onClick={onStopBtnClick}>stop</Button>
        </Col>
      </Row>
      <Row>
        <canvas id='canvas' width='400' height='400'>
        </canvas>
      </Row>
    </>
  );
};
