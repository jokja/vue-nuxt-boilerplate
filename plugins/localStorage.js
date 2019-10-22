// eslint-disable
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
	createPersistedState({
		key: store.state.token
	})(store)
}
