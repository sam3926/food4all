import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Menu, Layout, Card , Tabs } from 'antd';

const { TabPane } = Tabs; 
const { Content,Sider } = Layout;

class Discover extends Component{
   state ={
      Donations:[
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'}
      ],
      Organisations:[
        {title:'Arpit1',description:'Card Content'},
        {title:'Arpit1',description:'Card Content'},
        {title:'Arpit1',description:'Card Content'},
        {title:'Arpit1',description:'Card Content'},
        {title:'Arpit1',description:'Card Content'}
      ],
      Events:[
        {title:'Arpit2',description:'Card Content'},
        {title:'Arpit2',description:'Card Content'},
        {title:'Arpit2',description:'Card Content'},
        {title:'Arpit2',description:'Card Content'},
        {title:'Arpit2',description:'Card Content'}
      ],
      selectedMenuItem: 1,
      setSelectedMenuItem: 1,
    }
   
  render () {

    const { Donations, Organisations, Events ,selectedMenuItem, setSelectedMenuItem } = this.state;

    const DonationList = Donations.length? (
      Donations.map(Donation=>{
        return (
          <Card title={Donation.title} style={{ width: 1000 }}>
            <p>{Donation.description}</p>
          </Card>
        )
      })
    ):(
      <div>No Donations are currently there!</div>
    )
    const OrganisationList = Organisations.length? (
      Organisations.map(Organisation=>{
        return (
          <Card title={Organisation.title} style={{ width: 1000 }}>
            <p>{Organisation.description}</p>
          </Card>
        )
      })
    ):(
      <div>No Organisation are currently there!</div>
    )
    const EventList = Events.length? (
      Events.map(Event=>{
        return (
          <Card title={Event.title} style={{ width: 1000 }}>
            <p>{Event.description}</p>
          </Card>
        )
      })
    ):(
      <div>No Events are currently there!</div>
    )

      //const [selectedMenuItem, setSelectedMenuItem]= this.state;
     
      const componentsSwitch = (key) => {
        switch (key) {
            case '1':
              return (DonationList);
            case '2':
              return (OrganisationList);
           case '3':
              return (EventList);
           default:
               break;
       }
      }

    const click1 = (key) => {
      this.setState(
        {
          selectedMenuItem: key,
        }
      )
    }

    // const Demo = () => (
    //   <Tabs defaultActiveKey="1">
    //     <TabPane tab="Donations" key="1">
    //       <b> List of Nearby Donations </b>
    //       {DonationList}
    //     </TabPane>
    //     <TabPane tab="Nearby Organisations" key="2">
    //       <b> List of nearby Organsations </b>
    //       {OrganisationList}
    //     </TabPane>
    //     <TabPane tab="Nearby Events/Activities" key="3">
    //       <b> List of nearby Events/Activities </b>
    //       {EventList}
    //     </TabPane>
    //   </Tabs>
    // );
      return (
        <Layout>
            <Sider width={300} className="site-layout-background" 
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: '64px',
                }}
              >

                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => 
                  click1(e.key)}
                >
                    <Menu.Item key="1">Donations</Menu.Item>
                    <Menu.Item key="2">Nearby Organisations</Menu.Item>
                    <Menu.Item key="3">Nearby Events/Activities</Menu.Item>
                </Menu>
                
            </Sider>
            <Layout style={{ marginLeft: '300px', marginTop: '64px' }}>
            <Content className="site-layout-background" style={{"margin":"auto"}}>
                      <p>value of selected item {selectedMenuItem} </p>
                      {componentsSwitch(selectedMenuItem)}
            </Content>
        </Layout>
        </Layout>
      )
  }
}

export default Discover;