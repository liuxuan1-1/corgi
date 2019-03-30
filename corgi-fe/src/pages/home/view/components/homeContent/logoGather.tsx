import * as React from 'react';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import { API_URL } from '../../../../../pagesConst';

interface IProps {
  image?: string,
  w?: number,
  h?: number,
  pixSize?: number,
  pointSizeMin: number,
}


class LogoGather extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    h: 300,
    image: `${API_URL}/corgi/public/img/web/BG_big.svg`,
    pixSize: 20,
    pointSizeMin: 10,
    w: 300,
  };
  protected interval: any;
  protected gather: boolean;
  protected intervalTime: number;
  protected dom: any;
  protected pointArray: any;
  protected sideBoxComp: any;
  protected sideBox: any;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.interval = null;
    this.gather = true;
    this.intervalTime = 9000;
  }

  public componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    this.createPointData();
  }

  public componentWillUnmount() {
    ticker.clear(this.interval);
    this.interval = null;
  }

  public onMouseEnter = () => {
    // !this.gather && this.updateTweenData();
    if (!this.gather) {
      this.updateTweenData();
    }
    this.componentWillUnmount();
  };

  public onMouseLeave = () => {
    // this.gather && this.updateTweenData();
    if (this.gather) {
      this.updateTweenData();
    }
    this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
  };

  public setDataToDom(data: any, w: any, h: any) {
    this.pointArray = [];
    const pixSizeNumber: any = this.props.pixSize;
    // 默认每间隔20个取一个点，并判断其透明度如果合适则放到pointArray
    for (let i = 0; i < w; i += pixSizeNumber) {
      for (let j = 0; j < h; j += pixSizeNumber) {
        if (data[((i + j * w) * 4) + 3] > 150) {
          this.pointArray.push({ x: i, y: j });
        }
      }
    }
    const children: any = [];
    this.pointArray.forEach((item: any, i: any) => {
      const r = Math.random() * this.props.pointSizeMin + this.props.pointSizeMin;
      const b = Math.random() * 0.4 + 0.1;
      children.push((
        <TweenOne className="point-wrapper" key={i} style={{ left: item.x, top: item.y }}>
          <TweenOne
            className="point"
            style={{
              backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
              height: r,
              opacity: b,
              width: r,
            }}
            animation={{
              delay: Math.random() * 1000,
              duration: 3000,
              ease: 'easeInOutQuad',
              repeat: -1,
              x: (Math.random() * 2 - 1) * 5 || 2.5,
              y: (Math.random() * 2 - 1) * 10 || 5,
              yoyo: true,
            }}
          />
        </TweenOne>
      ));
    });
    this.setState({
      boxAnim: {
        delay: 2600,
        duration: 800,
        opacity: 0,
        type: 'from',
      },
      children,
    }, () => {
      this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
    });
  }

  public createPointData = () => {
    const { w, h, image } = this.props;
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, w as number, h as number);
    canvas.width = w as number;
    canvas.height = h as number;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w as number, h as number);
      // 获取图片像素点
      const data = ctx.getImageData(0, 0, w as number, h as number).data;
      this.setDataToDom(data, w, h);
      this.dom.removeChild(canvas);
    };
    img.crossOrigin = 'anonymous';
    img.src = image as string;
  };

  public gatherData = () => {
    const children = this.state.children.map((item: any )=>
      React.cloneElement(item, {
        animation: {
          delay: Math.random() * 500,
          duration: 800,
          ease: 'easeInOutQuint',
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        },
      }));
    this.setState({ children });
  };

  public disperseData = () => {
    const rect = this.dom.getBoundingClientRect();
    const sideRect = this.sideBox.getBoundingClientRect();
    const sideTop = sideRect.top - rect.top;
    const sideLeft = sideRect.left - rect.left;
    const children = this.state.children.map((item: any) =>
      React.cloneElement(item, {
        animation: {
          duration: Math.random() * 500 + 500,
          ease: 'easeInOutQuint',
          opacity: Math.random() * 0.4 + 0.1,
          scale: Math.random() * 2.4 + 0.1,
          x: Math.random() * rect.width - sideLeft - item.props.style.left,
          y: Math.random() * rect.height - sideTop - item.props.style.top,

        },
      }));

    this.setState({
      children,
    });
  };

  public updateTweenData = () => {
    this.dom = ReactDOM.findDOMNode(this);
    this.sideBox = ReactDOM.findDOMNode(this.sideBoxComp);
    ((this.gather && this.disperseData) || this.gatherData)();
    this.gather = !this.gather;
  };

  public render() {
    return (
      <div className="logo-gather-demo-wrapper">
        <canvas id="canvas" />
        <TweenOne
          animation={this.state.boxAnim}
          className="right-side blur"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={(c) => {
            this.sideBoxComp = c;
          }}
        >
          {this.state.children}
        </TweenOne>
      </div>
    );
  }
}

export default LogoGather;
