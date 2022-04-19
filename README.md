
# Cíl projektu

Cílem bylo vytvořit klasické pexeso, které vypadá alespoň trochu pěkně a využívá co možná nejvíc různých věcí v Javascriptu.

# Postup implementace, architektura

Protože jsem s psaním aplikací v JS neměl dosud žádné zkušenosti, tak jsem se rozhodl použít Vanilla JS a vrstvenou architekturu, kdy jsem aplikaci rozdělil do následujících vrstev:

- **Model** = Datový stav hry
- **Services** = Logika hry + složitějších operací (např. handling custom obrázku)
- **Pages** = Generování HTML, definice a navěšovaní posluchačů. Jedna page class reprezentuje jednu stránku v aplikaci.

# Popis funkčnosti

Klasické pexeso, do kterého lze nahrát vlastní obrázek a po dohrání si uložit skóre.

- Ukládání skóre (Geolocation API, LocalStorage API, HTML5 forms)
- Nahrávání obrázku (FileAPI)
- Funguje offline (Service worker) a ukazuje, jestli je připojení k internetu
- Responsivní layout
- Audio při obracení kartiček a písnička na pozadí, persistentní nastavení zvuku
- Aplikaci jde bookmarkovat a funguje navigace historie
- Kartičky jsou v SVG. Checkmark, jestli je nahrán custom obrázek v main menu je canvas

Pro vendor prefixy jsem použil tool s názvem **Autoprefixer**. Aplikace funguje na všech prohlížečích požadovaných v hodnotící tabulce (Chrome, Firefox, Edge, Opera). V Safari nefungujou úplně správně animace vybírání kartiček. Nepodařilo se mi ale zjistit proč.

# Ostatní

[Prototyp ve figmě](https://www.figma.com/file/eEnK3ei5BpRN7bN7PHDKyx/Untitled?node-id=0%3A1)

[UML class diagram modelu](https://cacoo.com/diagrams/UTLZgLBSmI3VAOGb/01E75)
