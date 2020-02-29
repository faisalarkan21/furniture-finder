import { Card, Col, Input, PageHeader, Row, Select, Tag } from "antd";
import numeral from "numeral";
import React from "react";
import "./App.css";
import Services from "./utils/api";
import truncate from "./utils/truncate";

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      products: [],
      filterFurnitureStyle: [],
      filterFurnitureStyle: [],
      filterDeliveryDays: []
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  filterSearchInput = (dataFetch = []) => {
    const { searchInput } = this.state;

    let newList = [];
    let currentList = [...dataFetch];
    newList = currentList.filter(item => {
      const lc = item.name.toLowerCase();
      const filter = searchInput.toLowerCase();
      return lc.includes(filter);
    });

    this.setState({
      products: newList
    });
  };

  filterSelectStyle = (dataFetch = []) => {
    let tempResultFoundFilter = [];
    const { filterFurnitureStyle, products, searchInput } = this.state;

    if (!filterFurnitureStyle.length) {
      return;
    }

    let tempDataFilter = searchInput ? products : dataFetch

    tempDataFilter.forEach(v => {
      const checkAllFounded = filterFurnitureStyle.every((x, i) =>
        v.furniture_style.includes(x)
      );
      if (checkAllFounded) {
        tempResultFoundFilter.push(v);
      }
    });

    this.setState({
      products: tempResultFoundFilter
    });
  };

  filterSelectDelivery = (dataFetch = []) => {

    const { filterDeliveryDays, products, searchInput, filterFurnitureStyle } = this.state;

    if (!filterDeliveryDays.length) {
      return;
    }

    const parseFilterDeliveryDays = filterDeliveryDays.map(x => JSON.parse(x));
    let tempDataFilter = (filterFurnitureStyle.length || searchInput) ? products : dataFetch;

    let tempResultFoundFilter = [];    
    parseFilterDeliveryDays.map((x, i) => {
      const result = tempDataFilter.filter(v => ((parseInt(v.delivery_time) <= x.end) && (parseInt(v.delivery_time) > x.start)));
      tempResultFoundFilter.push(result)
    })

    var tempMergedResultFilter = [].concat(...tempResultFoundFilter);

    this.setState({
      products: tempMergedResultFilter
    });

  };

  handleFetch() {
    new Services().get("5c9105cb330000112b649af8").then(({ products }) => {

      if (
        this.state.filterFurnitureStyle.length <= 0 &&
        this.state.searchInput &&
        this.state.filterDeliveryDays.length <= 0
      ) {
        this.setState({
          products
        });
      }

      this.filterSearchInput(products);
      this.filterSelectStyle(products);
      this.filterSelectDelivery(products);
    });
  }

  onFilterFurnitureStyle = (value = "") => {
    this.setState(
      {
        filterFurnitureStyle: value
      },
      () => {
        this.handleFetch();
      }
    );
  };

  onFilterDeliveryDays = (value = "") => {
    this.setState(
      {
        filterDeliveryDays: value
      },
      () => {
        this.handleFetch();
      }
    );
  };

  onChangeFilterInput = e => {
    this.setState(
      {
        searchInput: e.target.value
      },
      () => {
        this.handleFetch();
      }
    );
  };

  handleRenderCard = () => {
    const componentCard = [];
    this.state.products.map((v) => {
      componentCard.push(
        <Col flex={2} className="card" span={10}>
          <Card>
            <Meta
              title={
                <>
                  <div className="float-left">{v.name}</div>
                  <div className="float-right">
                    {`Rp. ${numeral(v.price).format()}`}
                  </div>
                </>
              }
              description={
                <>
                  <div className="description">
                    {truncate(v.description, 114)}
                  </div>
                  <div className="float-left furniture-style">
                    {v.furniture_style.map(v => {
                      return <Tag color="blue">{v}</Tag>;
                    })}
                  </div>
                  <br />
                  <div className="float-right delivery">{`${v.delivery_time} Day`}</div>
                </>
              }
            />
          </Card>
        </Col>
      );
    });
    return componentCard;
  };

  render() {
    return (
      <div>
        <Row className="container header-tools" type="flex">
          <Col span={24}>
            <PageHeader ghost={false}>
              <Row gutter={[1, 24]}>
                <Col span={11}>
                  <Search
                    placeholder="Search Furniture"
                    onChange={this.onChangeFilterInput}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Furniture Style"
                    onChange={this.onFilterFurnitureStyle}
                  >
                    <Option key="Classic">Classic</Option>
                    <Option key="Midcentury">Midcentury</Option>
                    <Option key="Scandinavian">Scandinavian</Option>
                    <Option key="Modern">Modern</Option>
                    <Option key="Contemporary">Contemporary</Option>
                  </Select>
                </Col>

                <Col span={12}>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Delivery Days"
                    onChange={this.onFilterDeliveryDays}
                  >
                    <Option key={`{"start":0, "end":7}`}>1 Week</Option>
                    <Option key={`{"start":7, "end":14}`}>2 weeks</Option>
                    <Option key={`{"start":14, "end":30}`}>1 month</Option>
                  </Select>
                </Col>
              </Row>
            </PageHeader>
          </Col>
        </Row>
        <Row className="container" type="flex">
          {this.handleRenderCard()}
        </Row>
      </div>
    );
  }
}

export default App;
