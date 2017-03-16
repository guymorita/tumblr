import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ListView
} from 'react-native';

export default class Posts extends Component {

  constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows([]),
      };
    }

    async getMoviesFromApi() {
      try {
        let response = await fetch('https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=Q6vHoaVm5L1u2ZAW1fqv3Jw48gFzYVg9P0vH0VHl3GVy6quoGV')
        let responseJson = await response.json()
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.response.posts)
        })
      } catch(err) {
        console.log(err)
      }
    }

    componentDidMount() {
      this.getMoviesFromApi()
    }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            <Text>{rowData}</Text>
          }
        />
      );
    }

}
