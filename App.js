import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";

import Carousel from "react-native-snap-carousel";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your API key
  const API_URL = `API_URL_HERE`; // Replace with your API URL

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <ImageBackground
      source={require("/Users/minoukh/Desktop/WeatherApp/image/sky.jpeg")}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Perfit</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Dress me!</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.date}>
              {new Date(item.dt * 1000).toDateString()}
            </Text>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              }}
              style={styles.weatherIcon}
            />
            <Text style={styles.temperature}>{item.main.temp}°C</Text>
            <Text style={styles.description}>
              {item.weather[0].description}
            </Text>
          </View>
        )}
      />
      <Carousel
        data={[
          require("/Users/minoukh/Desktop/WeatherApp/image/image1.png"),
          require("/Users/minoukh/Desktop/WeatherApp/image/image2.png"),
          require("/Users/minoukh/Desktop/WeatherApp/image/image3.png"),
          require("/Users/minoukh/Desktop/WeatherApp/image/image4.png"),
          // Add more image paths here
        ]}
        renderItem={({ item }) => (
          <Image source={item} style={styles.carouselImage} />
        )}
        sliderWidth={300}
        itemWidth={300}
        autoplay={true}
        autoplayInterval={3000}
        loop={true} // Enable continuous looping of the carousel
        layout={"stack"} // Adjust the layout style (options: 'default', 'tinder', 'stack')
        layoutCardOffset={18} // Adjust the offset between stacked cards
        layoutCardScale={0.9} // Scale factor for the stacked cards
        inactiveSlideOpacity={0.6} // Opacity of inactive slides
        inactiveSlideScale={0.85} // Scale factor of inactive slides
        enableSnap={true} // Enable snapping to slide positions
        containerCustomStyle={styles.carouselContainer} // Apply custom styling to the carousel container
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    alignSelf: "center",
  },
  header: {
    fontFamily: "Georgia",
    padding: 30,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#916779",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#916779",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forecastItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  carouselImage: {
    width: 100,
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default App;
