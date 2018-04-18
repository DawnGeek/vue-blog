import Vue from 'vue'

let focus = {
	componentUpdated(el, binding) {
		let type = binding.expression;
		let {value, reg, msg} = binding.value
		// console.log(type)
		// console.log(el)
		// if(reg.test(value)) {
		// 	let oP = document.createElement('p');
		// 	oP.className = 'oP';
		// 	oP.innerHTML = msg;
		// 	el.parentNode.appendChild(oP);
		// } else {

		// }
	}
}

Vue.directive('focus', focus)