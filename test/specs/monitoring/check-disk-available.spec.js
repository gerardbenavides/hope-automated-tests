const fs = require('fs');
const GrafanaPage = require('../../pages/external/grafana.page');
const request = require('superagent');
const hook = require('../../helpers/hook-urls')
const hookUrl = hook.MONITORING_TEAMS_HOOK;

let labelProduction = '';
let labelDemo = '';
let labelCI = '';
let valueProduction = '';
let valueDemo = '';
let valueCI = '';

let directory = './reports/logs/disk-space-availability';
let filePath = '';

describe('Check disk space available', () => {

    it('Logs in user', () => {
    browser.url('https://grafana.metrics.netzon.se/login') 
    GrafanaPage.inputEmail.setValue(process.env.GRAFANA_EMAIL);
    GrafanaPage.inputPassword.setValue(process.env.GRAFANA_PASS);
    GrafanaPage.btnLogin.click();
    });

    it('Navigates to dashboard', () => {
    
        GrafanaPage.sideMenuDashboard.click();
        GrafanaPage.sideMenuDashboardManage.click();
        expect(GrafanaPage.titleDashboard).toHaveText('Dashboards');
        GrafanaPage.hopeVM.click();
        });
    
    it('Gets data', () => {
        labelProduction = GrafanaPage.nameProduction.getText();
        labelDemo = GrafanaPage.nameDemo.getText();
        labelCI = GrafanaPage.nameCI.getText();
        
        valueProduction = GrafanaPage.valueProduction.getText();
        valueDemo = GrafanaPage.valueDemo.getText();
        valueCI = GrafanaPage.valueCI.getText();
    });

    it('Logs data', () => {
      mkdirp.sync(directory);  
      filePath = `${directory}/${time}.txt`
      
      fs.writeFile(filePath, 
      `${labelProduction} -- ${valueProduction} \n${labelDemo} -- ${valueDemo} \n${labelCI} -- ${valueCI}`, function(err) {
          if(err) {
              return console.log(err);
          }
      
          console.log("The file was saved!");
      });
    });

    it('Reports data to Microsoft Teams', () => {
      let displayTime = timeUnformatted.format('MMMM Do YYYY, h:mm:ss a');
        

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
                          "name": `${labelProduction}`,
                          "value": `${valueProduction}`,
                        },
                        {
                          "name": `${labelDemo}`,
                          "value": `${valueDemo}`,
                        },
                        {
                          "name": `${labelCI}`,
                          "value": `${valueCI}`,
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
        
    it('Adds buffer to avoid instance where it does not report results to Microsoft Teams', () => {
      browser.pause(1000)
    })
    
});

