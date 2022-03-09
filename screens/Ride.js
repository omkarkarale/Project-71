import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");

export default class RideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeId: "",
      userId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: "scanner",
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      bikeId: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { bikeId, userId, domState, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.title}>e-ride</Text>
          <Text style={styles.subtitle}>A Eco-Friendly Ride</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={[styles.textinput, { width: "100%", borderRadius: 5}]}
              placeholder={"User Id"}
              placeholderTextColor={"#FFFFFF"}
              value={userId}
            />
          </View>
          <View style={[styles.textinputContainer, { marginTop: "8%" }]}>

            <TextInput
              style={styles.textinput}
              placeholder={"Bicycle Id"}
              placeholderTextColor={"#FFFFFF"}
              value={bikeId}
            />

            <TouchableOpacity
              style={styles.scanbutton}

             // onPress={this.getCameraPermissions()}
            onPress={() => this.getCameraPermissions()}
             // onPress={() => this.getCameraPermissions}
             // onPress=() => this.getCameraPermissions()

             

            >
              <Text style={styles.scanbuttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0E6F0"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 1.02,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    marginTop: "7%"
  },
  title: {
    fontSize: "190%",
    fontFamily: "Rajdhani_600SemiBold",
    paddingTop: "2%",
    color: "#4C5D70"
  },
  subtitle: {
    fontSize: "95%",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#4C5D70",
    paddingBottom: "5%"
  },
  lowerContainer: {
    flex: 0.7,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#4C5D70",
    borderColor: "#4C5D70"
  },
  textinput: {
    width: 110,
    height: 20,
    padding: "10%",
    borderColor: "#4C5D70",
    borderWidth: "10%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: "100%",
    backgroundColor: "#F88379",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 70,
    height: 36,
    paddingLeft: 10,
    backgroundColor: "#FBE5C0",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 25,
    paddingRight: 5,
    color: "#4C5D70",
    fontFamily: "Rajdhani_600SemiBold"
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBE5C0",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4C5D70"
  },
  buttonText: {
    fontSize: 24,
    color: "#4C5D70",
    fontFamily: "Rajdhani_600SemiBold"
  }
});
