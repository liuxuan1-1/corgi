import * as React from 'react';
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';
import { IAnimType, IEaseType } from 'rc-tween-one/typings/AnimObject';
import 'rc-texty/assets/index.css';
import './index.scss';

const WIDTH_HALF: number = 360 / 2;

class HomeContent extends React.Component<{}, {}> {
  public geInterval = (e: {
    key: string;
    type: string;
    index: number;
  }) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 3) * 150;
    }
  }
  public getEnter = (e: any) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 3) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  }

  public getSplit = (e: string): any[] => {
    const t = e.split(' ');
    const c: React.ReactNode[] = [];
    t.forEach((str, i) => {
      c.push((
        <span key={`${str}-${i}`}>
          {str}
        </span>
      ));
      if (i < t.length - 1) {
        c.push((
          <span key={` -${i}`} />
        ));
      }
    });
    return c;
  }

  public render() {

    return (
      <div className="combined-wrapper">
        <div className="combined">
            <div className="combined-shape">
              <div className="shape-left">
                <TweenOne
                  animation={[
                  { x: WIDTH_HALF, type: 'from' as IAnimType, ease: 'easeInOutQuint' as IEaseType, duration: 600 },
                  { x: -WIDTH_HALF, ease: 'easeInOutQuart' as IEaseType, duration: 450, delay: -150 },
                  ]}
                />
              </div>
              <div className="shape-right">
                <TweenOne
                  animation={[
                  { x: -WIDTH_HALF, type: 'from' as IAnimType, ease: 'easeInOutQuint' as IEaseType, duration: 600 },
                  { x: WIDTH_HALF, ease: 'easeInOutQuart' as IEaseType, duration: 450, delay: -150 },
                  ]}
                />
              </div>
            </div>
            <Texty
              className="title"
              type="mask-top"
              delay={400}
              enter={this.getEnter}
              interval={this.geInterval}
              component={TweenOne}
              componentProps={{
                animation: [
                  { x: 130, type: 'set' },
                  { x: 100, delay: 450, duration: 380 },
                  {
                    duration: 200,
                    ease: 'easeOutQuart',
                    x: 0,
                  },
                  {
                    delay: -300,
                    duration: 1000,
                    ease: 'easeInOutQuint',
                    letterSpacing: 0,
                    scale: 0.9,
                  },
                  { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
                ],
              }}
            >
              平面设计平台
            </Texty>
            <TweenOne
              className="combined-bar"
              animation={{ delay: 2000, width: 0, x: WIDTH_HALF, type: 'from', ease: 'easeInOutExpo' }}
            />
            <Texty
              className="content"
              type="bottom"
              split={this.getSplit}
              delay={2200}
              interval={30}
            >
              by: 刘翾
            </Texty>
        </div>
      </div>
    );
  }
}

export default HomeContent;
