import { AppRegistry, Platform } from 'react-native'
import App from './App'

console.info(
    `当前平台： ${Platform.OS}
    当前系统版本： ${Platform.Version}`
)

// var lastBackPressTime = Date.now()

// BackHandler.addEventListener('hardwareBackPress', function () {
//     if (history.action) {
//         history.goBack()
//         return true
//     }
//     if (lastBackPressTime && lastBackPressTime + 2000 >= Date.now()) {
//         return false
//     }
//     lastBackPressTime = Date.now()
//     ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
//     return true

// })

AppRegistry.registerComponent('ent', () => App)