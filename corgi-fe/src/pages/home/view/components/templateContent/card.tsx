import * as React from 'react';
import {  } from 'antd';


interface Istates {
}

interface Iprops {
  data: {
    [propName: string]: any;
  }
}


class Card extends React.PureComponent<Iprops, Istates> {

  public readonly state: Readonly<Istates> = {
  }

  public handleClick = (e: React.MouseEvent):void => {
    const { data } = this.props;
    const tempwindow = window.open('_blank'); // 先打开页面
    if (tempwindow) {
      tempwindow.location.href = `/editor.html?_id=${data._id}`;
    }
  }

  public render() {
    const { data } = this.props;
    return (
      <div className="card-box-wrapper" onClick={this.handleClick}>
        <div className="card-img">
          <img src={data.coverUrl} />
        </div>
        <div className="card-content">
          <div className="card-name">
            {data.templateName}
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
