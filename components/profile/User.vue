<!-- eslint-disable -->
<template>
	<v-menu 
		offset-y origin="right top" 
		left 
		content-class="language-dropdown" 
		transition="slide-y-transition" 
		nudge-top="-10" 
		class="user-block-wrap"
		min-width="200"
	>
		<template v-slot:activator="{ on }">
			<v-btn icon large v-on="on">
				<v-avatar
					size="40"
					color="red"
				>
					<img src="~/static/avatars/user-36.jpg" alt="avatar">
				</v-avatar>
			</v-btn>
		</template>
		<div class="dropdown-top white--text indigo pa-3">
            <span class="d-block subtitle-1 font-weight-bold">{{ user ? user.name : '-'}}</span>
            <span class="d-block subtitle-2 font-weight-light">{{ user ? (user.email ? user.email : user.username) : ''}}</span>
         </div>
		<v-list>
			<v-list-item
				v-for="(item, key) in items"
				:key="key"
				:to="item.to"
			>
				<v-list-item-icon>
					<v-icon v-text="item.icon" />
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title v-text="item.title" />
				</v-list-item-content>
			</v-list-item>
			<v-list-item
				@click="$emit('logout')"
			>
				<v-list-item-icon>
					<v-icon v-text="`mdi-power`" />
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title v-text="`Logout`" />
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-menu>
</template>
<script>
export default {
	props: {
		user: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			items: [
				{
					icon: 'mdi-account',
					title: 'Profile',
					active: false,
					to: '/profile'
				}
			]
		}
	}
}
</script>
