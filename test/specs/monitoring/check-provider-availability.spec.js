const LoginPage = require('../../pages/auth/login.page')
const fs = require('fs');
const mkdirp = require('mkdirp');

describe('Check provider availability', () => {
    it('Checks all available providers and logs to file', () => {
        LoginPage.open();
        LoginPage.dropdownProviders.waitForDisplayed();
        LoginPage.dropdownProviders.click();

        let providerCount = $$('//div[@class="dropdown-item clickable flex-cross-center ng-star-inserted"]//span').length;
        let row = 1;
        let providerList = [];

        for (let i = 0; i < providerCount; i++) {
            let provider = $('//div[@class="app-dropdown"]//div[' + row + ']//span');

            providerName = provider.getText();
            row = row + 1;

            providerList.push(providerName);
        }

        console.log(`Provider List: ${providerList}\nProvider count: ${providerCount}`);

        var dir = './reports/logs/provider_availability/'
        mkdirp.sync(dir);

        const env = process.argv.find( arg => {
            return arg.match(/env/)
            // return argument if it matches string `env`
        });
        if (!env) throw new Error('env is not provided');

        fs.writeFile(dir + `${env.split('=')[1]}_${time}.txt`, `Provider List: \n${providerList.join('\n')}\n\nProvider count: ${providerCount}`, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });
});