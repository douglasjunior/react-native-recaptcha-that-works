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
import Recaptcha from 'react-native-recaptcha-that-works';

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

  const $recaptcha = useRef();

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <Button onPress={handleOpenPress} title="Abrir Recaptcha" />
          <Text>Token: {key}</Text>
          <Text>Size: {size}</Text>
        </View>

        <Recaptcha
          headerComponent={<Button title="Fechar" onPress={handleClosePress} />}
          ref={$recaptcha}
          siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
          baseUrl="http://127.0.0.1"
          size={size}
          theme="light"
          onLoad={() => alert('onLoad event')}
          onClose={() => alert('onClose event')}
          onError={(err) => {
            alert('onError event');
            console.warn(err);
          }}
          onExpire={() => alert('onExpire event')}
          onVerify={(token) => {
            alert('onVerify event');
            setKey(token);
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
