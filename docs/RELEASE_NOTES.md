Fixes the raw "Choose file / No file chosen" control that showed up under the
photo in the product sheet. The rule meant to hide it did not match where the
input actually sat, so the browser's default file control was visible next to
the styled button.

Needs [HomeBasket](https://github.com/ivan1mihaylov/HomeBasket) 0.2.0 or newer;
pair it with 0.2.1 to get brand names in front of looked-up products.
