# Product Bio Tech track - Reuben auf dem Brinke

## Week 1
In week 1 ben ik aardig ziek geweest, ik heb 2 van de 4 lessen bijgewoond maar merkte donderdag dat ik nog aardig op rit was. FilterMapObject heb ik nog niet helemaal onder de knie maar het fetchen kan ik al wel.

### Voorbereiding eindopdracht
Ik heb als idee om een interactieve visualisatie te maken voor je eigen spotify statistieken. Ik wil het ook over persoonlijke informatie van mensen doen, het idee is dan dat je kan inloggen en dan voor de nummers die je luistert de mood van dat nummer ophaalt. Zo ontdek je wat je mood is op welk moment van de dag/maand/jaar.

Na een klein onderzoek blijkt de spotify API niet heel geschikt te zijn, zo is de API wat minder uitgebreid geworden afgelopen tijd en is deze iets te ingewikkeld in gebruik.

Het alternatief is LastFM, dit is een API die je activiteit over meerdere platforms opneemt en omzet in data. Alleen is het probleem dat deze niet kan kijken naar de geschiedenis van je luisteractiviteit. Dus zou ik dan voor 3-4 weken mijn eigen activiteit moeten opnemenen en daar visualisaties mee moeten maken. Alleen is dit misschien niet genoeg data. 
Na wat onderzoek ben ik erachter gekomen dat ik in 2-3 weken ongeveer 1.500 datapunten zou hebben. Ik ga dit plan meenemen in overweging maar ga nog even opzoek naar andere plannen.

### Concept 1 (Spotify x LastFM)
Ik wil de API van Spotify en LastFM combineren om zo de geluisterde tracks te combineren met de data van Spotify over de moods van elk nummer. Ik doe dit omdat de Spotify oAuth API niet heel toegankelijk is voor gebruik maar de data over de nummers nog wel toegankelijk is. Zo kan ik mijn eigen luisterdata combineren met de data van de Spotify nummers van de Spotify API.

### Concept 2 (DJ Dachboard)
Het tweede concept zou een DJ Dasboard zijn, in dit dashboard zou de DJ in eerste instantie een radar chart zien die gebruik maakt van BPM en Toonsoort voor de x en y axis en de populariteit van de plaat als grootte. In de radar chart zou je het huidige nummer kunnen kiezen en zou die gehighlight en ingezoomd worden om zo beter de omliggende tracks te zien. Hiernaast zou ik een paar kleine features willen hebben die de DJ zou helpen. 

Origineel wilde ik hier een track matching programma van maken maar dit mocht niet. Dit is omdat het niet datavisualiserend genoeg is, het is dan alleen een algoritme. Dit wil ik aanpassen door er gewoon meerdere visualisaties van te maken.

### Obstakels
Tijdens het ophalen van de data uit de API van spotify liep ik tegen een probleem aan, dit probleem was dat tijdens het ophalen van de lijst van audiofeatures van bepaalde tracks, ik een foutmelding kreeg. De fout klonk als volgt: Fout: data.audio_features is not iterable (cannot read property undefined). 

Na heel lang proberen de errors te fixen bleef ik maar vastzitten op 1 bepaalde error, deze error was de 403 die betekent dat ik geen toegang heb tot de endpoint. Dus zal ik of verdere toegang moeten aanvragen of zal ik een andere api moeten zoeken die bpm key etc kan gebruiken en dan die matchen met de tracks die komen uit de playlist endpoint.