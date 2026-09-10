First release of the HomeBasket dashboard card.

Type or camera-scan a barcode and the product goes onto your shopping list,
with a strip of recent scans and a list of learned products carrying photos
and category labels.

### What's in it

- A scan tile that opens the camera, plus a field that both scans and searches
- Recent scans strip, including codes that are waiting to be named
- Product list with photos, categories and one-tap add to the shopping list
- Product photos: whatever Open Food Facts supplies, or one you take or upload
  yourself — a single control opens the phone camera or the file picker, and
  the image is scaled down in the browser before it is sent
- Visual editor, and an interface translated into English and Bulgarian

### Notes

- Built on plain DOM APIs — no `ha-textfield`, no `ha-dialog`, no Lit — so a
  rename inside the Home Assistant frontend cannot leave the card with an
  invisible input field or a missing button
- Ships as a single file, so no sub-module can get stuck in a browser cache
- Camera scanning uses the browser's built-in `BarcodeDetector`, available in
  Chrome, Edge and the Android Companion app over HTTPS. Safari and iOS have no
  detector; set `zxing_url` to a build you host yourself, or type the code in

### Requirements

The [HomeBasket integration](https://github.com/ivan1mihaylov/HomeBasket) 0.2.0
or newer has to be installed and configured first — the card talks to it over
the WebSocket API.
