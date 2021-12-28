import React, {useRef, useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Recaptcha from 'rn-recaptcha3';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.lighter,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const App = () => {
  const size = 'normal';
  const [key, setKey] = useState('<none>');
  const [captchaVisibility, setCaptchaVisibility] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <Button onPress={()=>{
            setCaptchaVisibility(true);
          }} title="Open" />
          <Text>Token: {key}</Text>
          <Text>Size: {size}</Text>
        </View>

        <Recaptcha
          visible={captchaVisibility}
          lang="en"
          siteKey=""
          baseUrl="http://127.0.0.1"
          onClose={() => {
            setCaptchaVisibility(false);
            alert('onClose event');
          }}
          onError={(err) => {
            setCaptchaVisibility(false);
            alert('onError event');
            console.warn(err);
          }}
          onVerify={({token}) => {
            setCaptchaVisibility(false);
            alert('onVerify event');
            setKey(token);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
