import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, GridColumn, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes'


class CamapignShow extends Component{

    state = {
        loading:false
    }

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        console.log(summary);

        return {
                campaignAddress:props.query.address,
                minimuContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                approversCount: summary[3],
                manager: summary[4]
            };
    };


    renderCards = () =>{
        const{
            minimuContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta:'Address of Manager',
                description: 'Only manager can create requests for this campaign',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: minimuContribution,
                meta:'Minimum contribution(wei)',
                description: 'Must contribute this much to become a approver',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: requestsCount,
                meta:'Number of requests',
                description: 'Total number of requests created by manager',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: approversCount,
                meta:'Number of Approvers of a request',
                description: 'Number of people who already contributed to this campaign',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta:'Balance of this Campaign(ether)',
                description: 'Total balance of this contract in ether',
                style: {overflowWrap: 'break-word'}

            }
        ];

        return (<Card.Group items={items}/>)

    };

    renderRequests(){

    };

    render(){
        const campaignAddress = this.props.campaignAddress;
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm campaignAddress={campaignAddress} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${campaignAddress}/requests`}>          
                                <a>
                                    <Button
                                        primary
                                        content = 'View Request' 
                                    />
                                </a>
                            </Link>
                        </ Grid.Column>
                    </ Grid.Row>
                </Grid>
            </ Layout>
        ); 
    }
}

export default CamapignShow;