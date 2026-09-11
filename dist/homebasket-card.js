/**
 * HomeBasket card for Home Assistant.
 *
 * Scan a barcode with the phone camera or an external scanner and the product
 * lands on your shopping list. Written against plain DOM APIs on purpose - it
 * uses no Home Assistant frontend internals, so it does not break when those
 * are renamed.
 *
 * https://github.com/ivan1mihaylov/HomeBasket-Card
 */

const VERSION = '0.9.2';

/* ------------------------------------------------------------------ *
 * Translations
 *
 * The language follows the card config, then Home Assistant's own
 * language, then English.
 * ------------------------------------------------------------------ */

const TRANSLATIONS = {
  en: {
    title: 'Shopping',
    products: (n) => `${n} product${n === 1 ? '' : 's'}`,
    scanPlaceholder: 'Enter a barcode or search',
    scanWithCamera: 'Scan with the camera',
    add: 'Add',
    recent: 'Recent scans',
    known: 'Known products',
    search: 'Search products',
    filter: 'Search',
    nameIt: 'Name it',
    added: 'Added',
    onList: 'On the list',
    recognised: 'Recognised',
    counted: 'One more',
    unknown: 'Unknown',
    addedToList: (name) => `${name} added to the list`,
    alreadyOnList: (name) => `${name} is already on the list`,
    countedUp: (name, count) => `${name} on the list: ${count} now`,
    savedAs: (name) => `Saved as ${name}`,
    noProducts: 'No products yet. Scan something to get started.',
    noMatch: 'No product matches this search.',
    newProduct: 'New product',
    editProduct: 'Edit product',
    barcodeIs: (code) => `Barcode ${code}`,
    unknownBarcode: (code) => `Barcode ${code} is not known yet.`,
    productName: 'Product name',
    category: 'Category',
    categoryHint: 'Optional, shown as a label in the list.',
    photo: 'Photo',
    takePhoto: 'Take or upload a photo',
    removePhoto: 'Remove photo',
    lookUpAgain: 'Look up again',
    lookingUp: 'Looking the barcode up…',
    lookedUp: 'Updated from Open Food Facts',
    lookupEmpty: 'Open Food Facts does not know this barcode.',
    dismissScan: 'Remove from recent scans',
    similar: 'Similar products',
    similarHint:
      'Already have this product under another barcode? Pick it and the ' +
      'scanned code is added to it.',
    barcodes: 'Barcodes',
    codeCount: (n) => `${n} barcode${n === 1 ? '' : 's'}`,
    linkedTo: (name) => `Barcode added to ${name}`,
    unlink: 'Detach this barcode',
    unlinked: 'Barcode detached',
    details: 'Product details',
    loading: 'Loading…',
    noDetails:
      'Open Food Facts has nothing on this barcode. Look it up again to check ' +
      'whether it has been added since.',
    fetchedOn: (when) => `From Open Food Facts, ${when}`,
    openOn: (site) => `${site} page`,
    sites: {
      food: 'Open Food Facts',
      beauty: 'Open Beauty Facts',
      petfood: 'Open Pet Food Facts',
      product: 'Open Products Facts',
    },
    kinds: {
      food: 'Groceries',
      beauty: 'Cosmetics',
      petfood: 'Pet food',
      product: 'Product',
    },
    sectionNutrition: 'Nutrition, per 100 g',
    sectionIngredients: 'Ingredients',
    sectionAbout: 'About',
    fieldBrand: 'Brand',
    fieldQuantity: 'Quantity',
    fieldServing: 'Serving',
    fieldCategories: 'Categories',
    fieldLabels: 'Labels',
    fieldAllergens: 'Allergens',
    fieldTraces: 'May contain',
    fieldPackaging: 'Packaging',
    fieldOrigins: 'Origin',
    fieldMadeIn: 'Made in',
    fieldStores: 'Stores',
    fieldCountries: 'Sold in',
    nutriScore: 'Nutri-Score',
    novaGroup: 'NOVA',
    ecoScore: 'Eco-Score',
    novaExplained: {
      1: 'Unprocessed',
      2: 'Culinary ingredient',
      3: 'Processed',
      4: 'Ultra-processed',
    },
    nutriments: {
      'energy-kcal': 'Energy',
      fat: 'Fat',
      'saturated-fat': 'of which saturates',
      carbohydrates: 'Carbohydrates',
      sugars: 'of which sugars',
      fiber: 'Fibre',
      proteins: 'Protein',
      salt: 'Salt',
    },
    save: 'Save',
    saveAndAdd: 'Save and add',
    cancel: 'Cancel',
    delete: 'Delete',
    addToList: 'Add to the shopping list',
    edit: 'Edit',
    forget: 'Forget this product',
    forgetTitle: 'Forget product',
    forgetMessage: (name) => `HomeBasket will no longer recognise ${name}.`,
    notSetUp:
      'The HomeBasket integration is not set up yet. Add it under Settings → ' +
      'Devices & Services → Add Integration → HomeBasket, then reload this page.',
    noAnswer: 'HomeBasket did not answer.',
    tryAgain: 'Try again',
    scanFailed: 'Scan failed',
    cameraTitle: 'Scan a barcode',
    cameraStarting: 'Starting the camera…',
    cameraAim: 'Point the camera at the barcode.',
    cameraDenied:
      'Camera access was denied. Allow it for Home Assistant and try again.',
    cameraFailed: (message) => `Could not start the camera: ${message}`,
    cameraRetry: 'Open the camera',
    cameraNeedsTap: 'Tap below to start the camera.',
    cameraInsecure:
      'The camera needs a secure connection. Open Home Assistant over HTTPS.',
    cameraUnsupported: 'This browser does not give web pages access to the camera.',
    cameraNoDetector:
      'This browser has no built-in barcode detector. Type the code by hand, ' +
      'or set zxing_url in the card configuration.',
    close: 'Close',
    photoTooBig: 'That image could not be read.',
  },
  bg: {
    title: 'Пазаруване',
    products: (n) => `${n} ${n === 1 ? 'продукт' : 'продукта'}`,
    scanPlaceholder: 'Въведи баркод или търси',
    scanWithCamera: 'Сканирай с камерата',
    add: 'Добави',
    recent: 'Нови сканирания',
    known: 'Познати продукти',
    search: 'Търси продукт',
    filter: 'Търсене',
    nameIt: 'Именувай',
    added: 'Добавено',
    onList: 'В списъка',
    recognised: 'Разпознат',
    counted: 'Още едно',
    unknown: 'Непознат',
    addedToList: (name) => `${name} е добавен в списъка`,
    alreadyOnList: (name) => `${name} вече е в списъка`,
    countedUp: (name, count) => `${name} в списъка: станаха ${count}`,
    savedAs: (name) => `Запазено като ${name}`,
    noProducts: 'Още няма продукти. Сканирай нещо, за да започнеш.',
    noMatch: 'Няма продукт по това търсене.',
    newProduct: 'Нов продукт',
    editProduct: 'Редакция на продукт',
    barcodeIs: (code) => `Баркод ${code}`,
    unknownBarcode: (code) => `Баркод ${code} още не е познат.`,
    productName: 'Име на продукта',
    category: 'Категория',
    categoryHint: 'По избор, показва се като етикет в списъка.',
    photo: 'Снимка',
    takePhoto: 'Снимай или качи снимка',
    removePhoto: 'Премахни снимката',
    lookUpAgain: 'Повторно анализиране',
    lookingUp: 'Търсене на баркода…',
    lookedUp: 'Обновено от Open Food Facts',
    lookupEmpty: 'Open Food Facts не познава този баркод.',
    dismissScan: 'Премахни от сканиранията',
    similar: 'Сходни продукти',
    similarHint:
      'Вече имаш този продукт под друг баркод? Натисни го и сканираният код ' +
      'се добавя към него.',
    barcodes: 'Баркодове',
    codeCount: (n) => `${n} ${n === 1 ? 'баркод' : 'баркода'}`,
    linkedTo: (name) => `Баркодът е добавен към ${name}`,
    unlink: 'Откачи този баркод',
    unlinked: 'Баркодът е откачен',
    details: 'Информация за продукта',
    loading: 'Зареждане…',
    noDetails:
      'Open Food Facts няма нищо за този баркод. Пробвай повторно анализиране, ' +
      'за да провериш дали е добавен междувременно.',
    fetchedOn: (when) => `От Open Food Facts, ${when}`,
    openOn: (site) => `Страница в ${site}`,
    sites: {
      food: 'Open Food Facts',
      beauty: 'Open Beauty Facts',
      petfood: 'Open Pet Food Facts',
      product: 'Open Products Facts',
    },
    kinds: {
      food: 'Хранителна стока',
      beauty: 'Козметика',
      petfood: 'Храна за домашен любимец',
      product: 'Продукт',
    },
    sectionNutrition: 'Хранителни стойности, на 100 г',
    sectionIngredients: 'Съставки',
    sectionAbout: 'За продукта',
    fieldBrand: 'Марка',
    fieldQuantity: 'Количество',
    fieldServing: 'Порция',
    fieldCategories: 'Категории',
    fieldLabels: 'Етикети',
    fieldAllergens: 'Алергени',
    fieldTraces: 'Може да съдържа',
    fieldPackaging: 'Опаковка',
    fieldOrigins: 'Произход',
    fieldMadeIn: 'Произведено в',
    fieldStores: 'Магазини',
    fieldCountries: 'Продава се в',
    nutriScore: 'Nutri-Score',
    novaGroup: 'NOVA',
    ecoScore: 'Eco-Score',
    novaExplained: {
      1: 'Непреработена',
      2: 'Кулинарна съставка',
      3: 'Преработена',
      4: 'Ултрапреработена',
    },
    nutriments: {
      'energy-kcal': 'Енергийна стойност',
      fat: 'Мазнини',
      'saturated-fat': 'от които наситени',
      carbohydrates: 'Въглехидрати',
      sugars: 'от които захари',
      fiber: 'Влакнини',
      proteins: 'Белтъчини',
      salt: 'Сол',
    },
    save: 'Запази',
    saveAndAdd: 'Запази и добави',
    cancel: 'Отказ',
    delete: 'Изтрий',
    addToList: 'Добави в списъка за пазаруване',
    edit: 'Редактирай',
    forget: 'Забрави този продукт',
    forgetTitle: 'Забравяне на продукт',
    forgetMessage: (name) => `HomeBasket повече няма да разпознава ${name}.`,
    notSetUp:
      'Интеграцията HomeBasket още не е добавена. Добави я от Настройки → ' +
      'Устройства и услуги → Добавяне на интеграция → HomeBasket и презареди страницата.',
    noAnswer: 'HomeBasket не отговори.',
    tryAgain: 'Опитай пак',
    scanFailed: 'Сканирането не успя',
    cameraTitle: 'Сканиране на баркод',
    cameraStarting: 'Камерата се стартира…',
    cameraAim: 'Насочи камерата към баркода.',
    cameraDenied:
      'Достъпът до камерата е отказан. Разреши го за Home Assistant и опитай пак.',
    cameraFailed: (message) => `Камерата не тръгна: ${message}`,
    cameraRetry: 'Отвори камерата',
    cameraNeedsTap: 'Натисни отдолу, за да пуснеш камерата.',
    cameraInsecure:
      'Камерата изисква защитена връзка. Отвори Home Assistant през HTTPS.',
    cameraUnsupported: 'Този браузър не дава достъп до камерата на уеб страници.',
    cameraNoDetector:
      'Този браузър няма вграден четец на баркодове. Въведи кода ръчно или ' +
      'задай zxing_url в настройките на картата.',
    close: 'Затвори',
    photoTooBig: 'Изображението не можа да бъде прочетено.',
  },
};

/** Return the translation table for a language code. */
function stringsFor(language) {
  const code = String(language || 'en').toLowerCase().split('-')[0];
  return TRANSLATIONS[code] || TRANSLATIONS.en;
}

/* ------------------------------------------------------------------ *
 * Styles
 * ------------------------------------------------------------------ */

const STYLES = `
  :host {
    --hb-radius: 22px;
    --hb-fg: var(--primary-text-color, #212121);
    --hb-muted: var(--secondary-text-color, #727272);
    --hb-accent: var(--primary-color, #03a9f4);
    --hb-danger: var(--error-color, #db4437);
    --hb-ok: var(--success-color, #43a047);
    --hb-line: var(--divider-color, rgba(127, 127, 127, 0.22));
    --hb-surface: var(--card-background-color, #fff);
    --hb-sunken: color-mix(in srgb, var(--hb-fg) 5%, transparent);
    --hb-raised: color-mix(in srgb, var(--hb-fg) 3%, var(--hb-surface));
    display: block;
    color: var(--hb-fg);
  }

  .card {
    background: var(--hb-surface);
    border-radius: var(--ha-card-border-radius, var(--hb-radius));
    box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
    border: var(--ha-card-border-width, 1px) solid
      var(--ha-card-border-color, var(--hb-line));
    overflow: hidden;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 18px 10px;
  }
  header .heading { display: flex; align-items: center; gap: 8px; min-width: 0; }
  header h2 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  header .heading svg { width: 20px; height: 20px; fill: var(--hb-muted); flex: 0 0 auto; }
  .pill {
    flex: 0 0 auto;
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--hb-sunken);
    color: var(--hb-muted);
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .body { padding: 0 18px 18px; }

  /* Scan row --------------------------------------------------------- */
  .scan {
    display: flex;
    align-items: stretch;
    gap: 12px;
    padding: 10px;
    border-radius: 18px;
    background: var(--hb-sunken);
  }
  .scan-tile {
    flex: 0 0 auto;
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: var(--hb-surface);
    border: 1px solid var(--hb-line);
    cursor: pointer;
    transition: transform 0.12s ease;
  }
  .scan-tile:active { transform: scale(0.96); }
  .scan-tile svg { width: 40px; height: 40px; fill: none; stroke: var(--hb-fg); stroke-width: 1.6; }
  .scan-tile .beam { stroke: var(--hb-danger); stroke-width: 2; }

  .scan-main {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }
  .scan-tools { display: flex; justify-content: flex-end; gap: 4px; }
  .scan-main input {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 0.95rem;
    color: var(--hb-fg);
    background: var(--hb-surface);
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    padding: 10px 14px;
  }
  .scan-main input:focus { outline: 2px solid var(--hb-accent); outline-offset: -1px; }

  button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; border-radius: 10px; }
  button:disabled { opacity: 0.45; cursor: default; }
  button svg { width: 20px; height: 20px; fill: currentColor; display: block; }

  .icon-btn {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    color: var(--hb-muted);
  }
  .icon-btn:hover { color: var(--hb-accent); background: var(--hb-sunken); }
  .icon-btn.danger:hover { color: var(--hb-danger); }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    background: var(--hb-surface);
    font-size: 0.875rem;
    white-space: nowrap;
  }
  .btn.primary {
    background: var(--hb-accent);
    border-color: var(--hb-accent);
    color: var(--text-primary-color, #fff);
  }
  .btn.block { width: 100%; }

  /* Section headings -------------------------------------------------- */
  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 22px 0 10px;
  }
  .section h3 { margin: 0; font-size: 1rem; font-weight: 600; }

  /* Recent scans ------------------------------------------------------ */
  .strip {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }
  .strip::-webkit-scrollbar { height: 4px; }
  .strip::-webkit-scrollbar-thumb { background: var(--hb-line); border-radius: 4px; }

  .scan-card {
    position: relative;
    flex: 0 0 auto;
    width: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--hb-line);
    background: var(--hb-raised);
    scroll-snap-align: start;
  }
  .scan-card.done { border-color: color-mix(in srgb, var(--hb-ok) 55%, transparent); }
  .scan-card .code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.8125rem;
    color: var(--hb-muted);
    overflow-wrap: anywhere;
  }
  .scan-card .name {
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }
  .scan-card .dismiss {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: var(--hb-muted);
  }
  .scan-card .dismiss:hover { color: var(--hb-danger); background: var(--hb-sunken); }
  .scan-card .dismiss svg { width: 14px; height: 14px; }
  .scan-card .tag {
    align-self: flex-start;
    max-width: calc(100% - 26px);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--hb-ok) 16%, transparent);
    color: var(--hb-ok);
  }
  .scan-card .tag.muted {
    background: var(--hb-sunken);
    color: var(--hb-muted);
  }
  .scan-card svg.barcode { width: 100%; height: 30px; display: block; }

  /* Product list ------------------------------------------------------ */
  .search-box {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    color: var(--hb-fg);
    background: var(--hb-sunken);
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    padding: 9px 12px;
    margin-bottom: 10px;
  }

  .products { display: flex; flex-direction: column; gap: 8px; }
  .product {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid var(--hb-line);
    background: var(--hb-raised);
  }
  .thumb {
    flex: 0 0 auto;
    width: 46px;
    height: 46px;
    border-radius: 11px;
    background: var(--hb-sunken);
    display: grid;
    place-items: center;
    overflow: hidden;
    cursor: pointer;
  }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }
  .thumb svg { width: 22px; height: 22px; fill: var(--hb-muted); }

  .product .info { flex: 1 1 auto; min-width: 0; cursor: pointer; }
  .product .info .name { font-size: 0.9375rem; font-weight: 600; line-height: 1.3; overflow-wrap: anywhere; }
  .product .info .code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
    color: var(--hb-muted);
  }
  .product .side { flex: 0 0 auto; display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .chip {
    padding: 3px 9px;
    border-radius: 999px;
    background: var(--hb-sunken);
    color: var(--hb-muted);
    font-size: 0.6875rem;
    font-weight: 500;
    max-width: 11ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .product .actions { display: flex; gap: 0; }
  .product .actions .icon-btn { width: 30px; height: 30px; }
  .product .actions svg { width: 18px; height: 18px; }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 26px 8px;
    text-align: center;
    color: var(--hb-muted);
    font-size: 0.875rem;
  }
  .empty p { margin: 0; max-width: 38ch; }

  /* Dialogs ----------------------------------------------------------- */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.55);
  }
  .dialog {
    width: min(420px, 100%);
    max-height: min(90vh, 760px);
    display: flex;
    flex-direction: column;
    background: var(--hb-surface);
    color: var(--hb-fg);
    border-radius: 18px;
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
  }
  .dialog h3 { margin: 0; padding: 18px 18px 8px; font-size: 1.1rem; font-weight: 600; }
  .dialog .content { padding: 8px 18px 16px; overflow: auto; }
  .dialog .content label { display: block; margin-bottom: 6px; font-size: 0.8125rem; color: var(--hb-muted); }
  .dialog .content input[type='text'] {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 1rem;
    color: var(--hb-fg);
    background: var(--hb-sunken);
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    padding: 11px 13px;
    margin-bottom: 14px;
  }
  .dialog .actions { display: flex; justify-content: flex-end; gap: 8px; padding: 6px 18px 18px; }
  .dialog .hint { font-size: 0.8125rem; color: var(--hb-muted); margin: 0 0 12px; }

  .code-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .code-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 8px 7px 12px;
    border-radius: 10px;
    background: var(--hb-sunken);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.8125rem;
  }
  .code-list ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  .code-list .first { color: var(--hb-muted); font-family: inherit; font-size: 0.6875rem; }
  .code-list button { color: var(--hb-muted); padding: 4px; }
  .code-list button:hover { color: var(--hb-danger); }
  .code-list button svg { width: 15px; height: 15px; }

  .similar { margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--hb-line); }
  .similar > p { font-size: 0.8125rem; color: var(--hb-muted); margin: 0 0 10px; }
  .similar .option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    margin-bottom: 6px;
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    background: var(--hb-raised);
    text-align: start;
  }
  .similar .option:hover { border-color: var(--hb-accent); }
  .similar .option .thumb { width: 34px; height: 34px; border-radius: 9px; cursor: inherit; }
  .similar .option .thumb svg { width: 17px; height: 17px; }
  .similar .option .who { min-width: 0; flex: 1 1 auto; }
  .similar .option .who .name { font-size: 0.875rem; font-weight: 600; overflow-wrap: anywhere; }
  .similar .option .who .meta { font-size: 0.6875rem; color: var(--hb-muted); }

  .photo-top { text-align: center; }
  .photo-top label { display: block; }
  .photo-box {
    position: relative;
    width: 124px;
    height: 124px;
    margin: 0 auto 16px;
  }
  .photo-add {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    gap: 6px;
    border: 1px dashed var(--hb-line);
    border-radius: 18px;
    background: var(--hb-sunken);
    color: var(--hb-muted);
  }
  .photo-add:hover { color: var(--hb-accent); border-color: var(--hb-accent); }
  .photo-add svg { width: 34px; height: 34px; }
  .photo-preview {
    width: 100%;
    height: 100%;
    border-radius: 18px;
    overflow: hidden;
    background: var(--hb-sunken);
  }
  .photo-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .photo-remove {
    position: absolute;
    top: -9px;
    right: -9px;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--hb-danger);
    color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  }
  .photo-remove svg { width: 17px; height: 17px; }
  .dialog input[type='file'] { display: none; }

  /* Details sheet ------------------------------------------------------ */
  .dialog.wide { width: min(560px, 100%); }
  .details-head { display: flex; gap: 14px; margin-bottom: 16px; }
  .details-head .shot {
    flex: 0 0 auto;
    width: 96px;
    height: 96px;
    border-radius: 16px;
    overflow: hidden;
    background: var(--hb-sunken);
    display: grid;
    place-items: center;
  }
  .details-head .shot img { width: 100%; height: 100%; object-fit: contain; }
  .details-head .shot svg { width: 28px; height: 28px; fill: var(--hb-muted); }
  .details-head .who { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .details-head .who .name { font-size: 1.05rem; font-weight: 600; line-height: 1.25; }
  .details-head .who .sub { font-size: 0.8125rem; color: var(--hb-muted); }
  .details-head .who .code {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
    color: var(--hb-muted);
  }
  .details-head .who .code .chip { font-family: inherit; max-width: none; }

  .grades { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .grade {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px 7px 8px;
    border-radius: 12px;
    background: var(--hb-sunken);
  }
  .grade .letter {
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
  }
  .grade .letter.a { background: #038141; }
  .grade .letter.b { background: #85bb2f; color: #10240b; }
  .grade .letter.c { background: #fecb02; color: #3b2f00; }
  .grade .letter.d { background: #ee8100; }
  .grade .letter.e { background: #e63e11; }
  .grade .letter.n1 { background: #00a24d; }
  .grade .letter.n2 { background: #ffc832; color: #3b2f00; }
  .grade .letter.n3 { background: #ff8714; }
  .grade .letter.n4 { background: #e63e11; }
  .grade .meaning { display: flex; flex-direction: column; line-height: 1.2; }
  .grade .meaning b { font-size: 0.75rem; font-weight: 600; }
  .grade .meaning span { font-size: 0.6875rem; color: var(--hb-muted); }

  .details h4 {
    margin: 18px 0 8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--hb-muted);
  }
  .details p { margin: 0; font-size: 0.875rem; line-height: 1.5; }

  .facts { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .facts td { padding: 7px 0; border-bottom: 1px solid var(--hb-line); }
  .facts tr:last-child td { border-bottom: none; }
  .facts td + td { text-align: end; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .facts .indent { padding-inline-start: 14px; color: var(--hb-muted); }

  .about { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; font-size: 0.875rem; }
  .about dt { color: var(--hb-muted); }
  .about dd { margin: 0; overflow-wrap: anywhere; }

  .details .source {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid var(--hb-line);
    font-size: 0.75rem;
    color: var(--hb-muted);
  }
  .details .source a { color: var(--hb-accent); }

  /* Camera ------------------------------------------------------------ */
  /* The box is its full size before the stream arrives, so the sheet does
     not jump when it does. */
  .camera {
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: 58vh;
    margin-inline: auto;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
  }
  .camera video {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .camera.live video { opacity: 1; }
  /* The frame only means something once there is a picture in it. */
  .camera .reticle { opacity: 0; transition: opacity 0.15s ease; }
  .camera.live .reticle { opacity: 1; }
  .camera:not(.live) { cursor: pointer; }
  .camera + .hint { margin-top: 10px; }
  .camera .reticle {
    position: absolute;
    inset: 22% 10%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 10px;
    pointer-events: none;
  }

  .toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    z-index: 20;
    max-width: min(90vw, 420px);
    padding: 12px 16px;
    border-radius: 12px;
    background: #323232;
    color: #fff;
    font-size: 0.875rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  .toast.error { background: var(--hb-danger); }

  /* Editor ------------------------------------------------------------ */
  .editor { display: flex; flex-direction: column; gap: 16px; padding: 8px 0; }
  .editor .field { display: flex; flex-direction: column; gap: 6px; }
  .editor .field > span { font-size: 0.8125rem; color: var(--hb-muted); }
  .editor .field small { font-size: 0.75rem; color: var(--hb-muted); }
  .editor input[type='text'] {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 1rem;
    color: var(--hb-fg);
    background: var(--hb-sunken);
    border: 1px solid var(--hb-line);
    border-radius: 12px;
    padding: 10px 12px;
  }
  .editor .toggle { display: flex; align-items: center; gap: 12px; font-size: 0.9375rem; cursor: pointer; }
  .editor .toggle input { flex: 0 0 auto; width: 20px; height: 20px; margin: 0; accent-color: var(--hb-accent); }

  @media (max-width: 380px) {
    .chip { display: none; }
  }
`;

/* ------------------------------------------------------------------ *
 * DOM helpers, dialogs and toasts
 * ------------------------------------------------------------------ */

const SVG_NS = 'http://www.w3.org/2000/svg';

const ICONS = {
  basket:
    'M22 9h-4.79l-4.38-6.56a1 1 0 0 0-1.66 0L6.79 9H2a1 1 0 0 0-.96 1.27l2.54 9.27A2 2 0 0 0 5.5 21h13a2 2 0 0 0 1.92-1.46l2.54-9.27A1 1 0 0 0 22 9zM12 4.8 14.8 9H9.2L12 4.8zM12 17a2 2 0 0 1-2-2v-2a2 2 0 0 1 4 0v2a2 2 0 0 1-2 2z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  camera:
    'M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  cart:
    'M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 18zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18zM7.17 14.75l.03-.12.9-1.63h7.45a2 2 0 0 0 1.75-1.03l3.58-6.49-1.74-.96-3.59 6.48H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44A1.99 1.99 0 0 0 7 17h12v-2H7.42a.25.25 0 0 1-.25-.25z',
  pencil:
    'M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z',
  trash:
    'M9 3v1H4v2h1v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm2 5h2v10h-2V8zm-4 0h2v10H7V8zm8 0h2v10h-2V8z',
  filter: 'M3 5h18v2H3V5zm4 6h10v2H7v-2zm3 6h4v2h-4v-2z',
  image:
    'M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H3l4.5-6 3 4L14 13l7 6z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
};

/** Build an inline SVG icon element. */
function icon(name) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', ICONS[name] || '');
  svg.appendChild(path);
  return svg;
}

/** The outlined scanner drawing on the big scan tile. */
function scannerGlyph() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const corners = 'M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3';
  const bars = 'M7 8v8M10 8v8M13 8v8M17 8v8';
  for (const d of [corners, bars]) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
  }
  const beam = document.createElementNS(SVG_NS, 'path');
  beam.setAttribute('d', 'M4 12h16');
  beam.setAttribute('class', 'beam');
  beam.setAttribute('stroke-linecap', 'round');
  svg.appendChild(beam);
  return svg;
}

/**
 * Draw a barcode-like graphic for a code.
 *
 * This is decoration, not a scannable barcode: the bar widths come from the
 * digits of the code so the same product always looks the same.
 */
function barcodeGlyph(code) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'barcode');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');

  const digits = String(code).replace(/\D/g, '') || '1234567890';
  let x = 0;
  for (let i = 0; i < digits.length * 2; i += 1) {
    const digit = Number(digits[i % digits.length]);
    const width = 1 + (digit % 3);
    if (i % 2 === 0) {
      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', 0);
      rect.setAttribute('width', width);
      rect.setAttribute('height', 10);
      rect.setAttribute('fill', 'currentColor');
      svg.appendChild(rect);
    }
    x += width;
  }
  svg.setAttribute('viewBox', `0 0 ${x} 10`);
  return svg;
}

/** Split a product name into the words worth comparing. */
function tokenize(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .split(' ')
      // Sizes are what separates variants of the same product, so they are
      // exactly what must not count: short words, bare numbers, and numbers
      // carrying a unit like 400g, 750ml or 1l.
      .filter((word) => word.length > 2 && !/^\d+\p{L}{0,3}$/u.test(word)),
  );
}

/**
 * Products that look like the same thing under a different barcode.
 *
 * Compares the words of the name and brand, so "Кисело мляко Верея 400 г"
 * finds "Кисело мляко Верея 900 г" without matching every other yoghurt.
 */
function similarProducts(name, brand, products, { exclude, limit = 4 } = {}) {
  const wanted = tokenize([name, brand].filter(Boolean).join(' '));
  if (!wanted.size) return [];

  // Words shared by many products say little about identity. In a fridge full
  // of "мляко Верея", what distinguishes a product is "кисело" - so each word
  // counts for less the more products already use it.
  const seen = new Map();
  const catalogue = products.map((product) => {
    const words = tokenize([product.name, product.brand].filter(Boolean).join(' '));
    for (const word of words) seen.set(word, (seen.get(word) || 0) + 1);
    return { product, words };
  });
  const weigh = (word) => 1 / (1 + (seen.get(word) || 0));
  const total = (words) => [...words].reduce((sum, word) => sum + weigh(word), 0);

  const scored = [];
  for (const { product, words } of catalogue) {
    if (product.code === exclude || !words.size) continue;

    const shared = [...wanted].filter((word) => words.has(word));
    if (!shared.length) continue;

    // Weighted Jaccard, lifted when one name spells out everything the other
    // does - a smaller pack usually differs only by its size.
    const union = total(new Set([...wanted, ...words]));
    const contained = shared.length === wanted.size || shared.length === words.size;
    const score = total(shared) / union + (contained ? 0.25 : 0);
    if (score >= 0.45) scored.push({ product, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}

/** One of the Open Food Facts score badges. */
function gradeBadge(tone, letter, label, meaning) {
  return el(
    'div',
    { class: 'grade' },
    el('span', { class: `letter ${tone}`, text: letter }),
    el(
      'span',
      { class: 'meaning' },
      el('b', { text: label }),
      meaning ? el('span', { text: meaning }) : null,
    ),
  );
}

/** Create an element with attributes, classes and children in one call. */
function el(tag, options = {}, ...children) {
  const node = document.createElement(tag);
  const { class: className, text, on, ...attrs } = options;
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null || value === false) continue;
    node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const [event, handler] of Object.entries(on || {})) {
    node.addEventListener(event, handler);
  }
  node.append(...children.filter(Boolean));
  return node;
}

/** An icon-only button. */
function iconButton(name, label, onClick, extraClass = '') {
  return el(
    'button',
    {
      class: `icon-btn ${extraClass}`.trim(),
      title: label,
      'aria-label': label,
      on: { click: onClick },
    },
    icon(name),
  );
}

/**
 * Show a modal inside the card's shadow root.
 * `build(body, close)` fills the content and may return a cleanup function.
 */
function openDialog(root, { title, build, buttons, wide }) {
  const backdrop = el('div', { class: 'backdrop' });
  const dialog = el('div', {
    class: wide ? 'dialog wide' : 'dialog',
    role: 'dialog',
    'aria-modal': 'true',
  });
  const content = el('div', { class: 'content' });
  const actions = el('div', { class: 'actions' });

  const close = () => {
    document.removeEventListener('keydown', onKey);
    backdrop.remove();
  };
  const onKey = (event) => {
    if (event.key === 'Escape') close();
  };

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) close();
  });
  document.addEventListener('keydown', onKey);

  dialog.append(el('h3', { text: title }), content, actions);
  backdrop.appendChild(dialog);

  const cleanup = build(content, close) || (() => {});
  for (const { label, primary, start, onClick } of buttons) {
    const button = el('button', {
      class: primary ? 'btn primary' : 'btn',
      text: label,
      on: { click: () => onClick(close) },
    });
    // `start` pins a button to the left of the footer, away from the
    // confirm/cancel pair.
    if (start) button.style.marginInlineEnd = 'auto';
    actions.appendChild(button);
  }

  root.appendChild(backdrop);
  content.querySelector('input[type="text"]')?.focus();

  return () => {
    cleanup();
    close();
  };
}

/** Ask a yes/no question. Resolves to true when confirmed. */
function confirmDialog(root, t, { title, message, confirmLabel }) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result, close) => {
      if (settled) return;
      settled = true;
      resolve(result);
      close();
    };

    openDialog(root, {
      title,
      build: (content) => {
        content.appendChild(el('p', { class: 'hint', text: message }));
      },
      buttons: [
        { label: t.cancel, onClick: (close) => finish(false, close) },
        {
          label: confirmLabel || t.delete,
          primary: true,
          onClick: (close) => finish(true, close),
        },
      ],
    });
  });
}

/** Show a short message at the bottom of the screen. */
function toast(root, message, isError = false) {
  root.querySelector('.toast')?.remove();
  const node = el('div', { class: isError ? 'toast error' : 'toast', text: message });
  root.appendChild(node);
  setTimeout(() => node.remove(), isError ? 5000 : 3000);
}

/**
 * Read a picked file and return it as a downscaled JPEG data URL.
 *
 * Phone cameras produce multi-megabyte images; the card only ever shows a
 * thumbnail, so shrinking before upload keeps the stored photos small.
 */
function readPhoto(file, maxSize = 320) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('unreadable'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('unreadable'));
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ *
 * Camera scanning
 *
 * Uses the browser's native BarcodeDetector when available (Chrome, Edge and
 * the Android Home Assistant Companion app). Browsers without it - Safari and
 * therefore iOS - can fall back to a ZXing build, but only when the card is
 * configured with an explicit `zxing_url`, so nothing is pulled from a third
 * party behind your back.
 * ------------------------------------------------------------------ */

const FORMATS = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'itf', 'qr_code'];

/** Report why scanning is unavailable, or null when it should work. */
function scannerUnavailableReason(config, t) {
  if (!window.isSecureContext) return t.cameraInsecure;
  if (!navigator.mediaDevices?.getUserMedia) return t.cameraUnsupported;
  if (!('BarcodeDetector' in window) && !config.zxing_url) return t.cameraNoDetector;
  return null;
}

async function createDetector(config) {
  if ('BarcodeDetector' in window) {
    const supported = await window.BarcodeDetector.getSupportedFormats();
    const formats = FORMATS.filter((format) => supported.includes(format));
    const detector = new window.BarcodeDetector(formats.length ? { formats } : undefined);
    return async (video) => {
      const [first] = await detector.detect(video);
      return first?.rawValue || null;
    };
  }

  const zxing = await import(/* webpackIgnore: true */ config.zxing_url);
  const library = zxing.default || zxing;
  const reader = new library.BrowserMultiFormatReader();
  const canvas = document.createElement('canvas');
  return async (video) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (!canvas.width || !canvas.height) return null;
    canvas.getContext('2d').drawImage(video, 0, 0);
    try {
      return reader.decodeFromCanvas(canvas)?.getText() || null;
    } catch {
      return null; // No barcode in this frame.
    }
  };
}

/**
 * Open the camera and resolve with the first code that is read.
 * Resolves with null when the user closes the dialog.
 */
function scanWithCamera(root, config, t) {
  return new Promise((resolve) => {
    let stream = null;
    let timer = null;
    let settled = false;

    let frame = null;
    const stop = () => {
      clearInterval(timer);
      stream?.getTracks().forEach((track) => track.stop());
      stream = null;
      frame?.classList.remove('live');
    };
    const finish = (code, close) => {
      if (settled) return;
      settled = true;
      stop();
      resolve(code);
      close();
    };

    openDialog(root, {
      title: t.cameraTitle,
      build: (content, close) => {
        const video = el('video', { playsinline: true, muted: true, autoplay: true });
        const status = el('p', { class: 'hint', text: t.cameraStarting });
        // Opened from a home screen shortcut there is no tap on the page
        // itself, and some browsers only hand over the camera after one, so
        // a failed start offers the tap rather than being a dead end.
        const retry = el('button', { class: 'btn block', text: t.cameraRetry, hidden: true });
        // A video element with nothing in it paints its own ground - white
        // here, a grey play button there - so it stays invisible until there
        // is a picture, and the black box shows in its place.
        frame = el('div', { class: 'camera' }, video, el('div', { class: 'reticle' }));
        content.append(
          frame,
          status,
          retry,
        );

        let tapped = false;
        const start = async () => {
          stop();
          retry.hidden = true;
          status.textContent = t.cameraStarting;
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: { ideal: 'environment' } },
              audio: false,
            });
            video.srcObject = stream;
            await video.play();
            frame.classList.add('live');

            const detect = await createDetector(config);
            status.textContent = t.cameraAim;

            timer = setInterval(async () => {
              if (settled || video.readyState < 2) return;
              let code = null;
              try {
                code = await detect(video);
              } catch (err) {
                clearInterval(timer);
                status.textContent = t.cameraFailed(err.message);
                retry.hidden = false;
                return;
              }
              if (code) {
                navigator.vibrate?.(80);
                finish(code, close);
              }
            }, 300);
          } catch (err) {
            // Opened from a home screen shortcut, nothing on the page has been
            // tapped yet, and a browser will not hand over the camera before
            // that. That is not a refusal - it just needs the tap.
            if (err.name === 'NotAllowedError') {
              status.textContent = tapped ? t.cameraDenied : t.cameraNeedsTap;
            } else {
              status.textContent = t.cameraFailed(err.message);
            }
            retry.hidden = false;
          }
        };

        const startByHand = () => {
          tapped = true;
          start();
        };
        retry.addEventListener('click', startByHand);
        frame.addEventListener('click', () => {
          if (!frame.classList.contains('live')) startByHand();
        });
        start();

        return stop; // Runs when the dialog is dismissed.
      },
      buttons: [{ label: t.close, onClick: (close) => finish(null, close) }],
    });
  });
}

/* ------------------------------------------------------------------ *
 * The card
 * ------------------------------------------------------------------ */

/**
 * A home screen shortcut can open a dashboard with ?homebasket=scan on the
 * end, and the first card on the page goes straight to the camera - one tap
 * from the phone's home screen to a barcode.
 *
 * The flag is read once and wiped from the address, so moving around the
 * dashboard afterwards does not keep reopening the camera.
 */
function consumeScanRequest() {
  try {
    const url = new URL(window.location.href);
    const asked =
      url.searchParams.get('homebasket') === 'scan' || url.hash === '#homebasket-scan';
    if (!asked) return false;

    url.searchParams.delete('homebasket');
    if (url.hash === '#homebasket-scan') url.hash = '';
    window.history.replaceState(window.history.state, '', url.toString());
    return true;
  } catch {
    return false; // No address to read: nothing was asked for.
  }
}

const DEFAULT_CONFIG = {
  title: null,
  language: null,
  add_on_scan: true,
  open_known: false,
  scan_on_open: false,
  show_recent: true,
  show_products: true,
  zxing_url: null,
};

const RECENT_LIMIT = 8;

class HomeBasketCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = { ...DEFAULT_CONFIG };
    this._state = {
      mappings: [],
      pending: [],
      recent: [],
      last_scan: null,
      todo_entity: null,
    };
    this._recent = [];
    this._photos = new Map();
    this._loadingPhotos = new Set();
    this._filter = '';
    this._searchOpen = false;
    this._busy = false;
    this._cameraOpen = false;
    this._unsubscribe = null;
    this._rendered = false;
  }

  /* ---------------- Lovelace plumbing ---------------- */

  static getConfigElement() {
    return document.createElement('homebasket-card-editor');
  }

  static getStubConfig() {
    return { type: 'custom:homebasket-card' };
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    if (this._rendered) this._render();
  }

  getCardSize() {
    return this._config.show_products ? 9 : 4;
  }

  get _t() {
    return stringsFor(this._config.language || this._hass?.locale?.language);
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) {
      this._build();
      this._connect();
    }
  }

  connectedCallback() {
    if (this._hass && !this._unsubscribe) this._connect();
  }

  disconnectedCallback() {
    this._unsubscribe?.then((off) => off());
    this._unsubscribe = null;
  }

  /* ---------------- Backend ---------------- */

  async _call(type, payload = {}) {
    return this._hass.connection.sendMessagePromise({ type, ...payload });
  }

  async _connect() {
    await this._refresh();
    this._unsubscribe = this._hass.connection.subscribeEvents(
      () => this._refresh(),
      'homebasket_updated',
    );

    // A card sitting on its own view is the scanner, so opening the view is
    // opening the camera. The address does the same for a shortcut pointing
    // at a dashboard that is used for other things too.
    if (this._config.scan_on_open || consumeScanRequest()) this._openCamera();
  }

  async _refresh() {
    try {
      this._state = await this._call('homebasket/state');
      this._error = null;
    } catch (err) {
      // 'unknown_command' means the integration never registered its
      // WebSocket API, which in practice means it is not set up at all.
      this._error =
        err?.code === 'unknown_command' ? this._t.notSetUp : err?.message || this._t.noAnswer;
    }
    this._render();
  }

  /** Fetch a locally stored photo once and hand it to the given <img>. */
  _fillPhoto(code, image) {
    if (this._photos.has(code)) {
      image.src = this._photos.get(code);
      return;
    }
    if (this._loadingPhotos.has(code)) return;

    this._loadingPhotos.add(code);
    this._call('homebasket/photo/get', { code })
      .then(({ photo }) => {
        if (!photo) return;
        this._photos.set(code, photo);
        image.src = photo;
        image.hidden = false;
      })
      .catch(() => {})
      .finally(() => this._loadingPhotos.delete(code));
  }

  /* ---------------- Actions ---------------- */

  _remember(result) {
    this._recent = [result, ...this._recent.filter((item) => item.code !== result.code)].slice(
      0,
      RECENT_LIMIT,
    );
  }

  async _submit(rawCode) {
    const code = (rawCode || '').trim();
    if (!code || this._busy) return;

    // A code that is already known can also just be a search term.
    const t = this._t;
    this._busy = true;
    this._render();
    try {
      const result = await this._call('homebasket/scan', {
        code,
        add_to_list: this._config.add_on_scan,
      });
      this._remember(result);

      if (result.status === 'unknown' && !result.name) {
        await this._openProductDialog(code, null);
      } else {
        // A list that counts what is on it says how many there are now; a
        // plain to-do list can only say it is there.
        if (result.increased)
          toast(this.shadowRoot, t.countedUp(result.name, result.quantity ?? ''));
        else if (result.already_on_list)
          toast(this.shadowRoot, t.alreadyOnList(result.name));
        else if (result.added) toast(this.shadowRoot, t.addedToList(result.name));
        else toast(this.shadowRoot, t.savedAs(result.name));

        // Open Food Facts just created this one. If the shelf already holds
        // what looks like the same thing under another barcode, say so now -
        // otherwise stay out of the way.
        if (result.status === 'looked_up') await this._offerMerge(result);
        else if (result.status === 'known') await this._openKnown(result);
      }
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    } finally {
      this._busy = false;
      this._input.value = '';
      await this._refresh();
    }
  }

  /**
   * Open the product sheet: name, category and photo.
   * `existing` is null for a code that has just been scanned.
   */
  async _openProductDialog(code, existing, options = {}) {
    const t = this._t;
    const isNew = !existing;
    // A product Open Food Facts has just created is not "new" for the form -
    // it already has a name - but it should still offer a merge.
    const { offerSimilar = isNew, title = null } = options;

    // Two separate sources: a photo stored on this Home Assistant, and the
    // picture Open Food Facts supplied. A local one wins when both exist.
    let photoData = existing?.has_photo ? this._photos.get(code) || null : null;
    let photoUrl = existing?.image || null;
    let photoTouched = false;

    const saved = await new Promise((resolve) => {
      let nameInput;
      let categoryInput;
      let reanalyse = () => {};
      let settled = false;
      const finish = (value, close) => {
        if (settled) return;
        settled = true;
        resolve(value);
        close();
      };

      openDialog(this.shadowRoot, {
        title: title || (isNew ? t.newProduct : t.editProduct),
        build: (content, close) => {
          content.appendChild(
            el('p', {
              class: 'hint',
              text: isNew ? t.unknownBarcode(code) : t.barcodeIs(code),
            }),
          );

          content.appendChild(el('label', { text: t.productName }));
          nameInput = el('input', { type: 'text', value: existing?.name || '' });
          nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') event.preventDefault();
          });
          content.appendChild(nameInput);

          content.appendChild(el('label', { text: t.category }));
          categoryInput = el('input', { type: 'text', value: existing?.category || '' });
          content.appendChild(categoryInput);

          // One file input covers both the camera and the gallery: `capture`
          // asks for the camera where there is one.
          const file = el('input', {
            type: 'file',
            accept: 'image/*',
            capture: 'environment',
          });
          file.addEventListener('change', async () => {
            const [picked] = file.files || [];
            if (!picked) return;
            try {
              photoData = await readPhoto(picked);
              photoTouched = true;
              drawPhoto();
            } catch {
              toast(this.shadowRoot, t.photoTooBig, true);
            }
            file.value = '';
          });

          // Either the square add button or the picture in its place, never
          // both. Nothing here is written until Save.
          const box = el('div', { class: 'photo-box' });
          const drawPhoto = () => {
            const source = photoData || photoUrl;
            if (!source) {
              box.replaceChildren(
                el(
                  'button',
                  {
                    class: 'photo-add',
                    title: t.takePhoto,
                    'aria-label': t.takePhoto,
                    on: { click: () => file.click() },
                  },
                  icon('camera'),
                ),
              );
              return;
            }

            const image = el('img', { src: source, alt: '' });
            image.addEventListener('error', () => {
              photoUrl = null;
              drawPhoto();
            });
            box.replaceChildren(
              el('div', { class: 'photo-preview' }, image),
              el(
                'button',
                {
                  class: 'photo-remove',
                  title: t.removePhoto,
                  'aria-label': t.removePhoto,
                  on: {
                    click: () => {
                      photoData = null;
                      photoUrl = null;
                      photoTouched = true;
                      drawPhoto();
                    },
                  },
                },
                icon('close'),
              ),
            );
          };
          drawPhoto();

          // A stored photo arrives asynchronously; redraw once it is here.
          if (existing?.has_photo && !photoData) {
            this._call('homebasket/photo/get', { code })
              .then(({ photo }) => {
                if (!photo || photoTouched) return;
                this._photos.set(code, photo);
                photoData = photo;
                drawPhoto();
              })
              .catch(() => {});
          }

          reanalyse = async () => {
            toast(this.shadowRoot, t.lookingUp);
            try {
              const found = await this._call('homebasket/lookup', { code });
              if (!found.found) {
                toast(this.shadowRoot, t.lookupEmpty, true);
                return;
              }
              if (found.name) nameInput.value = found.name;
              if (found.category) categoryInput.value = found.category;
              if (found.image) {
                photoUrl = found.image;
                photoData = null;
                photoTouched = true;
                drawPhoto();
              }
              toast(this.shadowRoot, t.lookedUp);
            } catch (err) {
              toast(this.shadowRoot, err.message || t.scanFailed, true);
            }
          };

          // The picture goes at the top of the sheet, in the middle of it,
          // however far down the code that builds it happens to sit.
          content.prepend(
            el('div', { class: 'photo-top' }, el('label', { text: t.photo }), box, file),
          );

          // Every barcode of this product, each detachable but the first.
          if (existing?.codes?.length > 1) {
            const list = el('ul');
            for (const [index, entry] of existing.codes.entries()) {
              list.appendChild(
                el(
                  'li',
                  {},
                  el('span', { text: entry }),
                  index === 0
                    ? el('span', { class: 'first', text: t.barcodes })
                    : el(
                        'button',
                        {
                          title: t.unlink,
                          'aria-label': t.unlink,
                          on: { click: () => this._unlinkCode(entry, close) },
                        },
                        icon('close'),
                      ),
                ),
              );
            }
            content.append(
              el('label', { text: t.barcodes }),
              el('div', { class: 'code-list' }, list),
            );
          }

          // Products this one might be another barcode of. Rebuilt as the
          // name is typed, so it works whether the name came from Open Food
          // Facts or from the keyboard.
          if (offerSimilar) {
            const suggestions = el('div');
            content.appendChild(suggestions);

            const drawSimilar = () => {
              const matches = similarProducts(
                nameInput.value,
                existing?.brand,
                this._state.mappings,
                { exclude: existing?.code || code },
              );
              if (!matches.length) {
                suggestions.replaceChildren();
                return;
              }

              const section = el(
                'div',
                { class: 'similar' },
                el('h4', { text: t.similar }),
                el('p', { text: t.similarHint }),
              );
              for (const match of matches) {
                const thumb = el('div', { class: 'thumb' });
                const image = el('img', { alt: '', hidden: true });
                thumb.append(image, icon('image'));
                if (match.has_photo) this._fillPhoto(match.code, image);
                else if (match.image) {
                  image.src = match.image;
                  image.hidden = false;
                }

                section.appendChild(
                  el(
                    'button',
                    {
                      class: 'option',
                      on: { click: () => this._linkCode(code, match, close) },
                    },
                    thumb,
                    el(
                      'div',
                      { class: 'who' },
                      el('div', { class: 'name', text: match.name }),
                      el('div', {
                        class: 'meta',
                        text: [match.category, t.codeCount(match.codes?.length || 1)]
                          .filter(Boolean)
                          .join(' · '),
                      }),
                    ),
                  ),
                );
              }
              suggestions.replaceChildren(section);
            };

            nameInput.addEventListener('input', drawSimilar);
            drawSimilar();
          }
        },
        buttons: [
          { label: t.lookUpAgain, start: true, onClick: () => reanalyse() },
          { label: t.cancel, onClick: (close) => finish(null, close) },
          {
            label: isNew ? t.saveAndAdd : t.save,
            primary: true,
            onClick: (close) =>
              finish(
                {
                  name: nameInput.value.trim(),
                  category: categoryInput.value.trim() || null,
                  photoData,
                  photoUrl,
                  photoTouched,
                },
                close,
              ),
          },
        ],
      });
    });

    if (!saved || !saved.name) return;

    try {
      const result = await this._call('homebasket/mapping/save', {
        code,
        name: saved.name,
        category: saved.category,
        // `image` is only sent when the photo changed, so an untouched
        // sheet never clears the picture Open Food Facts supplied.
        ...(saved.photoTouched ? { image: saved.photoUrl } : {}),
        add_to_list: isNew && this._config.add_on_scan,
      });

      if (saved.photoTouched) {
        if (saved.photoData) {
          await this._call('homebasket/photo/set', { code, photo: saved.photoData });
          this._photos.set(code, saved.photoData);
        } else {
          await this._call('homebasket/photo/delete', { code });
          this._photos.delete(code);
        }
      }

      if (result.increased)
        toast(this.shadowRoot, t.countedUp(saved.name, result.quantity ?? ''));
      else if (result.already_on_list) toast(this.shadowRoot, t.alreadyOnList(saved.name));
      else if (result.added) toast(this.shadowRoot, t.addedToList(saved.name));
      else toast(this.shadowRoot, t.savedAs(saved.name));
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    }
    await this._refresh();
  }

  /**
   * Clear one card from the recent scans.
   *
   * A scan waiting to be named lives in the integration, so it has to be
   * dismissed there; anything else is only in this card's own list.
   */
  async _dismissScan(item) {
    this._recent = this._recent.filter((entry) => entry.code !== item.code);
    try {
      // A code waiting for a name lives in the integration's pending list; a
      // recognised scan lives in its recent list. Either way it is not this
      // card's alone to forget.
      await this._call(
        item.needsName ? 'homebasket/pending/dismiss' : 'homebasket/recent/dismiss',
        { code: item.code },
      );
    } catch (err) {
      toast(this.shadowRoot, err.message || this._t.scanFailed, true);
    }
    await this._refresh();
  }

  /** The product a barcode belongs to, whichever of its barcodes it is. */
  _findProduct(code) {
    if (!code) return null;
    const wanted = String(code);
    return (
      this._state.mappings.find((entry) => entry.code === wanted) ||
      this._state.mappings.find((entry) => entry.codes?.includes(wanted)) ||
      null
    );
  }

  /**
   * A barcode the shelf already knows is simply scanned: it lands in the
   * recent strip and on the shopping list, and nothing interrupts the next
   * scan. Turn `open_known` on to have the product open for editing instead.
   */
  async _openKnown(result) {
    if (!this._config.open_known) return;
    await this._refresh();
    const product = this._findProduct(result.product_code || result.code);
    if (!product) return;

    await this._openProductDialog(product.code, product, {
      offerSimilar: false,
      title: this._t.editProduct,
    });
  }

  /**
   * Show the product sheet when a newly created product resembles one that
   * already exists, so the two can be merged into one with two barcodes.
   */
  async _offerMerge(result) {
    await this._refresh();
    const product = this._findProduct(result.product_code || result.code);
    if (!product) return;

    const matches = similarProducts(product.name, product.brand, this._state.mappings, {
      exclude: product.code,
    });
    if (!matches.length) return;

    await this._openProductDialog(product.code, product, {
      offerSimilar: true,
      title: this._t.newProduct,
    });
  }

  /** Attach a freshly scanned barcode to a product that already exists. */
  async _linkCode(code, product, close) {
    const t = this._t;
    close();
    try {
      await this._call('homebasket/alias/add', { code, product: product.code });
      toast(this.shadowRoot, t.linkedTo(product.name));
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    }
    this._recent = this._recent.filter((entry) => entry.code !== code);
    await this._refresh();
  }

  /** Detach one barcode, leaving the product and its other barcodes alone. */
  async _unlinkCode(code, close) {
    const t = this._t;
    close();
    try {
      await this._call('homebasket/alias/remove', { code });
      toast(this.shadowRoot, t.unlinked);
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    }
    await this._refresh();
  }

  async _addToList(item) {
    const t = this._t;
    try {
      // The barcode goes with it, so the list knows which product this is
      // and what the database that knew it says it is.
      const result = await this._call('homebasket/list/add', {
        name: item.name,
        ...(item.code ? { code: item.code } : {}),
      });
      toast(
        this.shadowRoot,
        result.already_on_list ? t.alreadyOnList(item.name) : t.addedToList(item.name),
      );
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    }
  }

  async _forget(item) {
    const t = this._t;
    const confirmed = await confirmDialog(this.shadowRoot, t, {
      title: t.forgetTitle,
      message: t.forgetMessage(item.name || item.code),
    });
    if (!confirmed) return;
    try {
      await this._call('homebasket/mapping/delete', { code: item.code });
      this._photos.delete(item.code);
      this._recent = this._recent.filter((entry) => entry.code !== item.code);
    } catch (err) {
      toast(this.shadowRoot, err.message || t.scanFailed, true);
    }
    await this._refresh();
  }

  async _openCamera() {
    const t = this._t;
    // One camera at a time: a card that opens it by itself and a tap on the
    // scan button would otherwise leave two sheets stacked, the one
    // underneath looking like a scan that never finished.
    if (this._cameraOpen) return;

    const reason = scannerUnavailableReason(this._config, t);
    if (reason) {
      toast(this.shadowRoot, reason, true);
      return;
    }

    this._cameraOpen = true;
    let code = null;
    try {
      code = await scanWithCamera(this.shadowRoot, this._config, t);
    } finally {
      this._cameraOpen = false;
    }
    if (code) await this._submit(code);
  }

  /* ---------------- Details sheet ---------------- */

  /**
   * Everything Open Food Facts knows about a product.
   *
   * The record is fetched once and kept by the integration; opening a product
   * reads that copy. Only "Look up again" goes back out to the network.
   */
  async _openDetails(item) {
    const t = this._t;
    const code = item.code;
    let body;

    const load = async (refresh) => {
      body.replaceChildren(el('div', { class: 'empty', text: t.loading }));
      try {
        const { details } = await this._call('homebasket/details', { code, refresh });
        if (refresh) toast(this.shadowRoot, details ? t.lookedUp : t.lookupEmpty, !details);
        body.replaceChildren(
          details ? this._renderDetails(details, item, t) : el('div', { class: 'empty' }, el('p', { text: t.noDetails })),
        );
        if (refresh && details) await this._refresh();
      } catch (err) {
        body.replaceChildren(el('div', { class: 'empty' }, el('p', { text: err.message || t.noAnswer })));
      }
    };

    openDialog(this.shadowRoot, {
      title: t.details,
      wide: true,
      build: (content) => {
        body = el('div', { class: 'details' });
        content.appendChild(body);
        load(false);
      },
      buttons: [
        { label: t.lookUpAgain, start: true, onClick: () => load(true) },
        {
          label: t.edit,
          onClick: (close) => {
            close();
            const current = this._findProduct(code) || item;
            this._openProductDialog(code, current);
          },
        },
        { label: t.close, primary: true, onClick: (close) => close() },
      ],
    });
  }

  _renderDetails(details, item, t) {
    const rows = [
      [t.barcodes, item.codes?.length > 1 ? item.codes.join(', ') : null],
      [t.fieldBrand, details.brands?.join(', ') || details.brand],
      [t.fieldQuantity, details.quantity],
      [t.fieldServing, details.serving_size],
      [t.fieldCategories, details.categories?.join(' · ')],
      [t.fieldLabels, details.labels?.join(', ')],
      [t.fieldAllergens, details.allergens?.join(', ')],
      [t.fieldTraces, details.traces?.join(', ')],
      [t.fieldPackaging, details.packaging],
      [t.fieldOrigins, details.origins],
      [t.fieldMadeIn, details.manufacturing_places],
      [t.fieldStores, details.stores?.join(', ')],
      [t.fieldCountries, details.countries?.join(', ')],
    ].filter(([, value]) => value);

    const fragment = document.createDocumentFragment();

    // Header: picture, name, what it is, barcode.
    const shot = el('div', { class: 'shot' });
    const picture = details.images?.front || details.image;
    shot.appendChild(picture ? el('img', { src: picture, alt: '', loading: 'lazy' }) : icon('image'));
    fragment.appendChild(
      el(
        'div',
        { class: 'details-head' },
        shot,
        el(
          'div',
          { class: 'who' },
          el('div', { class: 'name', text: item.name || details.label }),
          details.generic_name && details.generic_name !== details.name
            ? el('div', { class: 'sub', text: details.generic_name })
            : null,
          el(
            'div',
            { class: 'code' },
            el('span', { text: details.code }),
            // Which of the two databases knew it, said plainly.
            t.kinds[details.kind]
              ? el('span', { class: 'chip', text: t.kinds[details.kind] })
              : null,
          ),
        ),
      ),
    );

    // Score badges.
    const grades = el('div', { class: 'grades' });
    const { nutriscore, nova, ecoscore } = details.grades || {};
    if (nutriscore) grades.appendChild(gradeBadge(nutriscore, nutriscore, t.nutriScore));
    if (nova) {
      grades.appendChild(gradeBadge(`n${nova}`, String(nova), t.novaGroup, t.novaExplained[nova]));
    }
    if (ecoscore) grades.appendChild(gradeBadge(ecoscore, ecoscore, t.ecoScore));
    if (grades.children.length) fragment.appendChild(grades);

    // Nutrition table.
    if (details.nutriments?.length) {
      const table = el('table', { class: 'facts' });
      const SUB_ROWS = ['saturated-fat', 'sugars'];
      for (const row of details.nutriments) {
        table.appendChild(
          el(
            'tr',
            {},
            el('td', {
              class: SUB_ROWS.includes(row.key) ? 'indent' : '',
              // The backend labels are English; translate by key where we can.
              text: t.nutriments[row.key] || row.label,
            }),
            el('td', { text: `${row.value} ${row.unit}` }),
          ),
        );
      }
      fragment.append(el('h4', { text: t.sectionNutrition }), table);
    }

    if (details.ingredients) {
      fragment.append(
        el('h4', { text: t.sectionIngredients }),
        el('p', { text: details.ingredients }),
      );
    }

    if (rows.length) {
      const list = el('dl', { class: 'about' });
      for (const [label, value] of rows) {
        list.append(el('dt', { text: label }), el('dd', { text: value }));
      }
      fragment.append(el('h4', { text: t.sectionAbout }), list);
    }

    const when = details.fetched
      ? new Date(details.fetched).toLocaleDateString(this._hass?.locale?.language || undefined)
      : '';
    fragment.appendChild(
      el(
        'div',
        { class: 'source' },
        el('span', { text: t.fetchedOn(when) }),
        el('a', {
          href: details.url,
          target: '_blank',
          rel: 'noopener noreferrer',
          text: t.openOn(t.sites[details.kind] || t.sites.food),
        }),
      ),
    );

    return fragment;
  }

  /* ---------------- Rendering ---------------- */

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;

    this._title = el('h2');
    this._count = el('span', { class: 'pill' });
    this._body = el('div', { class: 'body' });
    this._buildScanRow();

    this._card = el(
      'div',
      { class: 'card' },
      el(
        'header',
        {},
        el('div', { class: 'heading' }, this._title, icon('basket')),
        this._count,
      ),
      this._body,
    );

    this.shadowRoot.append(style, this._card);
    this._rendered = true;
    this._render();
  }

  _render() {
    if (!this._rendered) return;
    const t = this._t;

    this._title.textContent = this._config.title || t.title;
    this._count.textContent = this._error ? '' : t.products(this._state.mappings.length);
    this._count.hidden = Boolean(this._error);

    this._body.replaceChildren();

    if (this._error) {
      this._body.appendChild(
        el(
          'div',
          { class: 'empty' },
          el('p', { text: this._error }),
          el('button', { class: 'btn', text: t.tryAgain, on: { click: () => this._refresh() } }),
        ),
      );
      return;
    }

    this._body.appendChild(this._renderScanRow(t));

    if (this._config.show_recent) {
      const recent = this._recentItems();
      if (recent.length) {
        this._body.append(
          el('div', { class: 'section' }, el('h3', { text: t.recent })),
          this._renderRecent(recent, t),
        );
      }
    }

    if (this._config.show_products) this._renderProductSection(t);
  }

  /**
   * Build the scan row once and keep it.
   *
   * It is never re-created, so a backend update arriving mid-typing cannot
   * steal focus or throw away a half-entered barcode.
   */
  _buildScanRow() {
    const t = this._t;

    this._input = el('input', {
      type: 'text',
      inputmode: 'search',
      autocomplete: 'off',
    });
    this._input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') this._submit(event.target.value);
    });
    // Typing filters the product list as you go; Enter still scans.
    this._input.addEventListener('input', (event) => {
      this._filter = event.target.value;
      this._renderProducts();
    });

    this._addButton = iconButton('plus', t.add, () => this._submit(this._input.value));
    this._cameraButton = iconButton('camera', t.scanWithCamera, () => this._openCamera());
    this._scanTile = el(
      'div',
      {
        class: 'scan-tile',
        role: 'button',
        tabindex: '0',
        on: {
          click: () => this._openCamera(),
          keydown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') this._openCamera();
          },
        },
      },
      scannerGlyph(),
    );

    this._scanRow = el(
      'div',
      { class: 'scan' },
      this._scanTile,
      el(
        'div',
        { class: 'scan-main' },
        el('div', { class: 'scan-tools' }, this._addButton, this._cameraButton),
        this._input,
      ),
    );
  }

  _renderScanRow(t) {
    this._input.placeholder = t.scanPlaceholder;
    this._input.setAttribute('aria-label', t.scanPlaceholder);
    this._input.disabled = this._busy;
    this._addButton.disabled = this._busy;
    for (const [node, label] of [
      [this._addButton, t.add],
      [this._cameraButton, t.scanWithCamera],
      [this._scanTile, t.scanWithCamera],
    ]) {
      node.title = label;
      node.setAttribute('aria-label', label);
    }
    return this._scanRow;
  }

  /** Codes worth showing in the strip: unnamed ones first, then this session's scans. */
  _recentItems() {
    const pending = this._state.pending.map((item) => ({ ...item, needsName: true }));
    const seen = new Set(pending.map((item) => item.code));

    // The integration keeps the recent scans, so one made anywhere - this
    // card, a hardware scanner, a shopping list - shows here. What this card
    // just scanned is put in front of them, to save waiting for the refresh.
    const scans = [];
    for (const item of [...this._recent, ...(this._state.recent || [])]) {
      if (seen.has(item.code)) continue;
      seen.add(item.code);
      scans.push(item);
    }
    // Newest first, whichever kind it is: a code waiting for a name is as much
    // a scan as a recognised one, and the last thing scanned is the one being
    // looked for.
    const when = (item) => Date.parse(item.timestamp || item.last_scanned || '') || 0;
    return [...pending, ...scans].sort((a, b) => when(b) - when(a));
  }

  _renderRecent(items, t) {
    const strip = el('div', { class: 'strip' });

    // Dismissing a scan only clears it from this strip. A product that was
    // already saved keeps its entry in the list below.
    const dismiss = (item) =>
      el(
        'button',
        {
          class: 'dismiss',
          title: t.dismissScan,
          'aria-label': t.dismissScan,
          on: { click: () => this._dismissScan(item) },
        },
        icon('close'),
      );

    for (const item of items) {
      if (item.needsName) {
        strip.appendChild(
          el(
            'div',
            { class: 'scan-card' },
            dismiss(item),
            el('span', { class: 'tag muted', text: t.unknown }),
            el('div', { class: 'code', text: item.code }),
            el('button', {
              class: 'btn block',
              text: t.nameIt,
              on: { click: () => this._openProductDialog(item.code, null) },
            }),
          ),
        );
        continue;
      }

      const label = item.increased
        ? t.counted
        : item.added
          ? t.added
          : item.already_on_list
            ? t.onList
            : t.recognised;
      const done = item.added || item.increased;
      const tag = el('span', { class: done ? 'tag' : 'tag muted' });
      if (done) tag.appendChild(icon('check'));
      tag.appendChild(el('span', { text: label }));

      strip.appendChild(
        el(
          'div',
          { class: done ? 'scan-card done' : 'scan-card' },
          dismiss(item),
          tag,
          el('div', { class: 'name', text: item.name || item.code }),
          barcodeGlyph(item.code),
        ),
      );
    }

    return strip;
  }

  _renderProductSection(t) {
    const toggle = iconButton('filter', t.filter, () => {
      this._searchOpen = !this._searchOpen;
      this._render();
      if (this._searchOpen) this.shadowRoot.querySelector('.search-box')?.focus();
    });

    this._body.appendChild(
      el('div', { class: 'section' }, el('h3', { text: t.known }), toggle),
    );

    if (this._searchOpen) {
      const search = el('input', {
        class: 'search-box',
        type: 'search',
        placeholder: t.search,
        'aria-label': t.search,
        value: this._filter,
      });
      search.addEventListener('input', () => {
        this._filter = search.value;
        this._renderProducts(t);
      });
      this._body.appendChild(search);
    }

    this._productHost = el('div');
    this._body.appendChild(this._productHost);
    this._renderProducts(t);
  }

  _renderProducts(t = this._t) {
    if (!this._productHost) return;

    const needle = this._filter.trim().toLowerCase();
    const rows = this._state.mappings
      .filter(
        (item) =>
          !needle ||
          item.code.toLowerCase().includes(needle) ||
          (item.name || '').toLowerCase().includes(needle) ||
          (item.brand || '').toLowerCase().includes(needle) ||
          (item.category || '').toLowerCase().includes(needle),
      )
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    if (!rows.length) {
      this._productHost.replaceChildren(
        el('div', {
          class: 'empty',
          text: this._state.mappings.length ? t.noMatch : t.noProducts,
        }),
      );
      return;
    }

    const list = el('div', { class: 'products' });
    for (const item of rows) list.appendChild(this._renderProduct(item, t));
    this._productHost.replaceChildren(list);
  }

  _renderProduct(item, t) {
    const thumb = el('div', {
      class: 'thumb',
      title: t.edit,
      on: { click: () => this._openProductDialog(item.code, item) },
    });
    const image = el('img', { alt: '', loading: 'lazy', hidden: true });
    thumb.append(image, icon('image'));

    if (item.has_photo) {
      this._fillPhoto(item.code, image);
      if (this._photos.has(item.code)) image.hidden = false;
    } else if (item.image) {
      image.src = item.image;
      image.hidden = false;
      // A dead Open Food Facts URL falls back to the placeholder icon.
      image.addEventListener('error', () => {
        image.hidden = true;
      });
    }

    const side = el('div', { class: 'side' });
    if (item.category) side.appendChild(el('span', { class: 'chip', text: item.category }));
    side.appendChild(
      el(
        'div',
        { class: 'actions' },
        iconButton('cart', t.addToList, () => this._addToList(item)),
        iconButton('pencil', t.edit, () => this._openProductDialog(item.code, item)),
        iconButton('trash', t.forget, () => this._forget(item), 'danger'),
      ),
    );

    return el(
      'div',
      { class: 'product' },
      thumb,
      el(
        'div',
        {
          class: 'info',
          role: 'button',
          tabindex: '0',
          title: t.details,
          on: {
            click: () => this._openDetails(item),
            keydown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') this._openDetails(item);
            },
          },
        },
        el('div', { class: 'name', text: item.name || item.code }),
        el('div', {
          class: 'code',
          text:
            item.codes?.length > 1
              ? `${item.code} · +${item.codes.length - 1}`
              : item.code,
        }),
      ),
      side,
    );
  }
}

/* ------------------------------------------------------------------ *
 * Visual editor
 * ------------------------------------------------------------------ */

const EDITOR_FIELDS = [
  { key: 'title', label: 'Title', type: 'text', hint: 'Leave empty for the default.' },
  {
    key: 'language',
    label: 'Language',
    type: 'text',
    hint: 'bg or en. Empty follows the Home Assistant language.',
  },
  { key: 'add_on_scan', label: 'Add scanned products to the shopping list', type: 'boolean' },
  {
    key: 'open_known',
    label: 'Open the product when a barcode is already known',
    type: 'boolean',
    hint: 'Off by default: a known barcode is scanned onto the list without interrupting.',
  },
  {
    key: 'scan_on_open',
    label: 'Open the camera as soon as this card is shown',
    type: 'boolean',
    hint: 'For a card on its own view, so a home screen shortcut goes straight to the camera.',
  },
  { key: 'show_recent', label: 'Show recent scans', type: 'boolean' },
  { key: 'show_products', label: 'Show the known products list', type: 'boolean' },
  {
    key: 'zxing_url',
    label: 'ZXing URL',
    type: 'text',
    hint: 'Only needed on browsers without a built-in barcode detector, such as Safari and iOS.',
  },
];

class HomeBasketCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = { ...DEFAULT_CONFIG };
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  _update(key, value) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _render() {
    const style = document.createElement('style');
    style.textContent = STYLES;

    const content = el('div', { class: 'editor' });
    for (const field of EDITOR_FIELDS) {
      const value = this._config[field.key];

      if (field.type === 'boolean') {
        const input = el('input', { type: 'checkbox' });
        input.checked = Boolean(value);
        input.addEventListener('change', () => this._update(field.key, input.checked));
        content.appendChild(
          el('label', { class: 'toggle' }, input, el('span', { text: field.label })),
        );
        continue;
      }

      const input = el('input', { type: 'text', value: value ?? '' });
      input.addEventListener('change', () =>
        this._update(field.key, input.value.trim() || null),
      );
      content.appendChild(
        el(
          'label',
          { class: 'field' },
          el('span', { text: field.label }),
          input,
          field.hint ? el('small', { text: field.hint }) : null,
        ),
      );
    }

    this.shadowRoot.replaceChildren(style, content);
  }
}

customElements.define('homebasket-card', HomeBasketCard);
customElements.define('homebasket-card-editor', HomeBasketCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'homebasket-card',
  name: 'HomeBasket',
  preview: false,
  description: 'Scan barcodes straight onto your shopping list.',
  documentationURL: 'https://github.com/ivan1mihaylov/HomeBasket-Card',
});

console.info(
  `%c HOMEBASKET-CARD %c ${VERSION} `,
  'color:#fff;background:#03a9f4;font-weight:700',
  'color:#03a9f4;background:#fff',
);
