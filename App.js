import { useState, useEffect } from "react";
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import Carousel from "react-native-snap-carousel";
import SelectDropdown from 'react-native-select-dropdown'


function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  var API_KEY = '13237acc449e4d531a2b50d2a43bd9e1';
  var API_LALO_URL = `https://api.openweathermap.org/geo/1.0/direct`;
  var API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast`;

  const selectTimeframe = [
    "Tomorrow",
    "Day After Tomorrow",
    "In 3 Days",
    "In 4 Days",
    "In 5 Days"
];
  const selectTimeSlot = [
    "00:00 (Midnight)",
    "03:00",
    "06:00",
    "09:00",
    "12:00 (Noon)",
    "15:00",
    "18:00",
    "21:00"
];



  const fetchWeatherData = async () => {
    try {
      console.log(`1 -> ${API_LALO_URL}?q=${city}&appid=${API_KEY}`);
      fetch(`${API_LALO_URL}?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          var apiResponse = data[0];
          setLat(apiResponse.lat);
          setLon(apiResponse.lon);
          console.log("2 -> ", apiResponse.lat, apiResponse.lon); // Use apiResponse.lat and apiResponse.lon
          return fetch(`${API_WEATHER_URL}?lat=${apiResponse.lat}&lon=${apiResponse.lon}&appid=${API_KEY}`);
        })
        .then(response => response.json())
        .then(data => {
          console.log("3 -> ", data.list);
          setWeatherData(data.list);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  



  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  useEffect(() => {
    fetchWeatherData();
  }, []);


  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ImageBackground
      source={require("./assets/image/sky.jpeg")}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>Perfit</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <View style={styles.inputContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.leftText}>Time Frame</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.rightText}>Time Slot</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <SelectDropdown
              data={selectTimeframe}
              buttonText="Select Time Frame"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
            <SelectDropdown
              data={selectTimeSlot}
              buttonText={"Select Time Slot"}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          </View>

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
            require("./assets/image/image1.png"),
            require("./assets/image/image2.png"),
            require("./assets/image/image3.png"),
            require("./assets/image/image4.png"),
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
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1, // Take up half of the available space
    alignItems: "center",
  },
  rightContainer: {
    flex: 1, // Take up half of the available space
    alignItems: "center", // Align to the right
  },
  leftText: {
    textAlign: "center",
  },
  rightText: {
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row", // Display items horizontally
    alignItems: "center", // Align items vertically within the row
    marginBottom: 10,
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


