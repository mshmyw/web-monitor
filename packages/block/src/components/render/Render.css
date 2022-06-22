import { Doom3Factory } from './Doom3Tokenizer';
import { IDoom3Tokenizer, ETokenType } from './typings';

export const str: string = ` //这是开单引号，不是单引号
numMeshes  5
/*
* joints关键词定义了骨骼动画的bindPose
*/
joints {
	"origin"	-1  ( 0 0 0 )  ( -0.5  -0.5  -0.5 )
	"Body"	0  ( -12.1038131714  0  79.004776001 )  ( -0.5 -0.5 -0.5 )	// origin
}
`;

export const parseToken = () => {
  //从Doom3Factory工厂创建IDoom3Token和IDoom3Tokenizer接口
  let tokenizer: IDoom3Tokenizer = Doom3Factory.createDoom3Tokenizer();
  //设置IDoom3Tokenzier要解析的数据源
  tokenizer.setSource(str);
while (tokenizer.moveNext()) {
  //如果当前的token是数字类型
  if (tokenizer?.current?.type === ETokenType.NUMBER) {
    console.log('NUMBER = ' + tokenizer.current.getFloat()); //输出该数字的浮点值
  } else if (tokenizer?.current?.isString('joints')) {
    //如果当前token是字符串类型，并且其值为joints，则输出
    console.log('开始解析joints数据');
  } else {
    //否则获取当前token的字符串值
    console.log('STRING = ' + tokenizer?.current?.getString());
  }
}

};
