/*
  BRONNEN JAVASCRIPT

  Elementen selecteren met querySelector en querySelectorAll:
  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

  Gebeurtenissen afhandelen met addEventListener:
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

  Een modeless dialog openen en sluiten:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

  CSS custom properties aanpassen vanuit JavaScript:
  https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty

  Het winkelmandje na vijf seconden sluiten:
  https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

  Lesvoorbeeld modeless dialog:
  https://codepen.io/shooft/pen/azvKYVZ
*/

/* Elementen van de productpagina */
const productFormulier = document.querySelector(
  'section[aria-labelledby="productnaam"] form',
);

const cartButton = document.querySelector("#cart-button");
const cartDialog = document.querySelector("#cart-dialog");
const cartKeuze = document.querySelector("#cart-keuze");
const cartAantal = document.querySelector("#cart-aantal");
const cartAfbeelding = document.querySelector("#cart-afbeelding");
const gekozenKleurTekst = document.querySelector("#gekozen-kleur");
const maatFout = document.querySelector("#maat-fout");

const productAfbeelding = document.querySelector(
  'section[aria-label="Product images"] img',
);

const kleurKeuzes = document.querySelectorAll('input[name="kleur"]');
const maatKeuzes = document.querySelectorAll('input[name="maat"]');

let aantalProducten = 0;
let cartTimer;

/* Gegevens die bij iedere kleur horen */
const kleuren = {
  black: {
    naam: "Black",
    afbeelding: "images/product2-kleurzwart.png",
    alt: "Black Patta Championship T-Shirt",
    accent: "#111111",
  },

  olive: {
    naam: "Olive",
    afbeelding: "images/product2-kleurolive.png",
    alt: "Olive Patta Championship T-Shirt",
    accent: "#777363",
  },

  white: {
    naam: "White",
    afbeelding: "images/product2-kleurwit.png",
    alt: "White Patta Championship T-Shirt",
    accent: "#777777",
  },
};

/* De grote productfoto en accentkleur veranderen */
kleurKeuzes.forEach((kleurKeuze) => {
  kleurKeuze.addEventListener("change", () => {
    const gekozenKleur = kleuren[kleurKeuze.value];

    productAfbeelding.src = gekozenKleur.afbeelding;
    productAfbeelding.alt = gekozenKleur.alt;

    gekozenKleurTekst.textContent = "Color: " + gekozenKleur.naam;

    document.documentElement.style.setProperty(
      "--kleur-productaccent",
      gekozenKleur.accent,
    );
  });
});

/* De foutmelding verwijderen zodra er een maat wordt gekozen */
maatKeuzes.forEach((maatKeuze) => {
  maatKeuze.addEventListener("change", () => {
    maatFout.textContent = "";
  });
});

/* Alleen uitvoeren wanneer het productformulier bestaat */
if (productFormulier) {
  productFormulier.addEventListener("submit", (event) => {
    event.preventDefault();

    const gekozenKleurInput = document.querySelector(
      'input[name="kleur"]:checked',
    );

    const gekozenMaat = document.querySelector('input[name="maat"]:checked');

    /* Foutmelding als er nog geen maat is gekozen */
    if (!gekozenMaat) {
      maatFout.textContent = "Please select a size.";
      return;
    }

    maatFout.textContent = "";

    const gekozenKleur = kleuren[gekozenKleurInput.value];

    aantalProducten++;

    /* Geselecteerde kleur en maat in het winkelmandje tonen */
    cartKeuze.textContent =
      "Color: " + gekozenKleur.naam + " | Size: " + gekozenMaat.value;

    cartAfbeelding.src = gekozenKleur.afbeelding;
    cartAfbeelding.alt = gekozenKleur.alt;

    /* Het rode bolletje zichtbaar maken en laten knipperen */
    cartAantal.classList.add("actief");
    cartAantal.classList.remove("knipperen");

    /* De animatie opnieuw starten */
    void cartAantal.offsetWidth;

    cartAantal.classList.add("knipperen");

    /* Winkelmandje openen */
    if (!cartDialog.open) {
      cartDialog.show();
    }

    /* Winkelmandje na vijf seconden sluiten */
    clearTimeout(cartTimer);

    cartTimer = setTimeout(() => {
      cartDialog.close();
    }, 5000);
  });

  /* Winkelmandje openen via de Cart-knop */
  cartButton.addEventListener("click", () => {
    clearTimeout(cartTimer);

    if (aantalProducten > 0 && !cartDialog.open) {
      cartDialog.show();
    }
  });

  /* Na een klik blijft het winkelmandje open */
  cartDialog.addEventListener("click", () => {
    clearTimeout(cartTimer);
  });

  /* Winkelmandje met Escape sluiten */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartDialog.open) {
      clearTimeout(cartTimer);
      cartDialog.close();

      /* Focus terugzetten naar de Cart-knop */
      cartButton.focus();
    }
  });
}
