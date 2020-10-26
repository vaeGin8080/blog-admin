import React from "react";
import { Area, Line } from "@ant-design/charts";
import { Carousel, Card, Col, Row, Tag, Divider, Timeline } from "antd";
import "./index.scss";

const imgs = [
  "https://vaegin.top/img/3400.jpg",
  "https://vaegin.top/img/3415.jpg",
  "https://vaegin.top/img/bg.jpg",
];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.asyncFetch();
  }
  asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/antfincdn/YdLK%24VvSkW/fireworks-sales.json"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json,
        });
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  render() {
    const config = {
      background: "white",
      title: {
        visible: true,
        text: "",
      },
      data: this.state.data,
      xField: "Date",
      yField: "scales",
      xAxis: {
        type: "dateTime",
        tickCount: 5,
      },
    };
    const lineData = [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ];
    const lineConfig = {
      data: lineData,
      title: {
        visible: true,
        text: "",
      },
      xField: "year",
      yField: "value",
    };
    return (
      <div style={styles.bg} className="home">
        <Row>
          <Col span={24} className="bloack">
            <Divider orientation="left">Presets</Divider>
            <div>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </div>
          </Col>
          <Col span={12} className="bloack chart">
            <Area {...config} style={styles.chart} />
          </Col>
          <Col span={12} className="bloack chart">
            <Line {...lineConfig} style={styles.chart} />
          </Col>
          <Col span={12} className=""></Col>
        </Row>
        {/*    <Carousel arrows effect="fade" className="size">
          {imgs.map((item) => (
            <div key={item}>
              <div
                className="size"
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover",
                }}
              />
            </div>
          ))}
        </Carousel> */}
      </div>
    );
  }
}

const styles = {
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "calc(100vh - 64px)",
    background: "#f6f8f9",
    padding: "20px",
  },
  chart: {
    width: "100%",
    height: "100%",
  },
};

export default Home;
