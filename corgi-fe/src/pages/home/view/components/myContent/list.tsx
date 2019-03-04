import * as React from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import Card from './card';
import { message, Row, Col } from 'antd';


interface Istates {
  list: Array<{
    [propName: string]: any,
  }>
}

interface Iprops {
  category: string
}


class MyList extends React.PureComponent<Iprops, Istates> {

  public readonly state: Readonly<Istates> = {
    list: [],
  }
  
  constructor(props: Iprops) {
    super(props);
    this.fetchData();
  }

  /**
   * 获取文件数据
   */
  public fetchData = ():void => {
    axios({
      method: 'get',
      url: `${API_URL}/api/design/getlist`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        this.setState({
          list: result.data.list,
        })
      } else {
        message.error(`获取列表出错: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`获取列表请求出错`);
      // tslint:disable-next-line: no-console
      console.error(`获取列表请求出错: ${JSON.stringify(e)}`)
    })
  }

  public renderList = ():React.ReactNodeArray => {
    const { list } = this.state;
    const result: React.ReactNode[] = [];
    let children: React.ReactNode[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < list.length; i++) {
      children.push((
        <Col key={list[i]._id} span={6}>
          <Card
            data={list[i]}
            fetchData={this.fetchData}
          />
        </Col>
      ));
      if (children.length === 4 || i === list.length-1) {
        result.push((
          <Row key={i} gutter={16} className="list-row">
            {...children}
          </Row>
        ));
        children = [];
      }
    }
    return result;
  }

  public render() {
    return (
      <div className="template-list-wrapper">
        {this.renderList()}
      </div>
    )
  }
}

export default MyList;
