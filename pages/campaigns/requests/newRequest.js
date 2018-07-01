import React, { Component } from 'react';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component{

    state ={
        description:'',
        value:0,
        recepient:'',
        errorMessage:'',
        loading: false
    }

    static async getInitialProps(props){
       
        return (
            {
              campaignAddress: props.query.address,
              
            }
        );
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaignInstance = Campaign(this.props.campaignAddress);
        this.setState({loading: true, errorMessage:''});
        console.log('In submit of create request');
        try{
            const accounts = await web3.eth.getAccounts();
            await campaignInstance.methods.createRequest(
                this.state.description, web3.utils.toWei(this.state.value,'ether'), this.state.recepient
            ).send({ from:accounts[0] });
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render(){
        return(
        <Layout>
            <h3>Create a Request</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field >
                <label> Description </label>
                <Input
                    value = {this.state.description} 
                    onChange = {event => this.setState({description: event.target.value})}   
                />
                <label> Amount in Ether </label>
                <Input
                    label= 'ether' 
                    labelPosition = 'right'
                    value = {this.state.value} 
                    onChange = {event => this.setState({value: event.target.value})} 
                />
                <label> Recepient </label>
                <Input
                    value = {this.state.recepient} 
                    onChange = {event => this.setState({recepient: event.target.value})}   
                />


                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary style={{ marginTop: '10px' }} loading={this.state.loading}> 
                    Create 
                </Button>
            </Form.Field>
            </Form>     
        </ Layout>
        );
    }

}

export default RequestNew;