import * as React from 'react';
// import { Menu, Icon } from 'antd';
// import { ClickParam } from 'antd/lib/menu';


interface Istates {
}

interface Iprops {
  materialSpecial: {
    [propName: string]: any,
  },
  callbackChangeMaterial: (e: {
    type: string,
    target: string,
  }) => void
}

class Material extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public handleClickMaterial = (e: React.MouseEvent): void => {
    const target: HTMLDivElement = e.target as HTMLDivElement;
    if (target.dataset.key) {
      this.props.callbackChangeMaterial({
        target: target.dataset.key,
        type: 'material',
      })
    }
  }

  public render() {
    const { materialSpecial } = this.props;
    const { } = this.state;

    const result: React.ReactNodeArray = [];
    for (const prop in materialSpecial) {
      if (materialSpecial[prop]) {
        result.push((
          <div key={`${prop}-wrapper`} className="material-item-wrapper" data-key={prop}>
            <div key={`${prop}-item`} className="material-item" id={materialSpecial[prop].id} data-key={prop} />
          </div>
        ))
      }
    }
    return (
      <div className="material-wrapper" onClick={this.handleClickMaterial}>
        {result}
      </div>
    );
  }
}

export default Material;
