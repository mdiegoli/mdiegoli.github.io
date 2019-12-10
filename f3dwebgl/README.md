10/12/2019:
'''
When I add a sphere? When I click on plane.

What happen when I add a sphere? I create a new ring in chain. 
  A ring has a references to a sphere and to other rings,so:
    add refernce to sphere
    if first node back and head is empty
    else back = 'prev node' and 'prev node'.head = this 
    for every ring -1
      interpolate ring - ring+1 with name interp_ring_ring+1
      
      0
        interpolate 0-1
      1 r: 0-1
        interpolate 1-2
      2 r: 1-2
        interpolate 2-3
      3 r: 2-3
      
      add ring between other rings

      0
        interpolate 0-1 <-click!
      1 r: 4-1 <- change!
        interpolate 1-2
      2 r: 1-2
        interpolate 2-3
      3 r: 2-3
      4 r: 0-4 <- new!
        interpolate 0-4
'''

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
