# Moonshot Calendar

The app allows to see list of launches within selected date range and find a pad on the map.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Architecture

-   component - is a presentation
-   container - is a glue between a component and data
-   store - is a shared application data storage
-   http-client - is a client that abstract a use of the XMLHttpRequest

### Implementation details

RemoteData - helps track data context. There are four options:

-   initial - the data wasn't requested
-   pending - the data was requested
-   success - the data was loaded
-   failure - the data was loaded with an error

Either - helps present data in different states. The states are Left and Right, for example valid data and invalid data.

During development, I focused on working with data, because it is more important to give the user the opportunity to use the application even if it does not look good enough for a while. And also tried to make the application susceptible to expansion. For example, now you can quickly add missing data to the UI, such as pads details, description, and agencies.
