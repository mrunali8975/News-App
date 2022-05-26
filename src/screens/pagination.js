import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import React from 'react';
import {useState} from 'react/cjs/react.production.min';

const Pagination = () => {
  const [loading, setLoading] = useState(true);
  const [randomeuserData, setData] = useState([]);
  const [loadingExtraData, setloadingExtraData] = useState(false);
  page = '1';

  useEffect(() => {
    LoadRandomData();
  }, []);

  renderCustomItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>{item.gender}</Text>
        <Text>
          {item.name['first']} {item.name['last']}
        </Text>
        <Image
          source={{uri: item.picture['medium']}}
          style={{width: 200, height: 200}}
        />
      </View>
    );
  };

  const LoadRandomData = async () => {
    await fetch(`https://randomuser.me/api/?results=10&page= ${page}`)
      .then(response => response.json())
      .then(responseJson => {
        randomeuserData: page === 1
          ? responseJson.results
          : [...randomeuserData, ...responseJson.results];
      })
      .catch(error => {
        console.log('Error selecting random data: ' + error);
      });
  };

  return (
    <View>
      <FlatList
        data={randomeuserData}
        renderItem={renderCustomItem}
        style={{width: 350, height: 800}}
      />
    </View>
  );
};

export default Pagination;
