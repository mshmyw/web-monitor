import { IEnumerator } from './IEnumerator';

export enum ETokenType {
  NONE, // 0 number default use number type start by 0
  STRING, // 1 string
  NUMBER, // 2 number
}

// 标记
export interface IDoom3Token {
  reset(): void;
  isString(str: string): boolean;
  readonly type: ETokenType;

  getString(): string;
  getFloat(): number;
  getInt(): number;
}

// 分词器，标记处理器
export interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
  setSource(source: string): void;
  // reset(): void;
  // getNextToken(token: IDoom3Token): boolean;
}
