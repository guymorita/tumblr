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
        dataSource: ds.cloneWithRows(['row 1','row 2']),
      };
    }
    componentDidMount(){
      this.getMoviesFromApiAsync();
    }
    getMoviesFromApiAsync() {
    return fetch('https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=Q6vHoaVm5L1u2ZAW1fqv3Jw48gFzYVg9P0vH0VHl3GVy6quoGV')
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.response.posts.name);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.response.posts),
        });
      })
      .catch((error) => {
        alert('test2');
        console.error(error);
      });
  }

    render() {
      return (
        <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.summary}</Text>}
        />
      </View>

      );
    }
  }
