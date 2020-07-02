import React, {useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Recaptcha from './Recaptcha';

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
  const $recaptcha = useRef();

  const handlePless = useCallback(() => {
    $recaptcha.current.execute();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <Button onPress={handlePless} title="Recaptcha" />
        </View> */}
        <Recaptcha
          ref={$recaptcha}
          siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
          onClose={() => console.log('onClose')}
          onError={() => console.log('onError')}
          onExpire={() => console.log('onExpire')}
          onVerify={(token) => console.log('onVerify', token)}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
