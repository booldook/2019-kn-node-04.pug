$.ajax({
	url: "/api/list",
	type: "get",
	dataType: "json",
	success: function(res) {
		console.log(res);
		html = '';
		for(var i in res.result) {
			html += '<tr>';
			html += '<td>'+res.result[i].id+'</td>';
			html += '<td>'+res.result[i].name+'</td>';
			html += '<td>'+res.result[i].age+'</td>';
			html += '</tr>';
		}
		$(".table > tbody").append(html);
	},
	error: function(xhr, status, error) {
		console.log(xhr);
	}
});