**The camera works on an iPhone now.**

Safari reads no barcodes of its own. The card falls back to the reader
HomeBasket serves from your own installation, so scanning works there with
nothing to configure — and, as before, nothing is fetched from a third party.

Two bugs came out of testing that fallback: the card called a method the
library does not have, and unwrapped its export wrongly, so a ZXing build set
through `zxing_url` would not have worked either. Both are fixed.

Needs HomeBasket 0.9.3 for the reader.
