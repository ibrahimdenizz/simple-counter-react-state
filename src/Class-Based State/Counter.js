import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const setStateFromLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();
    document.title = 'Count ' + this.state.count;

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
  }

  updateDocumentTitle() {
    document.title = 'Count ' + this.state.count;
  }

  increment() {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        return { count: state.count + step };
      },
      /* setStateFromLocalStorage(this.state) */
      this.updateDocumentTitle,
    );

    console.log('Before!', this.state);
  }

  decrement() {
    this.setState({ count: this.state.count - 1 }, this.updateDocumentTitle);
  }

  reset() {
    this.setState({ count: 0 }, this.updateDocumentTitle);
  }

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
