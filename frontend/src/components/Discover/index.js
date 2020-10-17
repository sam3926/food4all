import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Menu, Layout, Card } from 'antd';

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
      selectedMenuItem:'1'
    }
   
  render () {

    const { Donations, Organisations, Events, selectedMenuItem } = this.state;

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

    const componentsSwitch = (key) => {
      switch (key) {
          case '1':
            return (DonationList);
          case '2':
            return (OrganisationList);
          case '3':
            return (EventList);
          default:
              return (DonationList);
      }
    }

    const onclick = (key) => {
      this.setState(
        {
          selectedMenuItem: key,
        }
      )
    }
      return (
        <Layout>
            <Sider width={300} className="site-layout-background" 
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: '64px',
                }} >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => onclick(e.key)} >

                <Menu.Item key="1">Donations</Menu.Item>
                <Menu.Item key="2">Nearby Organisations</Menu.Item>
                <Menu.Item key="3">Nearby Events/Activities</Menu.Item>
            </Menu>    
            </Sider>

            <Layout style={{ marginLeft: '300px', marginTop: '64px' }}>
              <Content className="site-layout-background" style={{"margin":"auto"}}>
                        {componentsSwitch(selectedMenuItem)}
              </Content>
            </Layout>
        </Layout>
      )
  }
}

export default Discover;