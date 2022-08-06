# ABout this App

1.  what you did and why::

    I fetched the data from public endpoint provided `https://4149o8lffa.execute-api.eu-west-1.amazonaws.com/challenge/boutiques`.
    On click of button that finds the nearest location i am making a comparision with the endpoint data fetched earlier with a standard Haversine formula that finds the nearest distance between 2 points using latitude and longitude and looping over the fetched data to make comparision with all of them and then i am pushing each compared data in a separate array and then displaying the 5 nearest location , obviously by sorting based on distance.

2.  Consideration::

    I am making a check when browsers location is enabled or disabled or if it does not support location at all.

    I am also using useCallback hooks for performance improvement.



### How to run the project.

1.  First create a .env file in the root of the projects and past this::

    `REACT_APP_LOCATION_API=https://4149o8lffa.execute-api.eu-west-1.amazonaws.com/challenge/boutiques`

2.  npm install and then npm start to run the project.

