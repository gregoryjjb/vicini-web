export const send = (data, callback) => {
	
	let newData = Math.floor(Math.random() * 100);
	
	return callback({
		myVal: newData,
	})
}