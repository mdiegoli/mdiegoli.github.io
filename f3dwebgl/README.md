01/12/2019:creao tre sfere, clicco in mezzo alla seconda e terza sfera, sposto la sfera interpolata selezionata e mi si creano tante altre sfere.
25/11/2019: se sposto le sfere sui vertici della polilinea creati a mano, o non quelle interpolate, da problemi.

Elaborare una struttura dati fatta da sfere che hanno collegamenti ad altre sfere: se clicco sulle sfere interpolate, la fera selezionata va a sostituire le sfere collegate precedentemente
```
...              ...
  |                 |
sfera             sfera \
  |  <- mouse_down        new sfera
sfera             sfera /
  |                 |
sfera               ...
  |
  ...
```

https://threejsfundamentals.org/threejs/lessons/threejs-picking.html


https://github.com/geomensione/geomensione.github.io/tree/master/threejs

clean and usingi t as superclass form f3dwebgl

todo:

1- implement sketch demo in 3d
  
  1.1- simplified sketch
  
   1.1.1- nell'intersezione degli sketch e nelle estremità, posizionare delle sfere interpolate -> interseco il disegno o gli oggetti creati? Ho bisogno di una librerira per le operazioni booleane?
      
      Disegnando creo degli oggetti: gli sketch in un layer, gli oggetti 3d in un altro livello e le sfere in un terzo. In questo modo sarà possibile modificare il modello intervenendo sui singoli layer.
     
   1.1.2- disegno uno stiky e nelle intersezioni ed estremità posiziono delle sfere

2- using only sphere to modelling bodies

3- focus on performance
