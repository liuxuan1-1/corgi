import * as React from 'react';
// import { Row, Col } from 'antd';
import './index.scss';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {
}

interface Iprops {
  fontSpecial: {
    [propName: string]: any
  },
  callbackChangeFont: (e: string) => void,
}

class Font extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public handleClickFont = (e: React.MouseEvent<HTMLDivElement>):void => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    // console.log()
    if (target.dataset.key) {
      this.props.callbackChangeFont(target.dataset.key)
    }
  }

  public render() {
    const { fontSpecial = {} } = this.props;
    const { } = this.state;

    const result: React.ReactNodeArray = [];
    for (const prop in fontSpecial) {
      if (fontSpecial[prop]) {
        result.push((
          <div key={prop} className="font" style={{...fontSpecial[prop]}} data-key={prop}>{prop}</div>
        ))
      }
    }
    return (
      <div className="panel-font-wrapper" onClick={this.handleClickFont}>
        {result}
      </div>
    );
  }
}

export default Font;
