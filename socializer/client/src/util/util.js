import react from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';

this.props.verifyRequestedToken(token)
	.then(({data: {verifyRequestedToken: {authToken}}}) => {
		localStorage.setItem("authToken", authToken);
	})

networkInterface.use([{
	applyMiddleware(req, next) {
		let authToken = localStorage.getItem("authToken");

		if authToken {
			req.options.headers = _.extend(req.options.headers, {
				authorization: 	`Bearer ${authToken}`
			});
		}
		next();
	}	
}])


networkInterface.useAfter([{
    applyAfterware({ response }, next) {
        if (response.status === 403) {
            localStorage.removeItem("authToken");
        }
        next();
    }
}]);


client.query({
    query: gql`
        query {
            user {
                id
            }
        }
    `,
     fetchPolicy: "network-only"
});


this.props.signOut()
    .then(() => localStorage.removeItem("jwt"))
    ...
    .catch((err) => {
        let errors = _.isEmpty(err.graphQLErrors)
                   ? ["Unexpected error."]
                   : _.map(err.graphQLErrors, "message");
        this.setState({ errors });
    });