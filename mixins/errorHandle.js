import { types } from '~/store'

export default {
	methods: {
		handleError({ response }) {
			if (response !== null) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(response.data)
				console.log(response.status)
				console.log(response.headers)
				if (Array.isArray(response.data)) {
					if (
						response.data.length === 1 &&
						response.data[0] === 'no production plan planned'
					) {
						this.$store.commit(types.SET_NOTIF, {
							isDisplayed: true,
							messages: ['No production plan is running'],
							type: 'error'
						})
						this.$router.push({
							name: 'planning-id',
							params: { id: 'production' }
						})
					}
				} else {
					const errorList = Object.keys(response.data).map(
						(item, i) => ({
							field: item,
							message: response.data[item][0]
						})
					)
					console.log(errorList)
					this.$store.commit(types.SET_NOTIF, {
						isDisplayed: true,
						messages: errorList,
						type: 'error'
					})
				}
			} else {
				this.defaultErrorHandler()
			}
		},
		defaultErrorHandler() {
			this.$store.commit(types.SET_NOTIF, {
				isDisplayed: true,
				messages: ['Unknown error occured'],
				type: 'error'
			})
		}
	}
}
