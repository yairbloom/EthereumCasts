import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    const subject = await campaign.methods.Subject().call();
    const description = await campaign.methods.Description().call();

    return {
      address: props.query.address,
      Peer1: summary[0],
      Peer2: summary[1],
      Subject: subject,
      Description: description,
      balance: summary[2]
    };
  }

  renderCards() {
    const {
      balance,
      Peer1,
      Peer2,
      Subject,
      Description
    } = this.props;

    const items = [
      {
        header: Peer1,
        meta: 'Address of first account',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: Peer2,
        meta: 'Address of secend account',
        description:
          'You must contribute at least this much wei to become an approver',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: Subject,
        meta: 'Summary of this contract',
        description: Description,
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalize().send({
      from: accounts[0]
    });
  };


  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
