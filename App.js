/* eslint-disable react/no-unstable-nested-components */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

// import {SliderBox} from 'react-native-image-slider-box';
// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-snap-carousel';

// import axios from 'axios';
// eslint-disable-next-line import/named
import {getPopularMovies} from './services/services';
import MainNavigation from './components/MainNavigation';
// import {getUpcomingMovies} from './services/services';

const App = () => {
  const images = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
