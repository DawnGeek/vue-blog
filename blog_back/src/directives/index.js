import Vue from "vue"
var focus = {
	componentUpdated(el, binding) {
		//binding.value获取dom中的value值
		var {
			value,
			msg,
			reg,
			request,
			state
		} = binding.value
		//清除p标签
		let clearP = () => {
			let $p = el.parentNode.getElementsByTagName("p")[0]
			if ($p != undefined) {
				el.parentNode.removeChild($p)
			}
		}
		// value值不为空时
		let testNull = () => {
			if (value != "" && value != undefined && value != null) {
				testHandle() //验证
			} else {
				testRequest() //必填项
			}
		}
		//必填
		let testRequest = () => {
			if (request) {
				clearP()
				let $p = document.createElement("p")
				$p.innerHTML = "空空空！！！"
				el.parentNode.appendChild($p)
			} else {
				clearP() //清除p标签
			}
		}
		// 正则
		let testHandle = () => {
			clearP() //清除p标签
			if (!reg.test(value)) { //为false时创建标签
				let $p = document.createElement("p")
				$p.innerHTML = msg
				el.parentNode.appendChild($p)
			} else {
				clearP() //清除p标签
			}
		}
		if (state) {
			testNull()
		}
	}
}

Vue.directive("focus", focus)