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
  const {siteKey, theme, lang, size, action} = params;

  const grecaptchaObject = enterprise ? 'grecaptcha.enterprise' : 'grecaptcha';

  const scriptUrl = enterprise
    ? `https://${recaptchaDomain}/recaptcha/enterprise.js?render=explicit&hl=${lang}`
    : `https://${recaptchaDomain}/recaptcha/api.js?render=explicit&hl=${lang}`;

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="preconnect" href="https://${recaptchaDomain}">
    <link rel="preconnect" href="https://${gstaticDomain}" crossorigin>


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
  <script>
    const action = "${action}";
    const siteKey = "${siteKey}";
    const scriptUrl = "${scriptUrl}";
    const size = "${size}";
    const theme = "${theme}";
    
    const onClose = () => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          close: [],
        })
      );
    };
    
    const onLoad = () => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          load: [],
        })
      );
    };
    
    const onVerify = (token) => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          verify: [token],
        })
      );
    };
    
    const onExpire = () => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          expire: [],
        })
      );
    };
    
    const onError = (error) => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          error: [error],
        })
      );
    };

    const getRecaptchaElement = () => {
      const iframes = document.getElementsByTagName("iframe");
      const recaptchaFrame = [...iframes].find(
        (e) =>
          typeof e.src === "string" &&
          e.src.includes("google.com/recaptcha") &&
          e.src.includes("bframe")
      );
      return recaptchaFrame?.parentNode?.parentNode;
    }
    
    const registerOnCloseListener = () => {
      let lastOpacity = null;
      const onCloseObserver = new MutationObserver(() => {
        const recaptchaElement = getRecaptchaElement();
        if (recaptchaElement) {
          if (
            lastOpacity !== null &&
            lastOpacity !== recaptchaElement.style.opacity &&
            recaptchaElement.style.opacity == 0
          ) {
            onClose();
          }
          lastOpacity = recaptchaElement.style.opacity;
        }
      });
    
      onCloseObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });
    };

    const getRecaptchaFn = (fnName) => {
      const recaptcha = window.${grecaptchaObject};
      if (
        recaptcha &&
        recaptcha[fnName] &&
        typeof recaptcha[fnName] === "function"
      ) {
        return recaptcha[fnName];
      }
      return () => {};
    };

    
    let widget;

    const handleRecaptchaReady = () => {
      const recaptchaParams = {
        sitekey: siteKey,
        size,
        theme,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
      };
      if (action) {
        recaptchaParams.action = action;
      }  
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", "recaptcha-wrapper");
      widget = getRecaptchaFn("render")(wrapper, recaptchaParams);
      registerOnCloseListener();
      const containerElement = document.querySelector(".container");
      if(!containerElement) {
        onError("Failed to find container element");
        return;
      }
      containerElement.appendChild(wrapper)
      onLoad();
    };
    
    const renderRecaptcha = () => {
      getRecaptchaFn("ready")(handleRecaptchaReady);
    };
    
    const buildScript = () => {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.onload = renderRecaptcha;
      script.onerror = (event) => onError("Failed to load reCAPTCHA script");
      document.body.appendChild(script);
    };
    
    buildScript();
    
    window.rnRecaptcha = {
      execute: () => {
        getRecaptchaFn("execute")(widget);
      },
      reset: () => {
        getRecaptchaFn("reset")(widget);
      },
    };
    
  </script>
  <div class="container">
  </div>
</body>

</html>`;
};

export default getTemplate;
