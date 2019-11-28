import React from "react";

export default class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    people: []
  };

  async componentDidMount() {
    const url = "https://api.randomuser.me/?results=1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.results, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.people.length) {
      return <div>didn't get a person</div>;
    }
    return (
      <div>
        {this.state.people.map(person => (
          <div key={person.name.first + person.name.last}>
            <img src={person.picture.large} />
          </div>
        ))}
      </div>
    );
  }
}
