/*
My Music Tutor (backend)
Made by Ryan Niemi
Date: 7/02/19
Description:
 The main app where the chat box is displayed, allowing messages to be sent. Additionally, sign up and log in is offered to validate users
*/


import React from "react";
import { Switch, Route } from "react-router-dom";
import { Meta, Nav } from "components";
import { StateProvider } from "containers";
import { Chat, Home, Login, Post, Signup } from "pages";
import "./App.css";
import {Text, View, StyleSheet, BackgroundImage, Image};


const App = (props) => {
  return (
    <View> 
    <BackgroundImage source={}> 

      <StateProvider {...props}>
        <Meta />
        <Nav />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/chat/:id?" component={Chat} />
          <Route component={Home} />
        </Switch>
      </StateProvider>

    </BackgroundImage> 
    </View>
  );


const ChatBox = ({ message, currentUser}) => (
    <View styles={{styles.wrapper}}>
    <View styles={{styles.message}}>

    <Text>
      {message.from}
     </Text>

     <Text styles={{styles.message}}>
      {message.content}
     </Text>
    </View>
    </View>

  );

  }

  let styles = StyleSheet.create(

    const body = {
      flex: 4,
      justify-content: center,
      position: vertical,
    },

    const components = {
      flex: 1,
      background-color: f5f4f5,
    },

    const Text = {
      !!currentUser ? {...styles.author, color: '#5887a7'} : styles.author
    }

  );


export default Chatbox;
export default App;
