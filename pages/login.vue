<!-- eslint-disable -->
<template>
	<v-card elevation="6" flat color="white">
		<v-card-title>
			<v-spacer />
			<v-layout row wrap align-center justify-center>
				<v-flex xs2 xl3>
					<app-img src="icon.png" alt="Machine Vision" />	
				</v-flex>
				<v-flex xs12 text-center mt-1>
					<div class="display-1 font-weight-regular grey--text text--darken-2">Login</div>
				</v-flex>
			</v-layout>
			<v-spacer />
		</v-card-title>
		<v-card-text>
			<form action @submit.prevent="onLogin">
				<v-container fluid>
					<v-layout row wrap>
						<v-flex xs12="">
							<v-text-field
								v-model="credential.username"
								v-validate="'required'"
								:error-messages="errors.collect('username')"
								name="username"
								label="Username"
								data-vv-value-path="credential.username"
								data-vv-as="Username"
								data-vv-name="username"
								clearable
								required
								@keyup.enter="onLogin"
							/>
						</v-flex>
					</v-layout>
					<v-layout row wrap>
						<v-flex xs12="">
							<v-text-field
								v-model="credential.password"
								v-validate="'required'"
								:error-messages="errors.collect('password')"
								:type="isPasswordVisible ? 'text' : 'password'"
								:append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
								label="Password"
								data-vv-value-path="credential.password"
								data-vv-as="Password"
								data-vv-name="password"
								clearable
								required
								@click:append="() => (isPasswordVisible = !isPasswordVisible)"
								@keyup.enter="onLogin"
							/>
						</v-flex>
					</v-layout>
					<v-layout row wrap mt-2>
						<v-flex xs12>
							<v-btn
								:loading="isLoading"
								:disabled="isLoading"
								large
								color="indigo"
								block
								@click="onLogin"
								:dark="!isLoading"
								depressed
							>
								Login
							</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
			</form>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import errorHandle from '~/mixins/errorHandle'
import loadingable from '~/mixins/loadingable'

// import { types } from '~/store'
// import materialColorHash from 'material-color-hash'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	layout: 'login',
	mixins: [errorHandle, loadingable],
	data() {
		return {
			isPasswordVisible: false,
			credential: {
				username: '',
				password: ''
			}
		}
	},
	computed: {
		...mapGetters(['token'])
	},
	methods: {
		async onLogin() {
			try {
				this.isLoading = true
				await this.$store.dispatch('login', {
					username: this.credential.username,
					password: this.credential.password
				})
				if (this.token) {
					Cookie.set('token', this.token, {
						expires: 1 / 12
					})
					// this.$router.replace({ name: 'index' })
				}
			} catch (error) {
				console.log('Error!', error)
				// this.handleError(error)
			} finally {
				setTimeout(() => {
					this.isLoading = false
				}, 1000)
			}
		}
	}
}
</script>
