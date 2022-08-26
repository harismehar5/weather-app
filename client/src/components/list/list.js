import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import {
  WEATHER_LIST,
  CITY_WEATHER_LIST,
  COUNTRY_WEATHER_LIST,
} from "../../utils/config";

import "./list.scss";
function data(
  name,
  country,
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
  sea_level,
  grnd_level
) {
  return {
    name,
    country,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    sea_level,
    grnd_level,
  };
}

export default function List() {
  const [weatherList, setWeatherList] = useState([]);
  const [citySearchValue, setCitySearchValue] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [countryTextFieldDisable, setCountryTextFieldDisable] = useState(false);
  const [cityTextFieldDisable, setCityTextFieldDisable] = useState(false);

  const getWeatherList = () => {
    axios
      .get(WEATHER_LIST)
      .then((response) => {
        // console.log(response.data.weather);
        setWeatherList(response.data.weather);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getCityWiseWeatherList = (value) => {
    // console.log(CITY_WEATHER_LIST + value);
    axios
      .get(CITY_WEATHER_LIST + value)
      .then((response) => {
        if (!response.data.error) {
        //   console.log(response.data.response);
          setWeatherList(response.data.response);
        } else {
          alert(response.data.error_msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getCountryWiseWeatherList = (value) => {
    // console.log(COUNTRY_WEATHER_LIST + value);
    axios
      .get(COUNTRY_WEATHER_LIST + value)
      .then((response) => {
        if (!response.data.error) {
        //   console.log(response.data.response);
          setWeatherList(response.data.response);
        } else {
          alert(response.data.error_msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cityHandleChange = (value) => {
    if (value.length !== 0) {
      getCityWiseWeatherList(value);
      setCountryTextFieldDisable(true);
    } else {
      setCountryTextFieldDisable(false);
    //   alert("Please enter the city name");
    getWeatherList();

    }
  };
  const countryHandleChange = (value) => {
    if (value.length !== 0) {
      getCountryWiseWeatherList(value);
      setCityTextFieldDisable(true);
    } else {
      setCityTextFieldDisable(false);
    //   alert("Please enter the city name");
    getWeatherList();

    }
  };

  useEffect(() => {
    getWeatherList();
  }, []);

  return (
    <div className="list-container">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-name"
          label="City Name"
          placeholder="Enter City Name"
          value={citySearchValue}
          onChange={(e) => {
            // console.log(e.target.value);
            setCitySearchValue(e.target.value);
            cityHandleChange(e.target.value);
          }}
          //   margin="normal"
          disabled={cityTextFieldDisable}
        />
        <TextField
          id="outlined-name"
          label="Country Name"
          placeholder="Enter Country Name"
          value={countrySearchValue}
          onChange={(e) => {
            // console.log(e.target.value);
            setCountrySearchValue(e.target.value);
            countryHandleChange(e.target.value);
          }}
          disabled={countryTextFieldDisable}
          //   margin="normal"
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Temp</TableCell>
              <TableCell align="right">Feels Like</TableCell>
              <TableCell align="right">Min Temp</TableCell>
              <TableCell align="right">Max Temp</TableCell>
              <TableCell align="right">Pressure</TableCell>
              <TableCell align="right">Humidity</TableCell>
              <TableCell align="right">Sea Level</TableCell>
              <TableCell align="right">Ground Level</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell align="right">{row.temp}</TableCell>
                <TableCell align="right">{row.feels_like}</TableCell>
                <TableCell align="right">{row.temp_min}</TableCell>
                <TableCell align="right">{row.temp_max}</TableCell>
                <TableCell align="right">{row.pressure}</TableCell>
                <TableCell align="right">{row.humidity}</TableCell>
                <TableCell align="right">{row.sea_level}</TableCell>
                <TableCell align="right">{row.grnd_level}</TableCell>
                {/* <TableCell align="right">
                <IconButton aria-label="Example">
                  <FontAwesomeIcon icon={faEdit} />
                </IconButton>
                <IconButton aria-label="Example">
                  <FontAwesomeIcon icon={faTrash} color="red"/>
                </IconButton>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
