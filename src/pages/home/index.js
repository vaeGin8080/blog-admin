import React from "react";

function Welcome(props) {
  let { removeChart } = props;
  return <h1 onClick={() => removeChart()}>Hello,{props.name}</h1>;
}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

function Slot(props) {
  return (
    <div>
      <div className="left">{props.left}</div>
      <div className="left">{props.right}</div>
      {props.children}
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: [1, 2, 3, 4, 5]
    };
  }
  inputChange(e) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  onClick(name) {
    console.log(3);
    this.setState({
      name: this.state.name + name
    });
  }

  render() {
    const { name, list } = this.state;
    const row = list.map((row, index) => {
      return <li key={row}>{row * 2}</li>;
    });
    return (
      <div>
        <span onClick={() => this.onClick()}>Home</span>
        <input
          autoComplete="off"
          type="text"
          name="name"
          value={name}
          onChange={e => this.inputChange(e)}
        />
        <Welcome name={name} removeChart={e => this.onClick(name)}></Welcome>
        {row}
        <Clock></Clock>
        <Slot
          left={
            <Welcome
              name={name}
              removeChart={e => this.onClick(name)}
            ></Welcome>
          }
          right=""
        ></Slot>
      </div>
    );
  }
}

export default Home;
