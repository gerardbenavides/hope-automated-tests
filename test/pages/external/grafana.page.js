const Page = require('../page');

class GrafanaPage extends Page {

    get inputEmail() { return $('//input[@placeholder="email or username"]')}
    get inputPassword() { return $('//input[@placeholder="password"]')}
    get btnLogin() { return $('//button[@class="css-6ntnx5-button"]')}
    get titleHome () { return $('//h1[@class="css-jjwbqw"]')}
    get sideMenuDashboard () { return $('//body[@class="theme-dark app-grafana no-overlay-scrollbar is-react page-dashboard"]/grafana-app[@class="grafana-app"]/sidemenu[@class="sidemenu"]/div[@class="sidemenu__top"]/div[3]/a[1]')}
    get sideMenuDashboardManage () { return $('//a[contains(text(),"Manage")]')}
    get titleDashboard () { return $('//h1[@class="page-header__title"]')}
    get hopeVM () { return $('//div[@class="main-view"]//div[6]//span[contains(text(),"HOPE VMs")]')}
    get pageNavBar () { return $('//div[@class="navbar-page-btn"]')}

    get nameProduction () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]')}
    get valueProduction () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]//span')}
    get nameDemo () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]')}
    get valueDemo () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]//span')}
    get nameCI () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[2]')}
    get valueCI () { return $('/html[1]/body[1]/grafana-app[1]/div[1]/div[1]/react-container[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]//span')}

    diskCount() {
        let content = $$('//div[@class="panel-content"]//div[@style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; overflow: hidden;"]');
        return content.length;
    }
}

module.exports = new GrafanaPage();
