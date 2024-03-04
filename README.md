# PirelliChallenge

## Introduction:
This challenge involves developing a telemetry data monitoring and analysis system for sensor prototypes installed in car tires. The system comprises a backend to simulate data streaming, perform basic filtering, and preprocess the data, along with a frontend to visualize real-time telemetry data for different cars.

## Backend Implementation:
For the backend, we'll use .NET to develop an API with support for RESTful endpoints and SignalR for real-time data streaming. The backend will simulate data streaming ordered by timestamp, ensuring positive values for pressure and angular speed. Filtering by car will be implemented to handle requests for specific cars or subsets.

#### Data Persistence:
Considering the nature of real-time data streaming and the need for efficient querying and filtering, a NoSQL database like MongoDB would be a suitable choice. MongoDB's document-oriented structure allows for flexible schema design, scalability, and fast data retrieval. Each document can represent a telemetry record, indexed by timestamp, with embedded data for pressure, temperature, angular speed, and speed.

#### Limitations:
- While NoSQL databases offer scalability, handling millions of telemetry records may require careful consideration of database sharding and indexing strategies to maintain performance.
- Real-time streaming and data processing might strain server resources, requiring optimization of backend code and server infrastructure.
- SignalR may introduce additional complexity, especially in handling large volumes of concurrent connections.

## Frontend Implementation:
The frontend will be developed using Angular 17 and Angular Material for UI components. It will consume the real-time data stream from the backend and visualize telemetry data for each car. Different levels of aggregation will be implemented to convey meaningful trends in measurements.
The use of Angular Material components ensures a clean and intuitive interface, enabling seamless interaction and data analysis.

#### User Experience (UX):
The frontend UI prioritizes delivering a user-friendly dashboard with intuitive controls for selecting cars and viewing different levels of data aggregation. Real-time updates and visualizations enhance the user experience, empowering engineers to effectively monitor sensor data.

An input select has been implemented for the selection of a car or its subset. After the selection, a tab-group is displayed with two tabs.

The first tab ("All Info") presents a comprehensive table with all measurements updated in real-time. This table not only allows users to visualize the data dynamically but also provides the functionality to sort values. Engineers can easily arrange the data by timestamp, pressure, temperature, angular velocity, and speed, facilitating a more detailed analysis. Additionally, the tab enables aggregation of values to display statistics such as average, maximum, or minimum for each measurement.

The second tab ("Latest Values") offers a unique perspective, presenting a separate table for each tire.
In this tab, only real-time values are showcased, providing a more focused view of the most recent data for each individual tire.

To enrich the user experience further, a theme-changing feature has been developed, allowing users to select from four different themes: two light themes and two dark themes. This enables users to customize the appearance of the entire application according to their preferences, enhancing accessibility and personalization.

## Conclusion:
This solution leverages modern technologies like .NET, Angular, and MongoDB to develop a robust telemetry data monitoring system. By addressing scalability concerns and focusing on user experience, the solution provides an effective tool for analyzing sensor data from car tires in real-time.

<br/>
<br/>

# Installation and Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Dependencies

Run `npm install` to install dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
