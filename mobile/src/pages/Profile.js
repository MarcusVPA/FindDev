import React from 'react';
import { WebView } from 'react-native-webview';

function Profile({ navigation }){

    const githubUsername = navigation.getParam('github_username'); // pega o parametro pela "rota" navigation
    return <WebView style={{flex: 1}} source={{ uri: `https://github.com/${githubUsername}`}} />
}

export default Profile;