import * as React from 'react';

const dateFormat = (value) => {

	let result = '';
	if(value) {
		const date = value;

	    //date
	    const dateFormat = '0'+date.getDate();
	    const dateNum = dateFormat.substr(-2);

	    //date
	    const monthFormat = '0'+(date.getMonth()+1);
	    const monthNum = monthFormat.substr(-2);

	    result = date.getFullYear()+'-'+monthNum+'-'+dateNum;
	}
    return result;
}

export default dateFormat;

