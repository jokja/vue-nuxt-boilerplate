<!-- eslint-disable -->
<template>
	<v-app>
		<template v-if="loading">
			<circle8></circle8>
		</template>
		<template v-else>
			<v-navigation-drawer
				v-model="drawer"
				:mini-variant="miniVariant"
				:clipped="clipped"
				temporary
				app
			>
			<v-list>
				<template v-for="item in items">
					<v-list-group
						v-if="item.items"
						:key="item.title"
						:prepend-icon="item.icon"
						no-action
						color="indigo"
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title v-text="item.title" />
							</v-list-item-content>
						</template>
						<v-list-item
							v-for="subItem in item.items"
							:key="subItem.title"
							:to="subItem.to"
							color="indigo"
						>
							<v-list-item-content>
								<v-list-item-title v-text="subItem.title" />
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
					<v-list-item
						v-else
						:key="item.title"
						:to="item.to"
						v-model="item.active"
						color="indigo"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon" />
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.title" />
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
			</v-navigation-drawer>
			<v-app-bar
				:clipped-left="clipped"
				fixed
				app
			>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
				<v-toolbar-title v-text="headerTitle" />
				<v-spacer />
				<div class="navbar-right">
					<span class="mr-4 hidden-sm-and-down"></span>
					<user @logout="onLogout" :user="user"></user>
				</div> 
			</v-app-bar>
			<v-content>
				<transition :enter-active-class="`animated fadeIn`">
					<nuxt class="pt-6"/>
				</transition>
			</v-content>
			<notifications 
				group="general" 
				position="top right"
				animation-type="velocity"/>
		</template>
	</v-app>
</template>

<script>
import { mapState } from 'vuex'
import User from '~/components/profile/User.vue'
import { types } from '~/store'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	middleware: 'not-authenticated',
	components: {
		User
	},
	data() {
		return {
			loading: true,
			clipped: false,
			drawer: false,
			fixed: false,
			miniVariant: false,
			items: [
				{
					icon: 'mdi-home',
					title: 'Home',
					active: true,
					to: '/'
				},
				{
					icon: 'mdi-checkbox-multiple-blank',
					title: 'Planning',
					items: [
						{
							title: 'Production',
							active: false,
							to: '/planning/production'
						},
						{
							title: 'Downtime',
							active: false,
							to: '/planning/downtime'
						}
					]
				},
				{
					icon: 'mdi-checkbox-multiple-blank',
					title: 'Production',
					items: [
						{ title: 'Line', active: false, to: '/line/view' },
						{
							title: 'Machine',
							active: false,
							to: '/machine/list'
						}
					]
				},
				{
					icon: 'mdi-settings',
					title: 'Machine Settings',
					to: '/machine-setting'
				},
				{
					icon: 'mdi-account',
					title: 'Operator',
					to: '/operator'
				},
				{
					icon: 'mdi-google-analytics',
					title: 'Analysis',
					to: '/analysis'
				},
				{
					icon: 'mdi-file-document',
					title: 'Report',
					to: '/report'
				}
			]
		}
	},
	computed: {
		...mapState(['user', 'headerTitle']),
		token: {
			get() {
				return this.$store.state.token
			},
			set(token) {
				this.$store.commit(types.SET_TOKEN, token)
			}
		},
		user: {
			get() {
				return this.$store.state.user
			},
			set(user) {
				this.$store.commit(types.SET_USER, user)
			}
		}
	},
	mounted() {
		setTimeout(() => {
			this.loading = false
		}, 2000)
		this.init(this.token)
	},
	methods: {
		init(token) {
			if (token !== null) {
				this.$axios.setToken(token, 'Bearer')
			}
		},
		onLogout() {
			Cookie.remove('token')
			this.user = null
			this.token = null
			localStorage.removeItem('user')
			localStorage.removeItem('token')
			this.$router.replace({ name: 'login' })
		}
	}
}
</script>
