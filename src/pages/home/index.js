import React from "react";
import { Carousel } from "antd";
import "./index.scss";

const imgs = [
  // "https://www.vaegin.top/img/angel.jpg",
  "https://www.vaegin.top/images/bg.jpg",
  "https://www.vaegin.top/images/bg4.jpg",
];

class Home extends React.Component {
  render() {
    return (
      <div style={styles.bg} className="home">
        <Carousel arrows effect="fade" className="size">
          {imgs.map((item) => (
            <div key={item}>
              <div
                className="size"
                style={{ backgroundImage: `url(${item})` }}
              />
            </div>
          ))}
          {/*不用img标签是因为图片大小会出现问题*/}
        </Carousel>
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
  },
};

export default Home;
