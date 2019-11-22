import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDeveloper: false,
			canView: false, 
			viewForm: false
		}
	}
    static navigationOptions = {
        header: null,
    };
        return(
            elem
        )

{ 

        function submitted() {
        let text = document.body.getElementById("id");
        let jsonText = JSON.stringify(text.value); 
        var request = new XMLHttpRequest();
        request.open('POST', 'mymusictutor.com/errors', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(jsonText);
        }

        const experimentalAndroid = {<a href="https://github.com/J3T4R0/mas-release-android.git"> Click here to go to download</a>};
        const experimentalIOS = {<a href="https://github.com/J3T4R0/mas-release-ios.git"> Click here to go to download</a>};
        const releaseAndroid = {<a href="https://github.com/J3T4R0/mas-release-android.git"> Click here to go to download</a>};
        const releaseIOS = {<a href="https://github.com/J3T4R0/mas-release-ios.git"> Click here to go to download</a>};

    
        let onDeveloperAndroid = function() {
                if (this.state.isDeveloper) {
                    return this.link = experimentalAndroid; 
                    this.setState({viewForm: true});
                };
            };

        let onReleaseAndroid = function() {
        if (this.state.canView) {
            return this.link = releaseAndroid;
            this.setState({viewForm: true});
        };
        };

        let onDeveloperIOS = function() {
                if (this.state.isDeveloper) {
                    return this.link = experimentalIOS; 
                    this.setState({viewForm: true});
                };
            };

        let onReleaseIOS = function() {
        if (this.state.canView) {
            return this.link = releaseIOS;
            this.setState({viewForm: true});
        };
        };

        let elements = 
            <React.Fragments>
                <p>
                Welcome to the soft release of My Music Tutor!
                </p>

                <img src="../assets/applogo.jpg" /> 

                <p>
                By clicking the button below, you acknowlege the responsibilities of not copyrighting or sharing code to others. You will be subject to liabilites for tampering with commits, leaking information, or sharing with others. 
                </p>
                <button onclick="onDeveloper"> 
                Click here to receive the developer link
                </button>

                <br />
                <button onclick="onRelease"> 
                Click here to receive the release link
                </button>
                <br />    


                <p>Note: The code is still in beta and is subject to bugs and crashes. Please use responsibly and knowing the risks above. </p>
                <br />

                <img src="https://i.pinimg.com/originals/15/3e/01/153e01a36e99dc76ebc6ff5cd255fd6f.png" />

                <br />
                <p>
                If you receive any errors, please copy and paste any in the form below for the review of developers, as to help prevent them in the future.
                </p>

                <form action="submitted" method="post">
                <input id="input" type="text" required /> 
                <input type="submit" value="Submit" />
                </form>
            </ React.Fragments>
        }

}

export default index
