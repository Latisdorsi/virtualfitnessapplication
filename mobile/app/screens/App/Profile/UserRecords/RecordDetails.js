import React from 'react'
import RowViewComponent from 'lib/components/RowViewComponent'
import { View, Text } from 'react-native'

const RecordDetails = ({ value }) => {
    return (
        <View>
            {

                Object.keys(value).map(function (key, index) {
                    return (
                        <RowViewComponent key={index}>
                            <Text
                                style={{ fontSize: 16 }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Text>
                            {value[key] > 0 ?
                                <Text>{value[key]}</Text>
                                :
                                <Text>Not Set</Text>
                            }
                        </RowViewComponent>
                    )
                })

            }
        </View>
    )
}

export default RecordDetails