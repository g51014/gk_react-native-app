/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Calendar from './Calendar/Calendar';
import AddSchedule from './Calendar/AddSchedule';
import CustomerMenu from './Calendar/customerMenu';
import ReportResult from './Calendar/reportResult';
// import SearchScreen from './Calendar/SearchScreen';

export default Navigator = StackNavigator(
  {
    Calendar:{
      screen:Calendar,
    },
    AddSchedule:{
      screen:AddSchedule
    },
    CustomerMenu:{
      screen:CustomerMenu
    },
    ReportResult:{
      screen:ReportResult
    },
    // SearchScreen:{
    //   screen:SearchScreen
    // },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
