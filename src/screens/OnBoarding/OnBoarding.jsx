import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, SafeAreaView, Animated, View, Image, TouchableOpacity,
} from 'react-native';
// モジュールに分ける場合
// import RendorDots, { screenInfomations } from '../../components/dot';

// Constants
import { images, theme } from '../../constants';

// Theme
const { COLORS, FONTS, SIZES } = theme;
// Dummy data
const screenInfomations = [
  { // first screen
    id: 0,
    title: "Let's Traveling",
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.TravelingImg,
  },
  { // second screen
    id: 1,
    title: 'Navigation',
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.NavigationImg,
  },
  { // third screen
    id: 2,
    title: 'Destination',
    description: '« Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam »',
    img: images.DestinationImg,
  },
];
export default function OnBoarding() {
  // hooks
  const [completed, setCompleted] = useState(false);
  // Animation
  const swipeX = new Animated.Value(0);
  useEffect(() => {
    // TO check if user has finished swiping the onBoarding screen
    swipeX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === screenInfomations.length - 1) {
        setCompleted(true);
      }
    });
    return () => {
      swipeX.removeListener();
    };
  }, []);
  // Rendor
  function rendorContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false} // 下線部のcarousel navigationを無効化する
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: swipeX,
              },
            },
          },
        ], { useNativeDriver: false })}
      >
        { screenInfomations.map((item) => (
          // (a, b) => { return (value); } == (a, b) => ( value )
          <View key={item.id} style={styles.imageContainer}>
            {/* Image */}
            <View style={styles.imageInner}>
              <Image
                source={item.img}
                resizemode="cover"
                style={styles.imageCover}
              />
            </View>
            {/* Text */}
            <View style={styles.txtContainer}>
              <Text style={styles.txtTitle}>{item.title}</Text>
              <Text style={styles.txtBody}>{item.description}</Text>
            </View>
            {/* Button */}
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => console.log('ボタンが押されました')}
            >
              <Text style={styles.txtColor}>{ completed ? "Let's Go!" : 'Skip'}</Text>
            </TouchableOpacity>
          </View>
        )) }
      </Animated.ScrollView>
    );
  }

  function rendorDots() {
    const dotPosition = Animated.divide(swipeX, SIZES.width);
    return (
      <View style={styles.dotContainer}>
        { screenInfomations.map((item) => {
          const opacity = dotPosition.interpolate({
            inputRange: [item.id - 1, item.id, item.id + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          // console.log(dotPosition);
          const dotSize = dotPosition.interpolate({
            inputRange: [item.id - 1, item.id, item.id + 1],
            outputRange: [SIZES.base, SIZES.dotIsActive, SIZES.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={item.id}
              opacity={opacity}
              style={[styles.dot, {
                width: dotSize,
                height: dotSize,
              }]}
            />
          );
        }) }
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {rendorContent()}
      </View>
      <View style={styles.dotRootContainer}>
        {rendorDots()}
        {/* <RendorDots /> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: SIZES.width,
  },
  imageInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCover: {
    width: '100%',
    height: '100%',
  },
  dotRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '36%' : '16%',
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
  txtContainer: {
    position: 'absolute',
    bottom: '10%',
    right: 40,
    left: 40,
  },
  txtTitle: {
    ...FONTS.h1,
    color: COLORS.gray,
    textAlign: 'center',
  },
  txtBody: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.base,
  },
  txtColor: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  btnContainer: {
    // padding: SIZES.dotIsActive, これだけで、上下中央揃いになる
    width: 160,
    height: 60,
    backgroundColor: COLORS.blue,
    position: 'absolute',
    bottom: 0,
    right: 0,
    // paddingLeft: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
