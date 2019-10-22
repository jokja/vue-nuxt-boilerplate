<!-- eslint-disable -->
<template>
	<v-app class="theme--light application">
		<v-content>
			<v-container fill-height fluid grid-list-md>
				<v-layout row wrap fill-height>
					<v-flex xs12 fill-height>
						<v-layout
							row
							wrap
							fill-height
							align-center
							justify-center
						>
							<v-flex xs12 sm6 lg4 xl3>
								<v-layout row wrap>
									<v-flex xs12>
										<nuxt />
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>
			<notifications 
				group="general" 
				position="top right"
				animation-type="velocity"/>
		</v-content>
	</v-app>
</template>

<script>
// import { mapState } from "vuex";

export default {
	middleware: 'authenticated'
	// computed: {
	// 	...mapState(["isDarkMode"])
	// }
}
</script>
