const productFormulier = document.querySelector(
  'section[aria-labelledby="productnaam"] form',
);

const cartButton = document.querySelector("#cart-button");
const cartDialog = document.querySelector("#cart-dialog");
const cartKeuze = document.querySelector("#cart-keuze");
const cartAantal = document.querySelector("#cart-aantal");

let aantalProducten = 0;
let cartTimer;

/* Product toevoegen */

productFormulier.addEventListener("submit", (event) => {
  event.preventDefault();

  const gekozenKleur = document.querySelector('input[name="kleur"]:checked');

  const gekozenMaat = document.querySelector('input[name="maat"]:checked');

  if (!gekozenMaat) {
    alert("Kies eerst een maat.");
    return;
  }

  aantalProducten++;

  cartKeuze.textContent =
    "Color: " + gekozenKleur.value + " | Size: " + gekozenMaat.value;

  cartAantal.classList.add("actief");
  cartAantal.classList.remove("knipperen");

  void cartAantal.offsetWidth;

  cartAantal.classList.add("knipperen");

  if (!cartDialog.open) {
    cartDialog.show();
  }

  clearTimeout(cartTimer);

  cartTimer = setTimeout(() => {
    cartDialog.close();
  }, 5000);
});

/* Winkelmandje openen via Cart */

cartButton.addEventListener("click", () => {
  clearTimeout(cartTimer);

  if (aantalProducten > 0 && !cartDialog.open) {
    cartDialog.show();
  }
});

/* Als je op de dialog klikt, blijft hij open */

cartDialog.addEventListener("click", () => {
  clearTimeout(cartTimer);
});

/************************/
/* PRODUCTKLEUR KIEZEN */
/************************/

const kleurKeuzes = document.querySelectorAll(
	'input[name="kleur"]'
);

const productAfbeelding = document.querySelector(
	'section[aria-label="Productfoto\'s"] img'
);

const gekozenKleurTekst = document.querySelector(
	"#gekozen-kleur"
);

const kleuren = {
	black: {
		naam: "Black",
		afbeelding: "images/product3kleurzwartkeuze.png",
		alt: "Zwart Patta Championship T-Shirt",
	},

	olive: {
		naam: "Olive",
		afbeelding: "images/product2-kleurolive.png",
		alt: "Olijfgroen Patta Championship T-Shirt",
	},

	white: {
		naam: "White",
		afbeelding: "images/product3kleurwitkeuze.png",
		alt: "Wit Patta Championship T-Shirt",
	},
};

kleurKeuzes.forEach((kleurKeuze) => {
	kleurKeuze.addEventListener("change", () => {
		const gekozenKleur = kleuren[kleurKeuze.value];

		productAfbeelding.src = gekozenKleur.afbeelding;
		productAfbeelding.alt = gekozenKleur.alt;

		gekozenKleurTekst.textContent =
			"Color: " + gekozenKleur.naam;
	});
});