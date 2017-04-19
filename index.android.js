
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class GeolocationExample extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            initialPosition: 'null',
            lastPosition: 'null',
        };
    }

    watchID: ?number = null;

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("test");
                this.setState({initialPosition: JSON.stringify(position)});
            },
            (error) => {
                console.log(JSON.stringify(error));
                this.componentWillUnmount();
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        console.log("bla : "+this.state.initialPosition);
        this.watchID = navigator.geolocation.watchPosition((position) => {
            console.log("test2");
            let lastPosition = JSON.stringify(position);
            if(this.state.initialPosition === 'null')
                this.setState({initialPosition: lastPosition});
            else
                this.setState({lastPosition: lastPosition});
        });
    }

    componentWillUnmount() {
        console.log("test3");
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View>
                <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {this.state.initialPosition}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position: </Text>
                    {this.state.lastPosition}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});

export default class TpGeoloc4_4_2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <GeolocationExample/>
      </View>
    );
  }
}



AppRegistry.registerComponent('TpGeoloc4_4_2', () => TpGeoloc4_4_2);
