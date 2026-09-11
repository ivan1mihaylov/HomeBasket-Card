# HomeBasket Card

The dashboard card for the [HomeBasket](https://github.com/ivan1mihaylov/HomeBasket)
Home Assistant integration. Scan a barcode with your phone camera, or type it
in, and the product goes onto your shopping list.

<p>
  <img src="docs/card.png" alt="The card in the light theme" width="45%">
  <img src="docs/card-dark.png" alt="The card in the dark theme" width="45%">
</p>

The card is written against plain DOM APIs on purpose. It uses **no Home
Assistant frontend internals** — no `ha-textfield`, no `ha-dialog`, no Lit — so
a rename inside the Home Assistant frontend cannot leave you with an invisible
input field or a missing button. It ships as a single file, so there are no
sub-modules that can get stuck in a browser cache.

## The three parts

| | What it is |
| --- | --- |
| **[HomeBasket](https://github.com/ivan1mihaylov/HomeBasket)** | Scanning, and the products it learns: names, barcodes, pictures, everything the databases know. |
| **HomeBasket Card** | This: scanning with a phone, for when there is no scanner on a shelf — and the place to look after the products themselves. |
| **[HomeBasket Lists](https://github.com/ivan1mihaylov/HomeBasket-Lists)** | Shopping lists and tasks, using what HomeBasket knows. |

The recent scans shown here come from the integration, so a scan made anywhere —
this card, a hardware scanner, the scan button on a list — shows up in the strip
either way, newest first.

## Languages

**Bulgarian and English.** The card follows the language of the person using
Home Assistant, or the `language` option when that is set; anything else falls
back to English. Product names are whatever the integration stored — the
language asked of Open Food Facts is a setting of the integration, and names you
type in yourself are kept exactly as typed.

## Requirements

The [HomeBasket integration](https://github.com/ivan1mihaylov/HomeBasket) has
to be installed and configured first — the card talks to it over the Home
Assistant WebSocket API.

## Installation

### HACS (custom repository)

1. HACS → ⋮ → **Custom repositories**
2. URL `https://github.com/ivan1mihaylov/HomeBasket-Card`, type **Dashboard**
3. Install **HomeBasket Card**
4. Add the card to a dashboard: **Add card → HomeBasket**

### Manual

Copy `dist/homebasket-card.js` to `config/www/homebasket/homebasket-card.js`
and register it under **Settings → Dashboards → Resources**:

```
URL:  /local/homebasket/homebasket-card.js?v=0.6.0
Type: JavaScript Module
```

Bump the `?v=` value whenever you edit the file, otherwise the browser and the
companion app will keep serving the cached copy.

## Configuration

```yaml
type: custom:homebasket-card
title: Shopping
```

| Option | Default | Description |
| --- | --- | --- |
| `title` | translated | Card heading. |
| `language` | Home Assistant's | `bg` or `en`. Leave empty to follow the Home Assistant language. |
| `add_on_scan` | `true` | Put recognised products on the shopping list immediately. Turn off to only build the product dictionary. |
| `open_known` | `false` | Turn on to open the product when a barcode HomeBasket already knows is scanned, so it can be corrected on the spot. Off, a known barcode is scanned onto the list without interrupting. |
| `scan_on_open` | `false` | Open the camera as soon as the card is shown. For a card on its own view — see the home screen shortcut below. |
| `show_recent` | `true` | Show the strip of recent scans and codes waiting for a name. |
| `show_products` | `true` | Show the list of learned products. |
| `zxing_url` | `null` | A barcode reader of your own. One is shipped with the integration — see below. |

All options are also editable in the visual card editor.

## Which shop a product is bought in

A product's sheet has a **Shop category** — groceries, greengrocer, butcher,
cosmetics, pet shop or building supplies. A scan sets it from the database that
knew the barcode, and it can be changed here. HomeBasket Lists uses it to
decide which zones are worth reminding you about that product in.

## Product photos

Products are shown with a picture wherever one is available:

- **Automatically** — the integration stores the product image Open Food Facts
  returns, and the card loads it from there.
- **Your own** — tap a product's thumbnail (or the pencil) and press the square
  camera button at the top of the sheet. On a phone that opens the camera; on a
  desktop it opens the file picker. The photo is scaled down in the browser before it is sent, and
  Home Assistant keeps it in its own storage — it is never served from a
  public path.

The picture replaces the button once there is one; the ✕ in its corner clears
it and brings the button back. Nothing is written until you press **Save**, so
you can back out of any change with **Cancel**.

**Look up again**, at the bottom of the sheet, re-queries Open Food Facts and
refills the name, category and picture — useful when a product has been
improved in the database since you first scanned it, or after you renamed it by
hand and want the original back. It only fills the fields in; the save still
has to be confirmed.

## More than one barcode per product

The same yoghurt in a 400 g and a 900 g tub carries two barcodes but is one
line on a shopping list. Scanning either one resolves to the same product, and
editing it through either barcode edits the same entry.

When a scan creates a product that resembles one you already have, the sheet
opens with the look-alikes listed at the bottom. Pick one and the scanned
barcode joins it; ignore them and you get two separate products. A scan with
nothing similar in the list never opens anything — it stays the one-beep path.

Matching compares the words of the name and brand, ignoring sizes, and weighs
each word by how many products already use it: in a fridge full of "Vereya
milk", the word that identifies a product is "yogurt". So a 900 g tub finds the
400 g one without matching every other dairy item.

The edit sheet lists a product's barcodes, each detachable except the first.

## Product details

Tapping a product's name opens everything the databases know about it. For a
grocery that is Nutri-Score, NOVA and Eco-Score, the nutrition table per 100 g,
the ingredient list, allergens, labels, packaging, origin and where it is sold.
The integration looks a barcode up in the whole Open Food Facts family — food,
then cosmetics, then pet food, then everything else — and the sheet shows each
product the fields it actually has: nutrition for a yoghurt or a tin of cat
food, ingredients for a shampoo, origin and packaging for a lamp. Which of the
four knew it stands next to the barcode, and the link at the bottom goes to that
database.

The record is fetched once, when the barcode is first scanned, and kept by the
integration — opening a product reads that stored copy and makes no network
request. **Look up again**, in both the details sheet and the edit sheet, is the
only thing that goes back out to Open Food Facts.

## How a scan flows

```
        type or scan a barcode
                  │
                  ▼
        known ──yes──▶ product name ──▶ shopping list
          │ no
          ▼
   Open Food Facts ──found──▶ remembered ──▶ shopping list
          │ not found
          ▼
   the card asks you for a name, then remembers it
```

The second scan of the same product never asks again — it goes straight to the
list, offline, and lands in the recent strip, so one product after another can
be scanned without stopping. With
[HomeBasket Lists](https://github.com/ivan1mihaylov/HomeBasket-Lists) as the
shopping list, scanning something that is already on it counts one more of it
and the card says so (*milk on the list: 2 now*) rather than shrugging with
"already on the list" — unless that list is set to keep what it has, which the
card reports just as plainly. Turn `open_known` on to have each known product
open for editing instead.

The same barcode read as UPC-A (twelve digits) and as EAN-13 (the same digits
with a leading zero) is one product, whichever reading your scanner reports.

## A shortcut on the phone's home screen

One tap from the home screen to the camera, without going through the app.

**1. Give the scanner a view of its own.** Make a dashboard view holding only
this card, with `scan_on_open: true` (in the visual editor: *Open the camera as
soon as this card is shown*). Opening that view is then the same as opening the
camera. Set the view's **URL** in its settings — say `scan` — so it has a path
of its own.

**2. Note the path.** It is what follows your Home Assistant host in the
address: `lovelace/scan` for a view on the default dashboard,
`<dashboard>/scan` for one on a dashboard of its own, or just `<dashboard>` for
a whole dashboard. The path goes in without a leading slash.

**3. Point a shortcut at it.**

- **Android** — Companion app → **Settings → Companion app → Manage shortcuts**.
  Fill in:

  | Field | What goes in it |
  | --- | --- |
  | *Shortcut label* | The name under the icon, e.g. `Scan` |
  | *Shortcut description* | Anything, e.g. `Open the camera` |
  | *Shortcut type* | **Dashboard** |
  | *Dashboard view or dashboard* | **The path from step 2**, e.g. `lovelace/scan` |

  Press **Update shortcut data**, then long-press the Home Assistant icon on
  the home screen and drag the shortcut out.

- **iOS** — Shortcuts app → new shortcut → *Open URL* with
  `homeassistant://navigate/lovelace/scan` → share it to the home screen.

- **Any phone, through the browser** — open the view in Chrome or Safari and use
  *Add to Home screen*. It opens in the browser rather than the app, and asks
  for the camera once.

A dashboard you use for other things works too, where the shortcut carries a
whole address rather than a path — the browser and the iOS *Open URL* route:
put `?homebasket=scan` on the end and the card opens the camera once, on
arrival, then wipes it from the address so walking around the dashboard does not
reopen it. Android's shortcut field takes a path, not an address, so there use
`scan_on_open` and a view of its own.

Android's web view hands the camera over only after something on the page has
been tapped, and arriving from a shortcut there has been no tap yet. The sheet
opens ready for it: tap the black square, or the button under it, and the
camera starts.

## Camera support

The camera uses the browser's built-in `BarcodeDetector`, which is available in
Chrome, Edge and the **Android** Home Assistant Companion app. Two things are
required for it to work at all:

- an **HTTPS** connection (Nabu Casa, a reverse proxy, or a local certificate);
- camera permission for Home Assistant.

**Safari and iOS** have no `BarcodeDetector` of their own. The HomeBasket
integration ships one and serves it from your own installation, so scanning
works there too with nothing to set up — the card loads it only when the
browser has no reader of its own, and nothing is ever fetched from a CDN.

To use a build of your own instead:

```yaml
type: custom:homebasket-card
zxing_url: /local/homebasket/zxing.min.js
```

## License

[MIT](LICENSE)
