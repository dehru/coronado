This integrates chartjs 2.7.3.  the latest, 2.9.3 does not work.  Throws an error.
```
TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    at DocumentFragment.value [as appendChild] (aura_prod.js:1)
    at Object.value [as appendChild] (aura_prod.js:29)
    at injectCSS (chartjs:7699)
    at Object._ensureLoaded (chartjs:7732)
    at Object.acquireContext (chartjs:7764)
    at Chart.construct (chartjs:9307)
    at new Chart (chartjs:9294)
    at eval (chart.js:4)
```
this seems to occur when chartjs is trying to dynamically load it's css.

Data can be loaded with the cli 
```sfdx force:data:tree:import -f Case__c.json```

Data was pulled from wikipedia 
https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Colorado

