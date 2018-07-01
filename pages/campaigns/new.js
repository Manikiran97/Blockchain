import React, { Component } from 'react'
import { Form, Button, Input, Message, Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

//Link is a React component that allows us to render anchor tags
//Router navigates programatically from one page to another
import { Link, Router } from '../../routes';



class CampaignNew extends Component{

    state = {
        minimumContribution:'',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        //set State for spinner
        this.setState({loading: true, errorMessage: ''});

        try{
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0],
                gas: 5000000 
        });

        Router.pushRoute('/');
      }catch(err){
        this.setState({errorMessage: err.message});
      }

      this.setState({loading: false});
    }
   
    render(){
      return(
        <Layout>
        <h3>Create Campaign</h3>
        
        <Form onSubmit= {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
            label='wei' 
            labelPosition= 'right'
            placeholder='Minimum Contribution' 
            value = {this.state.minimumContribution}
            onChange = {event => this.setState({minimumContribution: event.target.value})}
            />
          </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading = {this.state.loading}> Create!</Button>
        </Form>
        
        </Layout>
      );
    }
}

export default CampaignNew;