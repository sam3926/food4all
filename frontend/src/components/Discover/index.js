import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import './styles.css'
import {connect} from 'react-redux'
import {changeFilters} from './action'
import { bindActionCreators } from 'redux';
import { Modal, Menu, Checkbox , Layout, Card , Button , Input , Space , Image } from 'antd';

const { Content,Sider } = Layout;
const { SubMenu } = Menu;


function success( contact) {
  Modal.success({
    title: 'Donor Notified',
    content: 'You can contact Donor on ' + contact
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
        {title:'Arpit1',description:'Address',description1:'Brief Detail'},
        {title:'Arpit1',description:'Address',description1:'Brief Detail'},
        {title:'Arpit1',description:'Address',description1:'Brief Detail'},
        {title:'Arpit1',description:'Address',description1:'Brief Detail'},
        {title:'Arpit1',description:'Address',description1:'Brief Detail'}
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
    const { Organisations, Events, selectedMenuItem , visible, loading} = this.state;
    const {Donations} = this.props
    console.log(this.props);
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

    const imagelist = (images) => {
      return images.length? (
        images.map(image =>{
          return (
            <Image
                        width={100}
                        height={100}
                        alt="example"
                        src={image}
                        />
          )
        })
        ):(<div> No images!</div>)
    }
    const DonationList = Donations.length? (
      Donations.map(Donation=>{
        return (
          <Card title={Donation.donorName} extra={<p>{Donation.postTime}</p>} style={{ width: 700 }} 
          actions={[
            <p hoverable={true} className="text" onClick={() => success(Donation.contact)} ><b> Contact Donor </b></p>,
            <p hoverable={true} className="text" onClick={this.showModal} ><b> Accept Donation  </b></p>,
          ]}
          >
            <p>{Donation.description}</p>
            <Space>
            {imagelist(Donation.imageurl)}
            </Space>

          </Card>
        )
      })
    ):(
      <div>No Donations are currently there!</div>
    )
      
    const OrganisationList = Organisations.length? (
      Organisations.map(Organisation=>{
        return (
          <Card title={Organisation.title} extra={<p>People fed</p>} style={{ width: 700 }}>
            <p>{Organisation.description}</p>
            <p>{Organisation.description1}</p>
          </Card>
        )
      })
    ):(
      <div>No Organisation are currently there!</div>
    )

    const EventList = Events.length? (
      Events.map(Event=>{
        return (
          <Card title={Event.title} style={{ width: 700 }}>
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
              <Content className="site-layout-background" 
              style={{
                paddingLeft: 120,
                minHeight: 280,
              }}>
                        {componentsSwitch(selectedMenuItem)}
              </Content>
              <Sider width={280} style={{ padding: "20px" }}>

              </Sider>

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
    Donations: state.DiscoverReducer.Donations,
    Organisations: state.DiscoverReducer.Organisations,
    Events: state.DiscoverReducer.Events
  };
  
};
const mapDispatchToProps = dispatch => ({
  changeFilters : bindActionCreators(changeFilters, dispatch)
})

export default connect(mapStatetoProps,mapDispatchToProps)(Discover);