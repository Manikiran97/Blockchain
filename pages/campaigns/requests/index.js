import React, { Component } from 'react';
import { Button, Table, TableHeader } from 'semantic-ui-react';
import { Link } from '../../../routes'
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

 
class RequestIndex extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const approversCount = await campaign.methods.approversCount().call();

        const requestCount = await campaign.methods.getRequestsCount().call();
        //Rather than calling the campaign one by one we can batch all the calls and call the contract method
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return (
            {
              campaignAddress: props.query.address,
              requests: requests,
              campaign: campaign,
              approversCount:approversCount
            }
        );
    }

    renderRequestRows(){
        const requests = this.props.requests;
       
        console.log(requests);
            return(
                requests.map((request, index) => {
                 return(
                    <RequestRow 
                        key = {index} 
                        request = {request} 
                        index = {index} 
                        campaignAddress = {this.props.campaignAddress}
                        approversCount = {this.props.approversCount}/>
                    )
                })
            );
    }
 
    render(){
        const campaignAddress = this.props.campaignAddress;
        
        return(
           <Layout>
            <Link route={`/campaigns/${campaignAddress}/newrequest`}>
            <a>
           <Button 
                primary
                content = 'Add Request'
           />   
           </a>
           </Link>

             <Table celled fixed singleLine>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Recepient</Table.HeaderCell>
                    <Table.HeaderCell>Approval Count</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Finalize</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderRequestRows()}
                </Table.Body>
             </Table>

           </ Layout>
        );
}
}

export default RequestIndex;