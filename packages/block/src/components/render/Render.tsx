import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
// import {  Canvas2DApplication, Application } from "../../utils/canvas/application";
// import {parseToken } from "../../utils/doom";
// import { step } from "../../utils/canvas/tools";
// import { TestApplication } from "../../utils/canvas/TestCanvas2DApplication";
import "./Render.css";
// import { TestApplication } from "../../utils/canvas/LineDashAnimationApplication";
import { TestApplication } from "../../utils/canvas/TestVec2Application";
import { Math2D, vec2 } from "../../utils/canvas/math2d";


export default (): React.ReactElement => {
  let app: TestApplication;
  let timer0 = -1;
  useEffect(() => {
    // parseToken();
    // step(0);
    const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
    // app = new Canvas2DApplication(canvas);
    // app.update(0, 0);
    // app.render();
    app = new TestApplication(canvas);
    // app . drawRect (10 , 10 , app . canvas . width - 20 , app . canvas . height - 20 ) ;
    // app . testMyRenderStateStack();
    // app.fillLinearRect(10,10,100,100);
    // app.fillRadialRect(10,10,100,200) ;
    // app.fillPatternRect ( 10 , 10 ,500 , 500 , "repeat-x");
    //app.printTextStates();
    // app.testCanvas2DTextLayout();
    // app.testMyTextLayout();
    // app.loadAndDrawImage("./data/test.jpg");
    // app.drawColorCanvas();
    //app.printShadowStates();
    // app.testChangePartCanvasImageData();
    // app.printAllRenderStates();
    // app.render();

    app . strokeGrid ( ) ; // 绘制背景网格
    app . drawCanvasCoordCenter ( ) ; //绘制中心坐标系和原点
    app . draw4Quadrant ( ) ; // 绘制四个象限文字
    // app.doTransform0();
    // app.doTransform(20, true);
    // app.testFillLocalRectWithTitle();
    // app.doLocalTransform();
    // app.testFillLocalRectWithTitleUV();
    app.drawTriangle(
      100 - 50,
      100,
      400 - 50,
      100,
      150 - 50,
      250,
      200 - 50,
      150,
      true
    );
    const isInTriangle=Math2D.isPointInTriangle(
      vec2.create(500 - 50, 250),
      vec2.create(100 - 50,
      100),
      vec2.create(400 - 50,
      100),
      vec2.create(150 - 50,
      250,),
    );
    console.log("isInTriangle", isInTriangle)
  });
  const timerCallback = (id: number, data: string): void => {
    console.log(`id: ${id}, data: ${data}`);
  }
  const onStartBtnClick = () => {
    console.log("start");
    timer0 = app.addTimer(timerCallback,
      3, true, 'callback data');
    app.start();
    // app.rotationAndRevolutionSimulation();
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
        <canvas id='canvas' width='500' height='500'>
        </canvas>
      </Row>
    </>
  );
};
