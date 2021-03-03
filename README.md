# Automated tests

## Installation
Install dependencies
```
npm i
```
Create a file in the the root folder named ```.env``` and inside the file, input the following and save:
```process.env.GRAFANA_EMAIL=```{grafana account email}
```process.env.GRAFANA_PASS=```{grafana account password}
| Grafana Metrics | [https://grafana.metrics.netzon.se/login][PlDb] |

# Running tests
Run automated desk check and reporting to ```Monitoring``` channel in Microsoft Teams
````
npm run test.check-disks
````
Run Regression Testing in Dev
````
npm run test.regression:dev
````
Run Regression Testing in Staging
````
npm run test.regression:staging
````
Report ```json``` file generated from running tests in ```./reports/json/**```
````
npm run report.teams
````
Clean ```./reports/``` folder
````
npm clean
````