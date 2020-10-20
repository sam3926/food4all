import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import './styles.css'
import {connect} from 'react-redux'
import {changeFilters} from './action'
import { bindActionCreators } from 'redux';
import { Modal, Menu, Checkbox , Layout, Card , Button , Input } from 'antd';

const { Content,Sider } = Layout;
const { SubMenu } = Menu;

const ContactNo = [
  {
    No: '000000',
  }
]

function success() {
  Modal.success({
    title: 'Donor Notified',
    content: 'You can contact Donor -Contact No-'
  });
}

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
      selectedMenuItem:'1',
      loading: false,
      visible: false,
    }
  
    showModal = () => {
      this.setState({
        visible: true
      });
    };
  
    handleOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 1000);
      Modal.success({
        content: "Donation Shared on profile"
      });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };
  


   
  render () {

    const { Donations, Organisations, Events, selectedMenuItem , visible, loading} = this.state;

    const plainOptions = [
      { label: 'Location', value: 'Location' },
      { label: 'Expiry Date', value: 'Expiry Date' },
      { label: 'Time', value: 'Time' },
    ];
    const onChange = (checkedValues) =>{
      this.props.changeFilters(checkedValues)
      //console.log(this.props)
      //console.log('checked = ', checkedValues);
    }


    const DonationList = Donations.length? (
      Donations.map(Donation=>{
        return (
          <Card title={Donation.title} style={{ width: 1000 }} 
          actions={[
            <p hoverable={true} className="text" onClick={success} ><b> Contact Donor </b></p>,
            <p hoverable={true} className="text" onClick={this.showModal} ><b> Accept Donation  </b></p>,
          ]}
          >
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
                defaultOpenKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => onclick(e.key)} >

                <SubMenu key="1" title="Donations" style={{fontSize: '16px'}}>
                    <div style={{"padding":"auto"}}>
                        <Checkbox.Group options={plainOptions} onChange={onChange} />
                    </div>
                </SubMenu>
                <Menu.Item key="2">Nearby Organisations</Menu.Item>
                <Menu.Item key="3">Nearby Events/Activities</Menu.Item>
            </Menu>    
            </Sider>

            <Layout style={{ marginLeft: '300px', marginTop: '64px' }}>
              <Content className="site-layout-background" style={{"margin":"auto"}}>
                        {componentsSwitch(selectedMenuItem)}
              </Content>
            </Layout>
                
          <Modal
            visible={visible}
            title="Accept Donation"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
              Say Thanks
              </Button>,
              <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
              >
              Share Donation
              </Button>
              ]}
              >
              <b> Enter No of people will be fed from this donation ?</b>
              <Input placeholder="Input Number Here" />
              <b> Rate the User</b>
              <Input placeholder="Rate Between 1 to 5" />  
          </Modal>


        </Layout>
      )
  }
}


const mapStatetoProps = state => {
  return {
  };
  
};
const mapDispatchToProps = dispatch => ({
  changeFilters : bindActionCreators(changeFilters, dispatch)
})

export default connect(mapStatetoProps,mapDispatchToProps)(Discover);