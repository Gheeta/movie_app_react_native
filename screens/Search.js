/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.containerInput}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder="Search Movie or TV Show"
              value={text}
              placeholderTextColor="gray"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
              // navigation props to get back pervious
            }}>
            <Icon name="search" size={40} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* search items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {/* when searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>No results matching your word u write</Text>
              <Text>try different keyword</Text>
            </View>
          )}
          {/* when nothing is searched  */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text >type something to start searching </Text>
            </View>
          )}
          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Search;

const styles = StyleSheet.create({
  containerInput: {
    paddingTop: 80,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  input: {
    borderRadius: 15,
    height: 50,
    padding: 8,
    borderWidth: 1,
    color: 'black',
  },
  searchItems: {
    padding: 5,
  },
  empty: {
    color: 'gray',
  },
});
