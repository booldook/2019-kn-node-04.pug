const zp = n => n<10 ? "0"+n : n; 
const isoDate = (d, type) => {
	/*
	type: 1 => 2019-11-03 11:11:11
	type: 2 => 19-11-03
	type: 3 => 2019년 11월 03일
	*/
	let type = type? type: 1;
	let year = d.getFullYear();
	let month = zp(d.getMonth() + 1);
	let day = zp(d.getDate());
	let hour = zp(d.getHours());
	let min = zp(d.getMinutes());
	let sec = zp(d.getSeconds());
	switch(type) {
		case 2:
			return year.substr(2)+"-"+month+"-"+day;
			break;
		case 3:
			return year+"년 "+month+"월 "+day+"일";
			break;
		default:
			return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	}
}
module.exports = {zp, isoDate};