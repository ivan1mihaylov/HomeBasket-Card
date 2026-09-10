**One tap from the phone's home screen to the camera.** A card can now open the
camera the moment it is shown (`scan_on_open`), so a dashboard view holding
only this card *is* the scanner — point a home screen shortcut at that view and
scanning is one tap away. A dashboard used for other things works too: put
`?homebasket=scan` on the end of the shortcut's address. The README has the
Android and iOS steps. When a browser refuses the camera because nothing on the
page was tapped, the dialog now offers a button instead of being a dead end.

**A known barcode opens its product.** Scanning something HomeBasket already
knows opens that product, so its name, category or photo can be corrected while
it is in your hand, instead of naming it in a passing message. The scan is in
the recent strip and on the shopping list either way. `open_known: false` turns
it off for uninterrupted scanning.

Needs HomeBasket 0.6.0, which is what makes the same barcode read as UPC-A and
as EAN-13 one product rather than two.
