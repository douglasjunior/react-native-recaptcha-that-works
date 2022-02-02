/**
* MIT License
* 
* Copyright (c) 2020 Douglas Nassif Roma Junior
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE. 
*/

import React, {
    forwardRef,
    useMemo,
    useState,
    useCallback,
    useRef,
    useImperativeHandle,
} from 'react';
import {
    Modal,
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';

import WebView from 'react-native-webview';
import getTemplate from './get-template';

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const originWhitelist = ['*'];

const Recaptcha = forwardRef(({
    headerComponent,
    footerComponent,
    loadingComponent,
    webViewProps,
    modalProps,
    onVerify,
    onExpire,
    onError,
    onClose,
    onLoad,
    theme,
    size,
    siteKey,
    baseUrl,
    lang,
    style,
}, $ref,
) => {
    const $isClosed = useRef(true);
    const $webView = useRef();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const isInvisibleSize = size === 'invisible';

    const html = useMemo(() => {
        return getTemplate({
            siteKey,
            size,
            theme,
            lang,
        });
    }, [siteKey, size, theme, lang]);

    const handleLoad = useCallback((...args) => {
        onLoad && onLoad(...args);

        if (isInvisibleSize) {
            $webView.current.injectJavaScript(`
                window.rnRecaptcha.execute();
            `);
        }

        setLoading(false);
    }, [onLoad, isInvisibleSize]);

    const handleClose = useCallback((...args) => {
        if ($isClosed.current) {
            return;
        }
        $isClosed.current = true;
        setVisible(false);
        onClose && onClose(...args);
    }, [onClose]);

    const handleMessage = useCallback((content) => {
        try {
            const payload = JSON.parse(content.nativeEvent.data);
            if (payload.close) {
                if (isInvisibleSize) {
                    handleClose();
                }
            }
            if (payload.load) {
                handleLoad(...payload.load);
            }
            if (payload.expire) {
                onExpire && onExpire(...payload.expire);
            }
            if (payload.error) {
                handleClose();
                onError && onError(...payload.error);
            }
            if (payload.verify) {
                handleClose();
                onVerify && onVerify(...payload.verify);
            }
        } catch (err) {
            console.warn(err);
        }
    }, [onVerify, onExpire, onError, handleClose, handleLoad, isInvisibleSize]);

    const source = useMemo(() => ({
        html,
        baseUrl,
    }), [html, baseUrl]);

    useImperativeHandle($ref, () => ({
        open: () => {
            setVisible(true);
            setLoading(true);
            $isClosed.current = false;
        },
        close: handleClose,
    }), [handleClose]);

    const handleNavigationStateChange = useCallback(() => {
        // prevent navigation on Android
        if (!loading) {
            $webView.current.stopLoading();
        }
    }, [loading]);

    const handleShouldStartLoadWithRequest = useCallback(event => {
        // prevent navigation on iOS
        return event.navigationType === 'other';
    }, [loading]);

    const webViewStyles = useMemo(() => [
        styles.webView,
        style,
    ], [style]);

    const renderLoading = () => {
        if (!loading && source) {
            return null;
        }
        return (
            <View style={styles.loading}>
                {loadingComponent || <ActivityIndicator size="large" />}
            </View>
        );
    };

    return (
        <Modal
            transparent
            {...modalProps}
            visible={visible}
            onRequestClose={handleClose}
        >
            {headerComponent}
            <WebView
                bounces={false}
                allowsBackForwardNavigationGestures={false}
                {...webViewProps}
                source={source}
                style={webViewStyles}
                originWhitelist={originWhitelist}
                onMessage={handleMessage}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                onNavigationStateChange={handleNavigationStateChange}
                ref={$webView}
            />
            {footerComponent}
            {renderLoading()}
        </Modal>
    );
});

Recaptcha.defaultProps = {
    size: 'normal',
    theme: 'light',
};

export default Recaptcha;
