import AsyncStorage from '@react-native-community/async-storage';

const DeviceStorage = {
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async loadItem(key) {
        let value = await AsyncStorage.getItem(key)
        return value

    },
    async deleteItem(key) {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};

export default DeviceStorage;