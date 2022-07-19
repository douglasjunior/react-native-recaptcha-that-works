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

import React, { ReactNode } from "react";
import { StyleProp, ViewStyle, ModalProps } from "react-native";
import { WebViewProps } from "react-native-webview";

export declare type RecaptchaProps = {
    headerComponent?: ReactNode;
    footerComponent?: ReactNode;
    loadingComponent?: ReactNode;
    webViewProps?: Omit<WebViewProps, 'source' | 'style' | 'onMessage' | 'ref'>;
    modalProps?: Omit<ModalProps, 'visible' | 'onRequestClose'>;
    onVerify: (token: string) => void;
    onExpire?: () => void;
    onError?: (error: string) => void;
    onClose?: () => void;
    onLoad?: () => void;
    theme?: "dark" | "light";
    size?: "invisible" | "normal" | "compact";
    siteKey: string;
    baseUrl: string;
    lang?: string;
    style?: StyleProp<ViewStyle>;
    enterprise?: boolean;
    recaptchaDomain?: string;
    gstaticDomain?: string;
    hideBadge?: boolean;
};

export declare type RecaptchaHandles = {
    open(): void;
    close(): void;
};

declare const Recaptcha: React.ForwardRefExoticComponent<
    RecaptchaProps & React.RefAttributes<RecaptchaHandles>
>;

export default Recaptcha;
