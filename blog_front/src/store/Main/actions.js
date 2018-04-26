import * as types from './mutations-types'

export let actions = ({commit, data}) => {
	commit(types.SET_DATA, data)
}