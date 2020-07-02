import React, {forwardRef, useMemo, useState, useCallback} from 'react';
import {Modal, Button, StyleSheet, View} from 'react-native';

import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});

const Recaptcha = forwardRef(
  ({onVerify, onExpire, onError, onClose, theme, size, siteKey}, $ref) => {
    const [visible, setVisible] = useState(false);

    const handleClose = useCallback(() => {
      setVisible(false);
    }, []);

    $ref.current = useMemo(
      () => ({
        execute: () => {
          setVisible(true);
        },
      }),
      [],
    );

    return (
      <View style={styles.modal}>
        {/* <Modal
         visible={visible}
         transparent={false}
       presentationStyle={styles.modal}> */}
        <Button title="Fechar" onPress={handleClose} />
        <WebView
          originWhitelist={['*']}
          source={{html: require('./template.html')}}
          style={{flex: 1}}
        />
        {/* </Modal> */}
      </View>
    );
  },
);

export default Recaptcha;
