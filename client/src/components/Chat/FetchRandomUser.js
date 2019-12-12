import React from "react";

 class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    character: []
  };

  async componentDidMount() {
    const url = "https://rickandmortyapi.com/api/character/1";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.image)
    this.setState({ data: data.image, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.data.length) {
      return <div>didn't get a person</div>;
    }
    return (
      <div>         
        <img src={this.state.data} alt="random picture" />
      </div>
    );
  }
}
export default FetchRandomUser;