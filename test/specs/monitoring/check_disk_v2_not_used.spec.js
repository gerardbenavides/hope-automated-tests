const fs = require('fs');
const GrafanaPage = require('../pages/external/grafana.page');
const request = require('superagent');
const hook = require('../helpers/hook-urls');
const hookUrl = hook.MONITORING_TEAMS_HOOK;

let labels = [];
let values = [];

let directory = './reports/logs/disk-space-availability';
let filePath = '';


describe('Check disk space available', () => {

    it.only('Logs in user', () => {
    
    browser.url('https://grafana.metrics.netzon.se/login') 
    GrafanaPage.inputEmail.setValue(process.env.GRAFANA_EMAIL);
    GrafanaPage.inputPassword.setValue(process.env.GRAFANA_PASS);
    GrafanaPage.btnLogin.click();

    });

    it.only('Navigates to dashboard', () => {
    
        GrafanaPage.sideMenuDashboard.click();
        GrafanaPage.sideMenuDashboardManage.click();
        expect(GrafanaPage.titleDashboard).toHaveText("Dashboards");
        GrafanaPage.hopeVM.click();
        expect(GrafanaPage.pageNavBar).toHaveText("HOPE VMs")
        });
    
    it.only('Gets data', () => {
          let count = GrafanaPage.diskCount();
          let iteration = 1;
  
          // Gets and stores labels into 'labels' variable
          for (let index = 0; index < count; index++) {    
            let label = $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div['+ iteration +']/div[1]/div[2]');
            let value = $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div['+ iteration +']/div[1]/div[1]/span[1]');
            
            labels.push(label.getText().replace(",", "<br />"));
            values.push(value.getText().replace(",", "<br />"));

            console.log(labels);
            console.log(values);
            iteration = iteration + 1;
          }
    });

    it('Logs data', () => {


      // checks and creates dir if it does not exist
      mkdirp.sync(directory);  
      filePath = `reports/logs/disk-space-availability/${today}.txt`

      fs.writeFile(filePath, 
      `\n${labels} \n${values} `, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
    });

    it.only('Reports data to Microsoft Teams', () => {

      let displayTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        

        if (hookUrl === undefined) {
          throw new Error('HOOK_URL should be defined as Microsoft teams channel hook url');
        }
        
        request.post(hookUrl)
            .send(
                {
                  "@type": "MessageCard",
                  "@context": "http://schema.org/extensions",
                  "themeColor": "33F0FF",
                  "summary": `Test report`,
                  "sections": [
                    {
    
                      "activityTitle": `## Status check || ${displayTime}`,
                      "facts": [
                        {
                          "name": `${labels}`,
                          "value": `${values}`,
                        },
                      ],
                    },
                  ],
                }, 
            )
            .then( (res) => {
              console.log(`Post results to Microsoft Teams with status: ${res.status}`);
            });
        });
        
    it.only('Adds buffer to avoid instance where it does not report results to Microsoft Teams', () => {
      browser.pause(1000)
    })
    
});

