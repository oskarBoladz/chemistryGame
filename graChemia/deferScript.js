fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
.then(
function (response) {
return response.json()
})
.then(function(json){
localStorage.clear();
localStorage.setItem('periodicTable',JSON.stringify(json))
});
