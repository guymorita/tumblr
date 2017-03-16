import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,ListView
} from 'react-native';

import moment from 'moment'

export default class Posts extends Component {

constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  componentDidMount(){
    this.getMoviesFromApiAsync();
  }
  getMoviesFromApiAsync() {
  return fetch('https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=Q6vHoaVm5L1u2ZAW1fqv3Jw48gFzYVg9P0vH0VHl3GVy6quoGV')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson.response.posts),
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous * 1000;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}
  cellOnRow(rowData){
    const blank = 'https://68.media.tumblr.com/c2b359d90b868247565a37b4f70ea2d9/tumblr_omu6agTv6b1qbd81ro1_75sq.jpg';
    const hasLoaded = rowData.photos
    console.log('rowData.tagsv2', rowData)
    return(
      <View >
        <Image
            source ={{uri: hasLoaded ? rowData.photos[0].original_size.url : blank}}
            style ={{resizeMode:'cover',flex:1,height:400}}
        />
        <View>
          <Text>{rowData.summary}</Text>
        </View>
        <View style={{width:200,height:2,backgroundColor:'#000',margin:10}}>

        </View>
        <View>
          <Text>
            {rowData.tags}
          </Text>
        </View>
        <View>
          <Text>{this.timeDifference(Date.now(), rowData.timestamp)}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.cellOnRow(rowData)}
        />
      </View>
    );
  }
}
