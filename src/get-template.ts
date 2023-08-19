/*
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

export type RecaptchaSize = 'invisible' | 'normal' | 'compact';

export type RecaptchaTheme = 'dark' | 'light';

export type TemplateParams = {
  siteKey: string;
  size?: RecaptchaSize;
  theme?: RecaptchaTheme;
  lang?: string;
  action?: string;
};

const getTemplate = (
  params: TemplateParams,
  recaptchaDomain: string,
  gstaticDomain: string,
  enterprise: boolean,
  hideBadge: boolean,
) => {
  const grecaptchaObject = enterprise
    ? 'window.grecaptcha.enterprise'
    : 'window.grecaptcha';

  const jsScript = enterprise
    ? `<script src="https://${recaptchaDomain}/recaptcha/enterprise.js?hl={{lang}}" async defer></script>`
    : `<script src="https://${recaptchaDomain}/recaptcha/api.js?hl={{lang}}" async defer></script>`;

  let template = `
    <!DOCTYPE html>
    <html lang="{{lang}}">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>

        <link rel="preconnect" href="https://${recaptchaDomain}">
        <link rel="preconnect" href="https://${gstaticDomain}" crossorigin>

        ${jsScript}

        <script>
            const siteKey = '{{siteKey}}';
            const theme = '{{theme}}';
            const size = '{{size}}';
            const action = '{{action}}';
    
            let readyInterval;
            let onCloseInterval;
            let widget;
            let onCloseObserver;
    
            const onClose = () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    close: [],
                }));
            }
    
            const onLoad = () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    load: [],
                }));
            }
    
            const onExpire = () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    expire: [],
                }));
            }
    
            const onError = (error) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    error: [error],
                }));
            }
    
            const onVerify = (token) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    verify: [token],
                }));
            }
    
            const isReady = () => Boolean(typeof window === 'object' && window.grecaptcha && ${grecaptchaObject}.render);
    
            const registerOnCloseListener = () => {
                if (onCloseObserver) {
                    onCloseObserver.disconnect();
                }
    
                const iframes = document.getElementsByTagName('iframe');
    
                const recaptchaFrame = Array.prototype.find
                    .call(iframes, e => e.src.includes('google.com/recaptcha/api2/bframe'));
                const recaptchaElement = recaptchaFrame.parentNode.parentNode;
    
                clearInterval(onCloseInterval);
    
                let lastOpacity = recaptchaElement.style.opacity;
                onCloseObserver = new MutationObserver(mutations => {
                    if (lastOpacity !== recaptchaElement.style.opacity
                        && recaptchaElement.style.opacity == 0) {
                        onClose();
                    }
                    lastOpacity = recaptchaElement.style.opacity;
                });
                onCloseObserver.observe(recaptchaElement, {
                    attributes: true,
                    attributeFilter: ['style'],
                });
            }
    
            const isRendered = () => {
                return typeof widget === 'number';
            }
    
            const renderRecaptcha = () => {
                const recaptchaParams = {
                    sitekey: siteKey,
                    size,
                    theme,
                    callback: onVerify,
                    'expired-callback': onExpire,
                    'error-callback': onError,
                }
                if (action) {
                    recaptchaParams.action = action;
                }
                widget = ${grecaptchaObject}.render('recaptcha-container', recaptchaParams);
                if (onLoad) {
                    onLoad();
                }
                onCloseInterval = setInterval(registerOnCloseListener, 1000);
            }
    
            const updateReadyState = () => {
                if (isReady()) {
                    clearInterval(readyInterval);
                    renderRecaptcha()
                }
            }
    
            if (isReady()) {
                renderRecaptcha();
            } else {
                readyInterval = setInterval(updateReadyState, 1000);
            }
    
            window.rnRecaptcha = {
                execute: () => {
                    ${grecaptchaObject}.execute(widget);
                },
                reset: () => {
                    ${grecaptchaObject}.reset(widget);
                },
            }
        </script>
    
        <style>
            html,
            body,
            .container {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                background-color: transparent;
            }
    
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            ${hideBadge ? '.grecaptcha-badge { visibility: hidden; }' : ''}
        </style>
    </head>
    
    <body>
        <div class="container">
            <span id="recaptcha-container"></span>
        </div>
    </body>
    
    </html>`;

  Object.entries(params).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{{${key}}}`, 'img'), value);
  });

  return template;
};

export default getTemplate;
