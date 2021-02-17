import PropTypes from "prop-types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import capitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { weatherConditions } from "../utils/WeatherConditions";

const Weather = ({ weather, temperature, place, icon, description }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color },
        ]}
      >
        <View style={styles.headerContainer}>
          {/* <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={"white"}
          /> */}
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.place}>{place}</Text>
          <Text style={styles.title}>{capitalizeFirstLetter(description)}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    );
  }
};

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  weatherIcon: {
    flex: 1,
    width: 150,
    height: 150,
  },
  tempText: {
    flex: 1.5,
    fontSize: 70,
    color: "#fff",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  place: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontSize: 60,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Weather;
