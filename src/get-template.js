const getTemplate = ({ siteKey, lang }) => {
  let template = `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ReCaptcha</title>
      <script>
        var onLoad = function () {
          setTimeout(function () {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ status: 'loaded', payload: {} }),
            );
            grecaptcha.ready(function () {
              grecaptcha
                .execute('${siteKey}', {
                  action: 'submit',
                })
                .then(function (token) {
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ status: 'verified', payload: { token } }),
                  );
                })
                .catch(function (error) {
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ status: 'failed', payload: { error } }),
                  );
                });
            });
          }, 1000);
        };
      </script>
      <script
        src="https://www.google.com/recaptcha/api.js?onload=onLoad&render=${siteKey}"
        async
      ></script>
  
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
          background-color: rgba(0, 0, 0, 0);
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <span id="recaptcha-container"></span>
      </div>
    </body>
  </html>
  
`;

  return template;
};

export default getTemplate;
