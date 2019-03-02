import * as React from 'react';
import TweenOne from 'rc-tween-one';
import HomeText from './homeText';
import LogoFather from './logoGather';
import './index.scss';

class HomeContent extends React.Component<{}, {}> {
  public render() {
    return (
    <>
      <TweenOne
        animation={{
            delay: 2400,
            duration: 1000,
            ease: 'easeInOutQuint',
            x: '-25%',
        }}
        component={HomeText}
      />
      <LogoFather />
    </>
    )
  }
}

export default HomeContent;
