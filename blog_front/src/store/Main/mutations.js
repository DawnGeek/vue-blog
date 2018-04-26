import * as types from './mutations-types'

export let mutations = {
	[types.SET_DATA](state, data) {
		state.headerData = data
	}
}