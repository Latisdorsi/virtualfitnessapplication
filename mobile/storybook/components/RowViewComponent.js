import React from 'react'
import { View } from 'react-native'

const RowViewComponent = ({ children }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 15
            }}>

            {children}
        </View>
    )
}

export default RowViewComponent

