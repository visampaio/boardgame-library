const file = document.getElementById('input');
var selPlayer = document.getElementById('selectPlayer');
var bgList;
var filteredList = [];

file.addEventListener("change", function() {
  Papa.parse(file.files[0], {
    header: true,
    complete: function(results) {
      bgList = results.data;
  		console.log(bgList);
  	}
  });
});

function filterPlayer(){
  for(var i=0; i<bgList.length; i++) {
    if (bgList[i].Players == selPlayer.value) {
      filteredList.push(bgList[i].Game);
    }
  }
  console.log(filteredList)
}
