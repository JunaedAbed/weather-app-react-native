import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "./components/Weather";
import { API_KEY } from "./utils/WeatherAPIKEY";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    place: "",
    icon: null,
    description: null,

    error: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: "Error Getting Weather Condtions",
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          place: json.name,
          icon: json.weather[0].icon,
          description: json.weather[0].description,
          isLoading: false,
        });
      });
  }

  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      place,
      icon,
      description,
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching the Weather...</Text>
          </View>
        ) : (
          <Weather
            weather={weatherCondition}
            temperature={temperature}
            place={place}
            icon={icon}
            description={description}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30,
  },
});
