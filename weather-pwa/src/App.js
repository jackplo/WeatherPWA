import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from "react";


function App() {
  const [ cityInput, setCityInput ] = useState("");
  const [ weatherData, setWeatherData ] = useState({});
  
  async function getWeatherData() {
		// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
		// query data
		// if there is an error, throw an error
		// if not, save data
		try {
			const serverResponse = await fetch(
				"https://api.openweathermap.org/data/2.5/weather?" + 
				"q=" + cityInput +
				"&appid=" + process.env.REACT_APP_WEATHER_API +
				"&units=imperial"
			)
			const data = await serverResponse.json()
			console.log(data)
			if (data?.cod === "400") throw data;
			setWeatherData(data);
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div
			style={{
				position: "static",
				height: "100vh",
				backgroundImage:
					"url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
				backgroundSize: "cover",
			}}
		>	
		<div style={{
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)"
		}}>
				<Paper withBorder p="lg" style={{maxWidth: "500px"}}>
					<Group position="apart">
						<Text size="xl" weight={500}>
							Get The Weather!
						</Text>
					</Group>
					<Group position="apart">
						<Text size="lg">
							Enter a city, and get the weather below!
						</Text>
					</Group>
					<Group position="apart" mb="xs">
						<TextInput 
						label="City Name"
						placeholder="ex: San Diego"
						onChange={(e) => setCityInput(e.target.value)}
						/>
					</Group>
					<Group position="apart">
						<Button variant="gradient" size="md" onClick={() => getWeatherData()}>
							Get Weather
						</Button>
					</Group>
					{Object.keys(weatherData).length !== 0 ?
					<>
					<Group position="left">
						<Text>
							{weatherData.name} Weather
						</Text>
					</Group>
					<Group position="left">
						<img 
							src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
							width="100px"
							height="100px"
						/>
						<Text size="lg" weight={500}>
							Currently {weatherData.main.temp} &deg;
						</Text>
					</Group>
					</>
					: null
					}
				</Paper>
			</div>
		</div>
	);
}

export default App;
