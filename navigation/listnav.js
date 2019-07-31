import {createStackNavigator, createAppContainer} from 'react-navigation'
import {TrendingList} from '../screens/trending_list'
import {TrendingDetail} from '../screens/trending_detail'
const ListNav = createStackNavigator({
    TrendingList: { 
        screen: TrendingList,
        navigationOptions: ({navigation})=>({
            title:'Trending Repos',
            headerTitleStyle: {color: '#008081'}
        })
    },
    TrendingDetail: {
        screen: TrendingDetail,
        navigationOptions: ({navigation}) =>({
            title: `${navigation.getParam('repo', 'Repo')}`,
            headerTitleStyle: {color: '#008081'}
        })
    }
})

export const AppNav = createAppContainer(ListNav)