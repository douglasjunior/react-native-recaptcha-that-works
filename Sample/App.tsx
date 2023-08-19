import React, {useRef, useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';

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
  const size = 'invisible';
  const [token, setToken] = useState('<none>');

  const $recaptcha = useRef<RecaptchaRef | null>(null);

  const handleOpenPress = useCallback(() => {
    $recaptcha.current?.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Button onPress={handleOpenPress} title="Open" />
        <Text>Token: {token}</Text>
        <Text>Size: {size}</Text>
      </View>

      <Recaptcha
        ref={$recaptcha}
        lang="pt"
        headerComponent={
          <Button title="Close modal" onPress={handleClosePress} />
        }
        footerComponent={<Text>Footer here</Text>}
        siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        baseUrl="http://127.0.0.1"
        size={size}
        theme="dark"
        onLoad={() => Alert.alert('onLoad event')}
        onClose={() => Alert.alert('onClose event')}
        onError={(err) => {
          Alert.alert('onError event');
          console.warn(err);
        }}
        onExpire={() => Alert.alert('onExpire event')}
        onVerify={(token) => {
          Alert.alert('onVerify event');
          setToken(token);
        }}
        enterprise={false}
        hideBadge={false}
      />
    </SafeAreaView>
  );
};

export default App;
