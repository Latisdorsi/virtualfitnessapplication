import AsyncStorage from '@react-native-community/async-storage';

const DeviceStorage = {
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async loadToken() {
        const value = await AsyncStorage.getItem('token')
        return value
    },

    async deleteToken() {
        try {
            await AsyncStorage.removeItem('token')
                .then(
                    () => {
                        this.setState({
                            jwt: ''
                        })
                    }
                );
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};

export default DeviceStorage;