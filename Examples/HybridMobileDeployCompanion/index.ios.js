/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var Button = require("react-native-button");

var HybridMobileDeploy = require('react-native-hybrid-mobile-deploy')('http://localhost:3000/', '<deployment key here>');

var HybridMobileDeployCompanion = React.createClass({
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
      HybridMobileDeploy.queryUpdate((err, update) => {
        this.setState({ update: update, updateString: JSON.stringify(update) });
      });
  },
  getInitialState: function() {
    return { update: false, updateString: "" };
  },
  handlePress: function() {
    HybridMobileDeploy.installUpdate(this.state.update);
  },
  render: function() {
    var updateView;
    if (this.state.update) {
      updateView = (
        <View>
          <Text>Update Available: {'\n'} {this.state.update.scriptVersion} - {this.state.update.description}</Text>
          <Button style={{color: 'green'}} onPress={this.handlePress}>
            Update
          </Button>
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        {updateView}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HybridMobileDeployCompanion', () => HybridMobileDeployCompanion);
