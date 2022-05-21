import React from 'react';
import {
  StyleSheet, Animated, View,
} from 'react-native';

// Constants
import { images, theme } from '../constants';
// Theme
const { COLORS, SIZES } = theme;
// Dummy data
export const screenInfomations = [
  { // first screen
    title: "Let's Traveling",
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.TravelingImg,
  },
  { // second screen
    title: 'Navigation',
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.NavigationImg,
  },
  { // third screen
    title: 'Destination',
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.DestinationImg,
  },
];

// Probrem start
export default function RendorDots() {
  // Animation
  const swipeX = new Animated.Value(0);
  const dotPosition = Animated.divide(swipeX, SIZES.width);
  return (
    <View style={styles.dotContainer}>
      {
        screenInfomations.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index.id - 1, index.id, index.id + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index.id - 1, index.id, index.id + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index.id}`}
              opacity={opacity}
              style={[styles.dot, {
                width: dotSize,
                height: dotSize,
              }]}
            />
          );
        })
      }
    </View>
  );
} // Probrem End

const styles = StyleSheet.create({
  dotRootContainer: {
    position: 'absolute',
    top: 0,
    bottom: SIZES.height > 700 ? '33%' : '16%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
