const alertLoc = (str, loc) => {
	let html = `
	<meta charset="utf-8">
	<script>
	alert("${str}");
	location.href = "${loc}";
	</script>`;
	return html;
}

module.exports = {alertLoc};
