import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card , Tabs } from 'antd';

const { TabPane } = Tabs; 
const { Content } = Layout;

class Discover extends Component{
   state ={
      Donations:[
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'},
          {title:'Arpit',description:'Card Content'}
      ],
      Organisations:[
        {title:'Arpit',description:'Card Content'},
        {title:'Arpit',description:'Card Content'},
        {title:'Arpit',description:'Card Content'}
      ],
      Events:[
        {title:'Arpit',description:'Card Content'},
        {title:'Arpit',description:'Card Content'},
        {title:'Arpit',description:'Card Content'}
      ]
   }
  render () {
    const { Donations, Organisations, Events } = this.state;

    const DonationList = Donations.length? (
      Donations.map(Donation=>{
        return (
          <Card title={Donation.title} style={{ width: 500 }}>
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
          <Card title={Organisation.title} style={{ width: 500 }}>
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
          <Card title={Event.title} style={{ width: 500 }}>
            <p>{Event.description}</p>
          </Card>
        )
      })
    ):(
      <div>No Events are currently there!</div>
    )

    const Demo = () => (
      <Tabs defaultActiveKey="1" tabPosition={"left"}>
        <TabPane tab="Donations" key="1">
          <b> List of Nearby Donations </b>
          {DonationList}
        </TabPane>
        <TabPane tab="Nearby Organisations" key="2">
          <b> List of nearby Organsations </b>
          {OrganisationList}
        </TabPane>
        <TabPane tab="Nearby Events/Activities" key="3">
          <b> List of nearby Events/Activities </b>
          {EventList}
        </TabPane>
      </Tabs>
    );
      return (
        <Layout className="layout">
            <Layout style={{ padding: '0 24px 24px' }}>
            <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 70,
                  minHeight: 280,
                }}
              >
                <Demo />
              </Content>
        </Layout>
        </Layout>
      )
  }
}

export default Discover;