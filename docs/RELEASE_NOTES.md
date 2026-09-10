A product can now hold more than one barcode, and there is a details page for
everything Open Food Facts knows about it.

### More than one barcode per product

The same yoghurt in a 400 g and a 900 g tub carries two barcodes but belongs on
a shopping list once. When a scan creates a product that resembles one you
already have, the sheet opens with the look-alikes at the bottom — pick one and
the scanned barcode joins it. A scan with nothing similar opens nothing, so the
one-beep path is untouched.

Matching compares the words of the name and brand, ignores sizes, and weighs
each word by how many products already use it: in a fridge full of "мляко
Верея" what identifies a product is "кисело". The edit sheet lists a product's
barcodes and can detach any but the first.

### Product details

Tapping a product's name opens Nutri-Score, NOVA and Eco-Score, the nutrition
table per 100 g, ingredients, allergens, labels, packaging, origin and where it
sells, with a link to its Open Food Facts page. The record comes from the
integration's cache, so opening a product makes no network request; only **Look
up again** re-fetches it.

### Also

- Every card in the recent scans strip can be dismissed on its own. It clears
  the scan only — a saved product keeps its place in the list below
- The photo control is a square button that the picture replaces at the same
  size, with a ✕ to clear it; nothing is written until Save
- **Look up again** in the edit sheet refills name, category and picture

Needs [HomeBasket](https://github.com/ivan1mihaylov/HomeBasket) 0.5.0.
