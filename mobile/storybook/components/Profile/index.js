import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { createAppContainer } from 'react-navigation'

import Route from './Route'
export { default as UserProfile } from './UserProfile'
export { default as UserRecords } from './UserRecords'

export default function Profile({ children }) {
    return <Route />
    
}