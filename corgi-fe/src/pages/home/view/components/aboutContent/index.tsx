import * as React from 'react';
import './index.scss';

interface Istates {
}

interface Iprops {
}


class AboutContent extends React.Component<Iprops, Istates> {

  public readonly state: Readonly<Istates> = {
  }

  public render() {
    return (
      <div className="about-content-wrapper">
        <p>作者: <strong>刘志翾</strong></p>
        <p>邮箱: <strong>liuxuan4567@qq.com</strong></p>
      </div>
    )
  }
}

export default AboutContent;
