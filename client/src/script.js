let sum_between = (a, b) => {
	if (a > b) {
		return 0;
	}
	c = 0;
	var d = '';
	for (this.a; a <= b; a++) {
		c += a;
		d += ` +${a}`;
	}
	console.log(`${d} = ${c}`);
};
sum_between(3, 7);
