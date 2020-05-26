import React from "react";
import { Carousel } from "antd";
import "./index.scss";

const imgs = [
  "https://vaegin.top/img/20180818104651_cGNvT.jpeg",
  "https://vaegin.top/img/20160308193117_nkfKX.jpeg",
  "https://vaegin.top/img/20160308193000_RAcVw.jpeg",
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
