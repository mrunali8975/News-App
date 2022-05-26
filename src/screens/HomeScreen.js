import React, {useContext} from 'react';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
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

const Homescreen = ({navigation}) => {
  const [news, setNews] = useState([]);
  const url = 'https://saurav.tech/NewsAPI/everything/cnn.json';
  const [name, setName] = useState('');
  const [refreshing, setRefresh] = useState(true);

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
    getData();
  }, []);
  const {height, width} = Dimensions.get('window');
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={{marginTop: 5}}>
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}

        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginBottom:50}}>
            {/* Calling logout method from firebase */}
          <Pressable onPress={() => logout()}>  
           
          <Text style={{height:35,width:'100%',fontSize:15,fontWeight:'800',padding:6,borderRadius:10,borderWidth:2}}>Logout</Text>

          </Pressable>
          <Pressable onPress={()=>navigation.navigate('SeachProduct')}>
            <Text style={{height:35,width:'100%',fontSize:15,fontWeight:'800',padding:7,textAlign:'center',borderRadius:10,borderWidth:2}}>
            Search Data
            </Text>
          </Pressable>
        </View>
        {/* Grid view */}
        <FlatGrid
          itemDimension={130}
          data={news}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
        
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              {/* navigate to mainView screen through navigation prop */}
              <Pressable
                onPress={() =>
                  navigation.navigate('MainView', {
                    img: item.urlToImage,
                    author: item.author,
                    desc: item.description,
                    url: item.url,
                    title: item.title,
                  })
                }>
                <Image
                  source={{
                    uri: item.urlToImage,
                  }}
                  style={{width: width * 0.4, height: height * 0.3}}
                />
                <Text style={styles.titletext}>{item.title}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginVertical: 15,
    marginBottom: 10,
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
    flex:1
  },
});

export default Homescreen;
