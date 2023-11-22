import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';  // To get the status bar height instead of using Platform module, statusBar.currentHeight

function Screens({children, style}) {
    return (
        <SafeAreaView style= {[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,  // To make sure the content doesn't get hidden behind the status bar
        flex: 1
    }
})
export default Screens;