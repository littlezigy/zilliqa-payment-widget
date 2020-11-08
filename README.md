# Zilliqa ZRC20 Payment Widget


[![Video](https://raw.githubusercontent.com/littlezigy/zilliqa-payment-widget/main/src/assets/screenshot_widget.png)](https://youtu.be/nYp1u1ygvnc)
## Using the Widget
To use this widget in your page, copy the css and js files into your page.

In the head, or near the top of your page, enter the following line
```
<link rel = 'stylesheet' href = 'https://siasky.net/AAA-JibQ_yJe199VwdNTUk7Bfea8rDa6vuUlLQoI-439Ng/css/app~748942c6.css'>
```

In the footer, or at the bottom of your page, enter the following line
```
<script src = 'https://siasky.net/AAA-JibQ_yJe199VwdNTUk7Bfea8rDa6vuUlLQoI-439Ng/js/app~748942c6.js'></script>
```

Then use the following tag where you'd like the widget to appear
```
<vue-widget amount = 1 merchantAddress = 'merchant_address'></vue-widget>
```

`amount` should be an integer,
`merchantAddress` should be your wallet address. It is a string

Here's a sample page with the widget installed

```
<html>
    <head>
        <link rel = 'stylesheet' href = 'https://siasky.net/AAA-JibQ_yJe199VwdNTUk7Bfea8rDa6vuUlLQoI-439Ng/css/app~748942c6.css'>
    </head>

    <body>
        <div id = 'checkout'>
            <vue-widget amount = 1 merchantAddress = 'zil1234567890abcdefg'></vue-widget>
        </div>

        <footer>
            <script src = 'https://siasky.net/AAA-JibQ_yJe199VwdNTUk7Bfea8rDa6vuUlLQoI-439Ng/js/app~748942c6.js'></script>
        </footer>
    </body>
</html>
```
