import React,{ Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';



class ContributeForm extends Component{
    
    state = {
        value:'',
        loading:false,
        errorMessage: ''
    };
    
    
    onSubmit = async (event) =>{
        event.preventDefault();
        const campaignInstance = campaign(this.props.campaignAddress);
       
        this.setState({loading: true, 
                       errorMessage: ''
                    });

        try{
            const accounts = await web3.eth.getAccounts();
            console.log('List of accounts',accounts);
            await campaignInstance.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value,'ether')
            });

            //Refresh the page after updating the contract
            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false, value: ''});



    };

    render(){
        
        return(
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field >
                <label> Amount to Contribute </label>
                <Input
                    label= 'ether' 
                    labelPosition = 'right'
                    value = {this.state.value} 
                    onChange = {event => this.setState({value: event.target.value})} 
                    
                />
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary style={{ marginTop: '10px' }} loading = {this.state.loading}> Contribute </Button>
            </Form.Field>
        </Form>
    );
    }
}

export default ContributeForm;