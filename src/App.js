import React from 'react';
import {
  Row, Input, Col, List, Avatar, Badge, Tag, Card
} from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './App.css';
import Services from './utils/api'

const { Meta } = Card;


const { Search } = Input;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      products: [],
      furnitureStyle: [],
    }
  }

  componentDidMount() {
    new Services().get('5c9105cb330000112b649af8').then(({ products, furnitureStyle }) => {
      this.setState({ products, furnitureStyle })
    })
  }


  onChangeFilterInput = (e) => {
    this.setState({
      searchInput: e.target.value
    }, () => {
      new Services().get('5c9105cb330000112b649af8').then(({ products }) => {
        let newList = [];
        let currentList = [...products];
        newList = currentList.filter(item => {
          const lc = item.name.toLowerCase();
          // console.log('lc', lc)
          const filter = this.state.searchInput.toLowerCase();
          return lc.includes(filter);
        });
        this.setState({
          products: newList,
        });
      })
    })
  }


  handleRenderCard = () => {
    const componentCard = [];
    this.state.products.map((v, i) => {
      console.log('v', v, i)
      componentCard.push(
        <Col span={5}>
          <Card
            // style={{ width: 300 }}
            // actions={[
            //   <Icon type="setting" key="setting" />,
            //   <Icon type="edit" key="edit" />,
            //   <Icon type="ellipsis" key="ellipsis" />,
            // ]}
          >
            <Meta
              // avatar={<Avatar src={v.avatar} />}
              title={v.name}
              description={v.description}
            />
          </Card>
        </Col>
      )
    })

    console.log('componentCard', componentCard)
    return componentCard;
  }



  render() {
    return (
      <div>

        <Row>
          <Col span={12}>
            <Search
              placeholder="input search text"
              onChange={this.onChangeFilterInput}
              style={{ width: 200 }}
            />
          </Col>
        </Row>

        <Row>
          <div className='container'>
            {this.handleRenderCard()}
          </div>

        </Row>


      </div>
    );

  }

}

export default App;
