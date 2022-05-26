import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';

import axios from 'axios';

const SeachProduct = () => {
  var url = 'https://api.dotshowroom.in/api/dotk/catalog/searchItems';
  const [data, setapiData] = useState([]);

  // post method

  const handleChange = value => {
    axios
      .post(url, {
        page: 1,
        store_id: 2490120,
        search_text: value,
      })
      .then(data => {
        setapiData(data.data);

        console.log(data, 'dadads');
      });
  };
 
  return (
    <View style={pagestyle.container}>
      <Text style={pagestyle.heading}>SearchProduct</Text>
      <TextInput
        style={pagestyle.usertext}
        placeholder="search product name....."
        onChangeText={value => handleChange(value)}
      />
      <View>
{/* list of searching product */}

        {data?.items?.map(item => {
          return (
            <>
              <Text style={pagestyle.apidata}>{item.name} </Text>
              {/* <Image
                style={pagestyle.itemimage}
                source={{uri: item?.image_url}}
              /> */}
              {/* <View style={pagestyle.priceWrap}>
                <Text style={pagestyle.dprice}>
                  {item?.discounted_price} INR{' '}
                </Text>
              </View> */}
            </>
          );
        })}
      </View>
    </View>
  );
};

const pagestyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  apidata: {
    textAlign: 'center',
    fontSize: 23,
    color: 'black',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#309286',
    marginTop: 30,
    marginBottom: 20,
  },

  usertext: {
    height: 50,
    width: 380,

    marginBottom: 20,
    borderWidth: 5,
    padding: 5,
    color: 'black',
    fontSize: 25,
    fontFamily: 'Cochin',
    textAlign: 'center',
    borderRadius: 30,
    borderColor: 'green',
  },
});

export default SeachProduct;
