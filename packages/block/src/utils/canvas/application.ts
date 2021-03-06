import { vec2 } from './math2d';

export type TimerCallback = (id: number, data: any) => void;
class Timer {
  public id: number = -1;
  public enabled: boolean = false;

  public callback: TimerCallback;
  public callbackData: any = undefined;

  public countdown: number = 0;
  public timeout: number = 0;
  public onlyOnce: boolean = false;

  constructor(callback: TimerCallback) {
    this.callback = callback;
  }
}

export class Application implements EventListenerObject {
  public timers: Timer[] = [];

  private _timeId: number = -1;

  private _fps: number = 0;

  _start: boolean = false;
  _requestId = -1;
  _lastTime = -1;
  _startTime = -1;
  protected _isMouseDown: boolean;
  public canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.addEventListener('mousedown', this, false);
    this.canvas.addEventListener('mouseup', this, false);
    this.canvas.addEventListener('mousemove', this, false);
    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);
    this._isMouseDown = false;
  }

  start() {
    if (!this._start) {
      this._start = true;
      this.reset();

      const step = (elapsedMsec: number) => this.step(elapsedMsec);
      requestAnimationFrame(step);
    }
  }
  stop() {
    if (this._start) {
      cancelAnimationFrame(this._requestId);
      this._start = false;
      this.reset();
    }
  }
  reset() {
    this._requestId = -1;
    this._lastTime = -1;
    this._startTime = -1;
  }
  isRunning() {
    return this._start;
  }

  protected step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;
    let elapsedMsec = timeStamp - this._startTime;
    let intervalSec = timeStamp - this._lastTime;
    if (intervalSec !== 0) {
      this._fps = 1000.0 / intervalSec;
    }
    intervalSec /= 1000.0;
    this._lastTime = timeStamp;
    console.log(`intervalSec ${intervalSec}`);
    this._handleTimers(intervalSec);
    this.update(elapsedMsec, intervalSec);
    this.render();
    this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
      this.step(elapsedMsec);
    });
  }

  update(elapsedMsec: number, intervalSec: number) {}
  render() {}

  handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true;
        this.dispatchMouseDown(
          this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN)
        );
        break;
      case 'mouseup':
        this._isMouseDown = false;
        this.dispatchMouseUp(
          this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP)
        );
        break;
      case 'mousemove':
        this.dispatchMouseMove(
          this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE)
        );
        if (this._isMouseDown) {
          this.dispatchMouseDrag(
            this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG)
          );
        }
        break;
      case 'keypress':
        this.dispatchKeyPress(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS)
        );
        break;
      case 'keydown':
        this.dispatchKeyDown(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN)
        );
        break;
      case 'keyup':
        this.dispatchKeyUp(
          this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP)
        );
        break;
    }
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseUp(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    return;
  }

  _viewportToCanvasCoordinate1(evt: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: DOMRect = this.canvas.getBoundingClientRect();
      if (evt.type === 'mousedown') {
        console.log(' boundingClientRect : ' + JSON.stringify(rect));
        console.log(' clientX : ' + evt.clientX + ' clientY : ' + evt.clientY);
      }
      if (evt.target) {
        let borderLeftWidth: number = 0;
        let borderTopWidth: number = 0;
        let paddingLeft: number = 0;
        let paddingTop: number = 0;
        let decl: CSSStyleDeclaration = window.getComputedStyle(
          evt.target as HTMLElement
        );
        let strNumber: string | null = decl.borderLeftWidth;

        if (strNumber !== null) {
          borderLeftWidth = parseInt(strNumber, 10);
        }

        if (strNumber !== null) {
          borderTopWidth = parseInt(strNumber, 10);
        }

        strNumber = decl.paddingLeft;
        if (strNumber !== null) {
          paddingLeft = parseInt(strNumber, 10);
        }

        strNumber = decl.paddingTop;
        if (strNumber !== null) {
          paddingTop = parseInt(strNumber, 10);
        }

        let x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
        let y: number = evt.clientY - rect.top - borderTopWidth - paddingTop;

        let pos: vec2 = vec2.create(x, y);

        if (evt.type === 'mousedown') {
          console.log(
            ' borderLeftWidth : ' +
              borderLeftWidth +
              ' borderTopWidth : ' +
              borderTopWidth
          );
          console.log(
            ' paddingLeft : ' + paddingLeft + ' paddingTop : ' + paddingTop
          );
          console.log(' ????????????canvasPosition : ' + pos.toString());
        }

        return pos;
      }

      alert('canvas???null');
      throw new Error('canvas???null');
    }

    alert('evt . target???null');
    throw new Error('evt . target???null');
  }
  _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      if (evt) {
        if (evt.type === 'mousedown') {
          console.log('????????????pageX : ' + evt.pageX + ' pageY : ' + evt.pageY);
          console.log(
            '???canvas???offsetLeft : ' +
              this.canvas.offsetLeft +
              ' offsetTop : ' +
              this.canvas.offsetTop
          );
        }

        let x, y; // ??????????????????canvas(????????????dom??????)?????????????????????w3c?????????
        // ??????????????????
        [x, y] = [evt.pageX, evt.pageY];
        const element = this.canvas;
        // ????????????????????????canvas????????????????????????x,y????????????canvas??????????????????
        x = x - element.offsetLeft;
        y = y - element.offsetTop;
        let pos: vec2 = vec2.create(x, y);

        if (evt.type === 'mousedown') {
          console.log(' ????????????canvasPosition : ' + pos.toString());
        }

        return pos;
      }

      alert('canvas???null');
      throw new Error('canvas???null');
    }

    alert('evt . target???null');
    throw new Error('evt . target???null');
  }

  _toCanvasMouseEvent(evt: Event, type: EInputEventType): CanvasMouseEvent {
    let event: MouseEvent = evt as MouseEvent;
    let mousePosition: vec2 = this._viewportToCanvasCoordinate(event);
    let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
      type,
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
    return canvasMouseEvent;
  }

  private _toCanvasKeyBoardEvent(
    evt: Event,
    type: EInputEventType
  ): CanvasKeyBoardEvent {
    let event: KeyboardEvent = evt as KeyboardEvent;
    let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(
      type,
      event.key,
      event.keyCode,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
    return canvasKeyboardEvent;
  }

  public removeTimer(id: number): boolean {
    let found: boolean = false;
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].id === id) {
        let timer: Timer = this.timers[i];
        timer.enabled = false;
        found = true;
        break;
      }
    }
    return found;
  }

  public addTimer(
    callback: TimerCallback,
    timeout: number = 1.0,
    onlyOnce: boolean = false,
    data: any = undefined
  ): number {
    let timer: Timer;
    let found: boolean = false;
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i];
      if (timer.enabled === false) {
        timer.callback = callback;
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true;
        timer.onlyOnce = onlyOnce;
        return timer.id;
      }
    }

    timer = new Timer(callback);
    timer.callbackData = data;
    timer.timeout = timeout;
    timer.countdown = timeout;
    timer.enabled = true;
    timer.id = ++this._timeId;
    timer.onlyOnce = onlyOnce;

    this.timers.push(timer);
    return timer.id;
  }

  private _handleTimers(intervalSec: number): void {
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i];
      if (timer.enabled === false) {
        continue;
      }
      timer.countdown -= intervalSec;
      console.log("countdown ", timer.countdown, intervalSec);
      if (timer.countdown < 0.0) {
        timer.callback(timer.id, timer.callbackData);
        if (timer.onlyOnce === false) {
          timer.countdown = timer.timeout;
        } else {
          this.removeTimer(timer.id);
        }
      }
    }
  }
}

export enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS,
}

export class CanvasInputEvent {
  altKey: boolean = false;
  ctrlKey: boolean = false;
  shiftKey: boolean = false;
  type: EInputEventType;

  constructor(
    type = EInputEventType.MOUSEEVENT,
    altKey: boolean = false,
    ctrlKey = false,
    shiftKey = false,
  ) {
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
    this.type = type;
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  public button: number;
  public canvasPosition: vec2;

  public localPosition: vec2;
  public hasLocalPosition: boolean;

  public constructor(
    type: EInputEventType,
    canvasPos: vec2,
    button: number,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false
  ) {
    super(type, altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos;
    this.button = button;
    this.hasLocalPosition = false;
    this.localPosition = vec2.create();
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  public key: string;
  public keyCode: number;
  public repeat: boolean;

  public constructor(
    type: EInputEventType,
    key: string,
    keyCode: number,
    repeat: boolean,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false
  ) {
    super(type, altKey, ctrlKey, shiftKey);
    this.key = key;
    this.keyCode = keyCode;
    this.repeat = repeat;
  }
}


export class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null;
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.context2D = this.canvas.getContext('2d');
  }
}
