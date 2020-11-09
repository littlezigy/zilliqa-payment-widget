# Zilliqa ZRC20 Payment Widget


[![Video](https://raw.githubusercontent.com/littlezigy/zilliqa-payment-widget/main/src/assets/screenshot_widget.png)](https://youtu.be/4n0mBYt-1Kc)
## Using the Widget
To use this widget in your page, copy the css and js files into your page.

### Header
In the head, or near the top of your page, enter the following line
```
<link rel = 'stylesheet' href = 'https://siasky.net/AACkshPs8Nh2AxfANi3PdpCTe1QF1KDEc1pSFORpKr-cYQ/css/app~748942c6.css'>
```

### Footer
In the footer, or at the bottom of your page, enter the following line
```
<script src = 'https://siasky.net/AACkshPs8Nh2AxfANi3PdpCTe1QF1KDEc1pSFORpKr-cYQ/js/app~748942c6.js'></script>
```

### Widget
Then use the following tag where you'd like the widget to appear
```
<vue-widget amount = 1 merchantAddress = 'merchant_address'></vue-widget>
```

`amount` should be an integer,
`merchantAddress` should be your wallet address. It is a string


***
<br>

## Example
Here's a sample page with the widget installed

```
<html>
    <head>
        <link rel = 'stylesheet' href = 'https://siasky.net/AACkshPs8Nh2AxfANi3PdpCTe1QF1KDEc1pSFORpKr-cYQ/css/app~748942c6.css'>
    </head>

    <body>
        <div id = 'checkout'>
            <vue-widget amount = 1 merchantAddress = 'zil1234567890abcdefg'></vue-widget>
        </div>

        <footer>
            <script src = 'https://siasky.net/AACkshPs8Nh2AxfANi3PdpCTe1QF1KDEc1pSFORpKr-cYQ/js/app~748942c6.js'></script>
        </footer>
    </body>
</html>
```
