import Vue from 'vue'
import materialColorHash from 'material-color-hash'

const cookieparser = process.server ? require('cookieparser') : undefined

export const types = {
	SET_TOKEN: 'SET_TOKEN',
	SET_USER: 'SET_USER',
	SET_NOTIF: 'SET_NOTIF'
}

export const state = () => ({
	token: null,
	user: null,
	socket: {
		isConnected: false,
		message: null,
		reconnectError: false
	},
	notif: {
		isDisplayed: false,
		messages: [],
		type: 'info'
	},
	headerTitle: ''
})

export const getters = {
	headerTitle: (state) => {
		return state.headerTitle
	},
	token: (state) => {
		return state.token
	}
}

export const mutations = {
	[types.SET_TOKEN](state, token) {
		state.token = token
	},
	[types.SET_USER](state, user) {
		state.user = user
	},
	[types.SET_NOTIF](state, notif) {
		state.notif = notif
	},
	setNotif(state, notif) {
		state.notif = notif
	},
	setHeaderTitle(state, payload) {
		state.headerTitle = payload
	},
	setToken(state, token) {
		state.token = token
	},
	setUser(state, user) {
		state.user = user
	},
	loginUserSuccess(state, response) {
		state.user = response.data
		state.token = response.data.token
		localStorage.setItem('user', JSON.stringify(response.data))
		localStorage.setItem('token', response.data.token)
		// this.$axios.defaults.headers.common.authorization = `Bearer ${response.data.token}`
		// this.$axios.setToken(response.data.token, 'Bearer')
		Vue.notify({
			group: 'general',
			type: 'success',
			text: 'User Logged In Success!'
		})
		setTimeout(() => {
			this.$router.replace({ name: 'index' })
		}, 1000)
	},
	loginUserFailure(state, error) {
		Vue.notify({
			group: 'general',
			type: 'error',
			text: error.message
		})
	}
}

export const actions = {
	async nuxtServerInit({ commit }, { app, $axios, req }) {
		const defaultErrorHandler = () => {
			commit(types.SET_NOTIF, {
				isDisplayed: true,
				messages: ['You must login to continue'],
				type: 'info'
			})
		}

		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)
			const { token } = parsed
			// $axios.setHeader('Authorization', `Token ${token}`)

			try {
				let user = await app.$api['rest-auth/user'].index()
				user = {
					...user,
					color: materialColorHash(user.username)
				}

				commit(types.SET_TOKEN, token)
				commit(types.SET_USER, user)
			} catch (error) {
				console.log(error)
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data)
					console.log(error.response.status)
					console.log(error.response.headers)
					let parsedError = null
					try {
						parsedError = JSON.parse(error.response.data)
						const errorList = Object.keys(parsedError).map(
							(item, i) => ({
								field: item,
								message: error.response.data[item][0]
							})
						)
						commit(types.SET_NOTIF, {
							isDisplayed: true,
							messages: errorList,
							type: 'error'
						})
					} catch (error) {
						defaultErrorHandler()
					}
				} else {
					defaultErrorHandler()
				}
			}
		}
	},
	socketSend(ctx, obj) {
		if (!process.browser) {
			return
		}
		this.$router.app.$socket.sendObj(obj)
	},
	setHeaderTitle(context, payload) {
		context.commit('setHeaderTitle', payload)
	},
	setToken(context, payload) {
		context.commit('setToken', payload)
	},
	async login({ commit }, { username, password }) {
		try {
			const { data } = await this.$axios.post('/api/user/login', {
				username,
				password
			})
			if (data.success) {
				commit('loginUserSuccess', data)
			} else {
				commit('loginUserFailure', data)
			}
		} catch (error) {
			console.log('Fatal Error!', error)
			if (error.response && error.response.status === 401) {
				throw new Error('Bad credentials')
			}
			commit('loginUserFailure', error)
			throw error
		}
	}
}
