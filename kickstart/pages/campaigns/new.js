import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    PeerAdress: '',
    Subject: '',
    Description: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log( accounts)
      await factory.methods
        .createCampaign(this.state.PeerAdress , this.state.Subject , this.state.Description)
        .send({
          from: accounts[0]
        });
      console.log(accounts[0])

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Peer Acount</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.PeerAdress}
              onChange={event =>
                this.setState({ PeerAdress: event.target.value })}
            />
            <label>Subject</label>
            <Input
              value={this.state.Subject}
              onChange={event =>
                this.setState({ Subject: event.target.value })}
            />

            <label>Description</label>
            <Input
              value={this.state.Description}
              onChange={event =>
                this.setState({ Description: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
