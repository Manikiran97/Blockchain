import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign'


class RequestRow extends Component{

    state ={
        loading: false,
        errorMessage:''

    }

 
     finalize = async (event) => {
        event.preventDefault();
       
        try{
           
        const campaign = Campaign(this.props.campaignAddress);
       
        const accounts = await web3.eth.getAccounts();
        this.setState({loading:true});
        await campaign.methods.finalizeRequest(this.props.index)
                              .send({
                                 from: accounts[0]
                               });;
        }catch(err){
            this.setState({errorMessage:err});
        }
        this.setState({loading:false, errorMessage:''});
    }

    approve = async (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        try{
        await campaign.methods.approveRequest(this.props.index)
                              .send({
                                  from: accounts[0]
                              });
        }catch(err){
            this.setState({errorMessage:err});
        }
        this.setState({loading:false, errorMessage:''});
    }

    

    render(){
        const request = this.props.request;
        
        return(
            
            <Table.Row>
                <Table.Cell>{this.props.index+1}</Table.Cell>
                <Table.Cell>{request. description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(request.value,'ether')}</Table.Cell>
                <Table.Cell>{request.receipient}</Table.Cell>                                   
                <Table.Cell>{request.approvalCount}/{this.props.approversCount}</Table.Cell>
                <Table.Cell>
                        <Button 
                        content = 'Approve'
                        basic 
                        color = 'green'
                        onClick = {this.approve}
                        />
                    
                 </Table.Cell>
                <Table.Cell>
                        <Button 
                        content = 'Finalize'
                        basic
                        color = 'green'
                        onClick = {this.finalize}/>
                </Table.Cell>
            </Table.Row>
            
        );

        
    }
}

export default RequestRow;