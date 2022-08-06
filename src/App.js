import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState();
  const [distanceDiff, setDistanceDiff] = useState();
  const [navigationState, setNavigationState] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios(process.env.REACT_APP_LOCATION_API);
      setData(res.data);
    };

    getData();
  }, []);

  let radians = function (degree) {
    // degrees to radians
    let rad = (degree * Math.PI) / 180;
    return rad;
  };

  const haversine = useCallback((lat1, lon1, lat2, lon2) => {
    let dlat, dlon, a, c, R;

    R = 6372.8; // km
    dlat = radians(lat2 - lat1);
    dlon = radians(lon2 - lon1);
    lat1 = radians(lat1);
    lat2 = radians(lat2);
    a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2);
    c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  }, []);

  const getPosition = useCallback(
    (position) => {
      const coordinates = position.coords;
      let distanceComparision = [];
      let distance, distanceObj;

      data.forEach((element) => {
        distance = haversine(
          coordinates.latitude,
          coordinates.longitude,
          element.location.lat,
          element.location.lon
        );
        distanceObj = { name: element.name, distnce: distance };
        distanceComparision.push(distanceObj);
      });

      let nearest = distanceComparision
        .sort((a, b) => a.distnce - b.distnce)
        .slice(0, 5);
      setDistanceDiff(nearest);
    },
    [data, haversine]
  );

  const getError = (error) => {
    if (error) {
      setNavigationState(
        "Your browsers locaton is not enabled. Please enable your location"
      );
    }
  };

  const handleClick = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, getError);
    } else {
      setNavigationState("Your browser does not support location service.");
    }
  }, [getPosition]);

  const disabledLocation = (navigationState || navigationState?.length > 0) && (
    <p>{navigationState}</p>
  );

  const nearestLocations = distanceDiff?.map((d, i) => (
    <p key={d.name}>
      {i + 1}. {d.name}
    </p>
  ));

  const nearestLocationsHeader = distanceDiff?.length > 0 && (
    <h3>Nearest Locations.</h3>
  );

  return (
    <div className="nearest-locations">
      <button onClick={handleClick}>Find nearest boutiques</button>
      {disabledLocation}
      {nearestLocationsHeader}
      {nearestLocations}
    </div>
  );
};

export default App;
