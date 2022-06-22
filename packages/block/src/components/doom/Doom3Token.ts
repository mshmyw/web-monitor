import { IDoom3Token, ETokenType } from "./typings";

export class Doom3Token implements IDoom3Token {
  private _type: ETokenType;
  private _val: number;
  private _charArr: string[] = [];

  constructor() {
    this._charArr.length = 0;
    this._type = ETokenType.NONE;
    this._val = 0.0;
  }

  reset(): void {
    this._charArr.length = 0;
    this._type = ETokenType.NONE;
    this._val = 0.0;
  }

  get type(): ETokenType {
    return this._type;
  }

  getString(): string {
    return this._charArr.join("");
  }
  getFloat(): number {
      return this._val;
  }

  getInt(): number {
    return parseInt(this._val.toString(), 10);
  }

  isString(str: string): boolean {
      let count: number = this._charArr.length;
      if(str.length !== count) {
        return false;
      }
      for(let i = 0; i < count; i++) {
        if(this._charArr[i] !== str[i]) {
          return false;
        }
      }
      return true;
  }

  addChar(c: string): void {
    this._charArr.push(c);
  }

  setVal(num: number): void{
    this._val = num;
    this._type = ETokenType.NUMBER;
  }

  setType(type: ETokenType):void {
    this._type = type;
  }
}