import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: '',
      domain: '',
      query: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDomain = this.handleChangeDomain.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.converUri = this.converUri.bind(this);
  }

  handleChange(event) {
    console.log('event', event);
    this.setState({ schema: event.target.value });
  }

  handleChangeDomain(event) {
    this.setState({ domain: event.target.value });
  }

  handleChangeQuery(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit() {
    // gomeetv3://gomeetv3.vnptit.vn?sessionToken=i61f9rG7KX9WhyB6EiDznBRxd1aOrrNT
    window.location.href = this.converUri();
  }

  converUri() {
    const { schema, domain, query } = this.state;
    return `${schema}://${domain}?${query}`;
  }

  render() {
    return (
      <div className="App">
        <div style={{ flexDirection: 'column', display: "flex" }} >
          <label>
            schema: 
            <input className='input' type="text" value={this.state.schema} onChange={this.handleChange} ></input>
          </label>
          <label>
            domain: 
            <input className='input' type="text" value={this.state.domain} onChange={this.handleChangeDomain} />
          </label>
          <label>
            query: 
            <input className='input' type="text" value={this.state.query} onChange={this.handleChangeQuery} />
          </label>
          <div>Link: {this.converUri()}</div>
          <button className="button" onClick={this.handleSubmit}>Open app</button>
        </div>
      </div>
    );
  }
}

export default App;
