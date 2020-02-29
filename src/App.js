import {
  Card, Col, Input, PageHeader, Row, Select, Tag,
} from 'antd';
import numeral from 'numeral';
import React from 'react';
import './App.css';
import Services from './utils/api';
import truncate from './utils/truncate';

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      products: [],
      filterFurnitureStyle: [],
      filterDeliveryDays: [],
    };
  }

  // when component finish render we fetch into api
  componentDidMount() {
    // fetch all data from api in one function
    this.handleFetch();
  }

  filterSearchInput = (dataFetch = []) => {
    const { searchInput } = this.state;
    let newList = [];
    // do filter dataFetch with parameter from state searchInput
    newList = dataFetch.filter((item) => {
      const lc = item.name.toLowerCase();
      const filter = searchInput.toLowerCase();
      return lc.includes(filter); // check if each item have filter value from input search
    });

    this.setState({
      products: newList,
    });
  };

  filterSelectStyle = (dataFetch = []) => {
    const tempResultFoundFilter = [];
    const { filterFurnitureStyle, products, searchInput } = this.state;

    if (!filterFurnitureStyle.length) {
      return;
    }

    /**
     * checking if search input value is available
     * if there is value, use state products instead
     * it's allow for use multiple filter at same time
     * but if not we using dataFetch from fetching api as default
     */
    const tempDataFilter = searchInput ? products : dataFetch;

    /**
    * search with paramerter from filterFurnitureStyle search into data tempDataFilter
    * using 'every' with filterFurnitureStyle for match exact the same value.
    * if same we save it in tempResultFoundFilter and set it to state products
    */
    tempDataFilter.forEach((v) => {
      const checkAllFounded = filterFurnitureStyle.every((x) => v.furniture_style.includes(x));
      if (checkAllFounded) {
        tempResultFoundFilter.push(v);
      }
    });

    this.setState({
      products: tempResultFoundFilter,
    });
  };

  filterSelectDelivery = (dataFetch = []) => {
    const {
      filterDeliveryDays, products, searchInput, filterFurnitureStyle,
    } = this.state;

    if (!filterDeliveryDays.length) {
      return;
    }

    // Parsing all selected filter delivery days value from JSON String into JSON Array
    const parseFilterDeliveryDays = filterDeliveryDays.map((x) => JSON.parse(x));

    /**
     * checking if filterFurnitureStyle or searchInput empty if no, use state products
     * it's allow for multiple search filter at same time.
     */
    const tempDataFilter = (filterFurnitureStyle.length || searchInput) ? products : dataFetch;

    const tempResultFoundFilter = [];

    // loop through array of filterFurnitureStyle
    parseFilterDeliveryDays.forEach((x) => {
      /**
       * filter tempDataFilter with two condition
       * if delivery_time is more than start and less than end object,
       * than save it into tempResultFoundFilter
       * v.delivery_time is String so we do parseInt in order able to compare it.
       */
      const result = tempDataFilter.filter((v) => ((parseInt(v.delivery_time, 10) > x.start) && (parseInt(v.delivery_time, 10) <= x.end)));

      /**
      * it's will produce new array items as many as parseFilterDeliveryDays length
      * each array will contain search result from every multiple selected delivery days
      * we need to merge it latter
      */
      tempResultFoundFilter.push(result);
    });

    // merge all result into one array items of object
    const tempMergedResultFilter = [].concat(...tempResultFoundFilter);

    this.setState({
      products: tempMergedResultFilter,
    });
  };


  onFilterFurnitureStyle = (value = '') => {
    this.setState(
      {
        filterFurnitureStyle: value,
      },
      () => {
        this.handleFetch();
      },
    );
  };

  onFilterDeliveryDays = (value = '') => {
    this.setState(
      {
        filterDeliveryDays: value,
      },
      () => {
        this.handleFetch();
      },
    );
  };

  onChangeFilterInput = (e) => {
    this.setState(
      {
        searchInput: e.target.value,
      },
      () => {
        this.handleFetch();
      },
    );
  };

  /**
  * @function
  * this function will always rerender according if any state is changed
  * because we put it in render function.
  */
  handleRenderCard = () => {
    const {
      products,
    } = this.state;

    // we will fill component inside componentCard.
    const componentCard = [];

    /**
    * if state products changed we will rerender it
    * do dynamic render add component into componentCard
    * with value from stae products
    */
    products.forEach((v) => {
      componentCard.push(
        <Col flex={2} className="card" span={10}>
          <Card>
            <Meta
              title={(
                <>
                  <div className="float-left">{v.name}</div>
                  <div className="float-right">
                    {`Rp. ${numeral(v.price).format()}`}
                  </div>
                </>
              )}
              description={(
                <>
                  <div className="description">
                    {truncate(v.description, 114)}
                  </div>
                  <div className="float-left furniture-style">
                    {v.furniture_style.map((x) => <Tag color="blue">{x}</Tag>)}
                  </div>
                  <br />
                  <div className="float-right delivery">{`${v.delivery_time} Day`}</div>
                </>
              )}
            />
          </Card>
        </Col>,
      );
    });
    return componentCard;
  };

  handleFetch() {
    const {
      filterDeliveryDays, searchInput, filterFurnitureStyle,
    } = this.state;

    // fetch all data from api in one function
    new Services().get('5c9105cb330000112b649af8').then(({ products }) => {
      /**
      *  checking all filter if all state value is empty we block it and return result fetch
      *  without any proccess in filter and set it into products state
      */
      if ((filterFurnitureStyle.length <= 0)
        && (!searchInput)
        && (filterDeliveryDays.length <= 0)
      ) {
        this.setState({
          products,
        });
        return;
      }

      // do filter by search input with fetching result
      this.filterSearchInput(products);
      // do filter by multi select style products
      this.filterSelectStyle(products);
      // do filter by multi select delivery time
      this.filterSelectDelivery(products);
    });
  }


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
                    style={{ width: '100%' }}
                    placeholder="Select Furniture Style"
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
                    style={{ width: '100%' }}
                    placeholder="Select Delivery Days"
                    onChange={this.onFilterDeliveryDays}
                  >
                    <Option key={'{"start":0, "end":7}'}>1 Week</Option>
                    <Option key={'{"start":7, "end":14}'}>2 weeks</Option>
                    <Option key={'{"start":14, "end":30}'}>1 month</Option>
                  </Select>
                </Col>
              </Row>
            </PageHeader>
          </Col>
        </Row>
        <Row className="container" type="flex">
          {/* do render in separate function */}
          {this.handleRenderCard()}
        </Row>
      </div>
    );
  }
}

export default App;
