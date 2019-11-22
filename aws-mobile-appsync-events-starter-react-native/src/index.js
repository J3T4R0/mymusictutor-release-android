import { AppRegistry } from 'react-native';
import App from './App';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {listUsers, SearchUsers} from './App';
import registerServiceWorker from './registerServiceWorker';

import AWSAppSyncClient from 'aws-appsync'
import AppSyncConfig from './AppSync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import {Button} from '@99xt/first-born';
import formik, {} from 'formik';
import {Header, Card, CardSection, Button} from '../components/common';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


class MyRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Route path='/' component={MyComponent} />
      </BrowserRouter>
    )
  }
}

class Extensible extends React.Component {
  render () {
    return <Button />
  }
}

class RouterToProfile extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  redirectToTarget = () => {
    this.context.router.history.push(`../src/sreens/profile.js#id`)
  }

  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.redirectToTarget}>Redirect</button>
       </div>   
    )
  }
}

const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey,
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

//starts with a search registry form. 
// results will appear down below up to 5 
// will show profile in top, with the search bar faded out
// Filters to choose from, such as wind, chord, and drum 
// more specific filters at the bottom 


//starts with a search registry form. 
const formElements = [
	{label: "First Name", type: "text", onChangeText: {value} => this.handleTextChange(value), placeholder: 'John'},
	{label: "Last Name", type: "text", onChangeText: {value} => this.handleTextChange(value), placeholder: 'Doe'},
	{label: "Email", type: "text", onChangeText: {value} => this.handleTextChange(value), placeholder: 'example@example.com'},
	{label: "Password", type: "text", onChangeText: {value} => this.handleTextChange(value), placeholder: '1234'},
	{label: "Zip Code", type: "text", onChangeText: {value} => this.handleTextChange(value), placeholder: '1234'},
];


// results will appear down below up to 5 
const listData = [
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
	{title : "Full Name ", description: {content}, image: "../components/images/${id}.png") },
];

const Button = ({onPress, children}) => {
	const {buttonStyle, text} = styles;

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text> style={textStyle}>
			{children}
			</Text>
			</TouchableOpacity>
		)
}

export const formView(
		return(
			<ListView data={listData} /> 
			//list begins here
			// will show profile in top, with the search bar faded out
			<Card title="Full Name" description="content" image={require("../components/images/${id}.png")} /> 
			<Form formElements={ formElements} /> 

			)
	);



//the networking biz to search to the graphql database
export default compose(
  graphql(ListUsers, {
    options: data => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      onSearch: searchQuery => {
        return props.data.fetchMore({
          query: searchQuery === '' ? ListUsers : SearchUsers,
          variables: {
            searchQuery
          },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            ...previousResult,
            listUsers: {
              ...previousResult.listUsers,
              items: fetchMoreResult.listUsers.items
            }
          })
        })
      },
      data: props.data
    })
  })
)(App);

onChange = (e) => {
  const value = e.target.value
  this.handleFilter(value)
}
handleFilter = debounce((val) => {
  this.props.onSearch(val)
}, 250)



ReactDOM.render(

	<WithProvider>
		<App>
			<View style={{flex: 1}}>
				<View style={{flex: 6}}>
					//top frame for more information on the search 
					</View>
						<View styles={{flex: 2, alignSelf: 'stretch'}}>
						//for the search bar

							<Button onPress="() => {
								render() {
									return(
										<Text> 
											{SearchUsers.items.name}
										</Text>
										<Image source={SearchUsers.items.image} onPress="() => {
											render() {
											return (
												<RouterToProfile /> 
											)
										}
										}"> 
									)
							}
							<Text> 
								{SearchUsers.items.content}
							</Text>
							<Input type="text" placeholder="Search for Tutors..." onSubmit="() => {
									console.log("form successfully finished");
									render() {
										return (
										<ListView data={listData} /> 
										//list begins here
										// will show profile in top, with the search bar faded out
										<Card title="Full Name" description="content" image={require("../components/images/${id}.png")} /> 
										<Form formElements={ formElements} /> 
										)
									}
								}">
	 						</input> 

						<Button value="Book A Tutor Session" onTouch="() => {
							console.log("form successfully submitted");
						}">
						</Button>

					</form>

				</View>

				<View styles={{flex: 1, alignSelf: 'stretch'}}> 
					<Image source={}
				</View>

				<View styles={{flex: 1, alignSelf: 'stretch'}}> 

				</View>

				<View styles={{flex: 1, alignSelf: 'stretch'}}> 

				</View>

				<View styles={{flex: 1, alignSelf: 'stretch'}}> 

				</View>


		</App>
`
	</WithProvider>



	, document.getElementById('root');
registerServiceWorker();

const styles = StyleSheet.create( {
		buttonStyle: {
			flex: 1,
			alignSelf: 'stretch',
			backgroundColor: '#fff',
			borderRadius: 5,
			borderWidth: 1,
			borderColor: '#007aff',
			marginLeft: 5,
			marginRight: 5
		},

		textStyle: {
			alignSelf: 'center',
			color: '#007aff',
			fontSize: 16,
			fontWeight: '600',
			paddingTop: 10,
			paddingBottom: 10
		}
	}
	);

AppRegistry.registerComponent('awsappsyncevents', () => App);
