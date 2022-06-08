import React, {useContext} from 'react';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import Loading from '../../components/loading';
import {AiOutlineLogout} from 'react-icons/ai';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {FlatGrid} from 'react-native-super-grid';
import {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {setLocale} from 'yup';
import Imagepicker from './imagepicker';
import SeachProduct from './SeachProduct';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
//
const RECORDS_PER_PAGE = 4;

const Homescreen = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [pageCurrent, setpageCurrent] = useState(1);
  const {height, width} = Dimensions.get('window');

  const [refreshing, setRefresh] = useState(true);
  //  const Drawer= createDrawerNavigator();

  // const url = 'https://saurav.tech/NewsAPI/everything/cnn.json';
  // const url = ' https://newsapi.org/v2/top-headlines?country=us&apiKey=93988075ae1e45f1b8600f705c798e83';

  const [isLoading, setisLoading] = useState(false);

  const getnewsData = async () => {
    await fetch(
      'http://newsapi.org/v2/everything?q=Apple&apiKey=93988075ae1e45f1b8600f705c798e83&page=' +
        pageCurrent,
    )
      .then(response => response.json())
      .then(resjson => {
        setNews(resjson.articles);
        // console.log('json => ', news.description)
        setisLoading(false);
      })
      .catch(e => {
        console.error(e);
      });
  };

  // api calling
  const getData = async () => {
    let isMounted = true; // note mutable flag

    const res = await axios.get(url).then(data => {
      if (isMounted) setNews(data.data.articles);
      setRefresh(false); // add conditional check
    });
    return () => {
      isMounted = false;
    };
  };

  // mount the data
  useEffect(() => {
    let abortController = new AbortController();

    try {
      setisLoading(true);
      getnewsData();
    } catch (error) {
      console.log('useeffect', error);
    }
    return () => {
      abortController.abort();
    };
  }, [pageCurrent]);

  const handleLoadMore = () => {
    if (pageCurrent + 1 <= news.length / RECORDS_PER_PAGE) {
      setpageCurrent(pageCurrent => pageCurrent + 1);
      setisLoading(true);
      console.log('pageCurrent', pageCurrent);
    }
  };
  const renderFooter = () => {
    return isLoading ? null : (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  const iconButton = () => {
    alert('hello facebook button');
  };

  const RenderItem = ({item}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Image
          source={{
            uri: item.urlToImage,
          }}
          style={{width: width * 0.4, height: height * 0.2}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.titletext}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{marginBottom: 10}}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          data={news}
          renderItem={RenderItem}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginVertical: 15,
    // marginBottom: 10,
    marginHorizontal: 15,
  },
  titleimage: {
    height: 100,
    width: 200,
  },
  titletext: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },

  heading: {
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    marginTop: 15,
    width: '50%',
    height: 50,
    flex: 1,
  },
});

export default Homescreen;
