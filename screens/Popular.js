import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from "react-native-star-view";

export default class PopularScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ngrok_url:"https://48ef-103-154-59-17.ngrok-free.app"
    };
  }
  
  componentDidMount() {
    this.getData();
  }

  getData = () => {
     /*Complete the getData() function.*/
     const url = this.state.ngrok_url + "/popular-articles";
     axios
       .get(url)
       .then(async (response) => {
         this.setState({ data: response.data.data });
       })
       .catch((error) => {
         console.log(error.message);
       });
  };

  /*Write the keyExtractor() and renderItems() functions for the FlatList*/
  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.articleTitleContainer}>
          <Text style={styles.title}>Article Name: </Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{flexDirection:"row"}}>
            <Star score={item.total_events} style={styles.starStyle}/>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
        {/* Add FlatList component here to show the list of articles*/}
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
          initialNumToRender='5'
        />
      
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    width: RFValue(280),
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
    borderWidth: RFValue(2),
    borderColor: "#182854",
    alignSelf: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  articleTitleContainer: {
    position: "relative",
    padding: RFValue(10),
    borderRadius: RFValue(10),
  },
  starStyle: {
    width: RFValue(200),
    height: RFValue(40),
  },
});
