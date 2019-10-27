var xhr = new XMLHttpRequest();
xhr.open("GET", "/api/list");
xhr.addEventListener("load", function(){
	var res = JSON.parse(this.responseText);
	var html = '';
	for(var i in res.result) {
		html += '<tr>';
		html += '<td>'+res.result[i].id+'</td>';
		html += '<td>'+res.result[i].name+'</td>';
		html += '<td>'+res.result[i].age+'</td>';
		html += '</tr>';
	}
	document.querySelector(".table > tbody").innerHTML = html;
});
xhr.send();