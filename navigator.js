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

export default Navigator = StackNavigator(
  {
    CustomerMenu:{
      screen:CustomerMenu
    },
    Calendar:{
      screen:Calendar,
    },
    AddSchedule:{
      screen:AddSchedule
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
