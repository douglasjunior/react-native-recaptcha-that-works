# reCAPTCHA for React Native (Android and iOS)

[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-native-recaptcha-that-works/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-recaptcha-that-works.svg)](https://www.npmjs.com/package/react-native-recaptcha-that-works)
[![npm downloads](https://img.shields.io/npm/dt/react-native-recaptcha-that-works.svg)](#install)

A reCAPTCHA library for React Native (Android and iOS) that works.

## Install 

### Install the module 

```bash
  yarn add react-native-recaptcha-that-works react-native-webview
```
Or
```bash
  npm i -S react-native-recaptcha-that-works react-native-webview
```

## Usage

```jsx
import React, { Component } from 'react';
import { View, Button } from 'react-native';

import Recaptcha from 'react-native-recaptcha-that-works';

class App extends Component {

    send = () => {
        console.log('send!');
        this.recaptcha.open();
    }

    onVerify = token => {
        console.log('success!', token);
    }

    onExpire = () => {
        console.warn('expired!');
    }

    render() {
        return (
            <View>
                <Recaptcha
                    ref={ref = this.recaptcha = ref}
                    siteKey="<your-recaptcha-public-key>"
                    baseUrl="http://my.domain.com"
                    onVerify={this.onVerify}
                    onExpire={this.onExpire}
                    size="invisible"
                />
                <Button title="Send" onPress={this.send} />
            </View>
        )
    }

}
```

## Props

|Name|Value|Default|Description|
|-|-|-|-|
|siteKey|`string`||Your sitekey.|
|baseUrl|`string`||The URL (domain) configured in the reCAPTCHA setup. (ex. http://my.domain.com)|
|headerComponent|`React Element`||A component to render on top of Modal.|
|size|`'invisible'`, `'normal'` or `'compact'`|`'normal'`|The size of the widget.|
|theme|`'dark'` or `'light'`|`'light'`|The color theme of the widget.|
|onLoad|`function()`||A callback function, executed when the reCAPTCHA is ready to use.|
|onVerify|`function(token)`||A callback function, executed when the user submits a successful response. The recaptcha response token is passed to your callback.|
|onExpire|`function()`||A callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.|
|onError|`function(error)`||A callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry.|
|onClose|`function()`|| A callback function, executed when the Modal is closed.|

## Methods

|Name|Type|Description|
|-|-|-|-|
|open|`function`|Open the reCAPTCHA Modal.|
|close|`function`|Close the reCAPTCHA Modal.|

Note: If using `size="invisible"`, then the challange will be called automatically when the Modal is opened.

## reCAPTCHA v2 docs

- [I'm not a robot](https://developers.google.com/recaptcha/docs/display)
- [Invisible](https://developers.google.com/recaptcha/docs/invisible)

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions use the [issues](https://github.com/douglasjunior/react-native-recaptcha-that-works/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E32BUP77SVBA2)

## Licence

```
The MIT License (MIT)

Copyright (c) 2020 Douglas Nassif Roma Junior
```

See the full [licence file](https://github.com/douglasjunior/react-native-recaptcha-that-works/blob/master/LICENSE).
