<template>
	<header
		class="header-desktop"
		:style="{ left: $store.state.isOpenSideBar ? '260px' : '0px' }"
	>
		<div class="section__content section__content--p30">
			<div class="container-fluid">
				<div class="header-wrap">
					<template v-if="!$store.state.isMobileDevice">
						<i
							v-if="$store.state.isOpenSideBar"
							@click="
								$store.state.isOpenSideBar = !$store.state
									.isOpenSideBar
							"
							class="fas fa-outdent fa-2x"
						></i>
						<i
							v-else
							@click="
								$store.state.isOpenSideBar = !$store.state
									.isOpenSideBar
							"
							class="fas fa-indent fa-2x"
						></i>
					</template>
					<div class="header-button">
						<div class="noti-wrap">
							<!-- <div class="noti__item js-item-menu">
								<i class="zmdi zmdi-comment-more"></i>
								<span class="quantity">1</span>
								<div class="mess-dropdown js-dropdown">
									<div class="mess__title">
										<p>You have 2 news message</p>
									</div>
									<div class="mess__item">
										<div class="image img-cir img-40">
											<img
												src="images/icon/avatar-06.jpg"
												alt="Michelle Moreno"
											/>
										</div>
										<div class="content">
											<h6>Michelle Moreno</h6>
											<p>Have sent a photo</p>
											<span class="time">3 min ago</span>
										</div>
									</div>
									<div class="mess__item">
										<div class="image img-cir img-40">
											<img
												src="images/icon/avatar-04.jpg"
												alt="Diane Myers"
											/>
										</div>
										<div class="content">
											<h6>Diane Myers</h6>
											<p>
												You are now connected on message
											</p>
											<span class="time">Yesterday</span>
										</div>
									</div>
									<div class="mess__footer">
										<a href="javascript:;">View all messages</a>
									</div>
								</div>
							</div>
							<div class="noti__item js-item-menu">
								<i class="zmdi zmdi-email"></i>
								<span class="quantity">1</span>
								<div class="email-dropdown js-dropdown">
									<div class="email__title">
										<p>You have 3 New Emails</p>
									</div>
									<div class="email__item">
										<div class="image img-cir img-40">
											<img
												src="images/icon/avatar-06.jpg"
												alt="Cynthia Harvey"
											/>
										</div>
										<div class="content">
											<p>
												Meeting about new dashboard...
											</p>
											<span
												>Cynthia Harvey, 3 min ago</span
											>
										</div>
									</div>
									<div class="email__item">
										<div class="image img-cir img-40">
											<img
												src="images/icon/avatar-05.jpg"
												alt="Cynthia Harvey"
											/>
										</div>
										<div class="content">
											<p>
												Meeting about new dashboard...
											</p>
											<span
												>Cynthia Harvey, Yesterday</span
											>
										</div>
									</div>
									<div class="email__item">
										<div class="image img-cir img-40">
											<img
												src="images/icon/avatar-04.jpg"
												alt="Cynthia Harvey"
											/>
										</div>
										<div class="content">
											<p>
												Meeting about new dashboard...
											</p>
											<span
												>Cynthia Harvey, April
												12,,2018</span
											>
										</div>
									</div>
									<div class="email__footer">
										<a href="javascript:;">See all emails</a>
									</div>
								</div>
							</div>
							<div class="noti__item js-item-menu">
								<i class="zmdi zmdi-notifications"></i>
								<span class="quantity">3</span>
								<div class="notifi-dropdown js-dropdown">
									<div class="notifi__title">
										<p>You have 3 Notifications</p>
									</div>
									<div class="notifi__item">
										<div class="bg-c1 img-cir img-40">
											<i class="zmdi zmdi-email-open"></i>
										</div>
										<div class="content">
											<p>You got a email notification</p>
											<span class="date"
												>April 12, 2018 06:50</span
											>
										</div>
									</div>
									<div class="notifi__item">
										<div class="bg-c2 img-cir img-40">
											<i
												class="zmdi zmdi-account-box"
											></i>
										</div>
										<div class="content">
											<p>Your account has been blocked</p>
											<span class="date"
												>April 12, 2018 06:50</span
											>
										</div>
									</div>
									<div class="notifi__item">
										<div class="bg-c3 img-cir img-40">
											<i class="zmdi zmdi-file-text"></i>
										</div>
										<div class="content">
											<p>You got a new file</p>
											<span class="date"
												>April 12, 2018 06:50</span
											>
										</div>
									</div>
									<div class="notifi__footer">
										<a href="javascript:;">All notifications</a>
									</div>
								</div>
							</div> -->
						</div>
						<div class="account-wrap">
							<div
								class="account-item clearfix js-item-menu "
								:class="
									$store.state.isOpenAccountDropDown
										? 'show-dropdown'
										: ''
								"
								@click.stop="
									$store.state.isOpenAccountDropDown = !$store
										.state.isOpenAccountDropDown
								"
							>
								<div class="image">
									<img
										:src="
											user.profile_image
												? user.profile_image
												: '/images/icon/default-user-black.svg'
										"
										:alt="
											user.firstname + ' ' + user.lastname
										"
									/>
								</div>
								<div
									class="content"
									v-show="user.firstname != undefined"
								>
									<a class="js-acc-btn" href="javascript:;">{{
										user.firstname + " " + user.lastname
									}}</a>
								</div>
								<div class="account-dropdown js-dropdown">
									<div class="info clearfix">
										<div class="image">
											<a href="javascript:;">
												<img
													:src="
														user.profile_image
															? user.profile_image
															: '/images/icon/default-user-black.svg'
													"
													:alt="
														user.firstname +
															' ' +
															user.lastname
													"
												/>
											</a>
										</div>
										<div class="content">
											<h5 class="name">
												<a href="javascript:;">{{
													user.firstname +
														" " +
														user.lastname
												}}</a>
											</h5>
											<span class="email">{{
												user.email
											}}</span>
										</div>
									</div>
									<div class="account-dropdown__body">
										<div class="account-dropdown__item">
											<router-link :to="profileUrl">
												<i class="zmdi zmdi-account"></i
												>Profile</router-link
											>
										</div>
										<div class="account-dropdown__item">
											<a href="/change-password">
												<i class="zmdi zmdi-account"></i
												>Change Password</a
											>
										</div>
										<div class="account-dropdown__item">
											<a
												href="javascript:;"
												@click="changeTheme"
											>
												<i class="zmdi zmdi-account"></i
												>{{
													$store.state.theme ===
													"light"
														? "dark"
														: "light"
												}}
												Theme</a
											>
										</div>
									</div>
									<div class="account-dropdown__footer">
										<a href="javascript:;" @click="logout">
											<i class="zmdi zmdi-power"></i
											>Logout</a
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
<script>
export default {
	computed: {
		user() {
			return this.$store.state.userDetail;
		},
		profileUrl() {
			if (this.user.usertype && this.user.usertype.name === "client") {
				return "/client-profile/" + this.user.id;
			}
			return "/profile";
		}
	},
	methods: {
		changeTheme() {
			let theme = this.$store.state.theme === "dark" ? "light" : "dark";
			this.$store.state.theme = theme;
			window.localStorage.setItem("theme", theme);
			document.body.className = theme;
		},
		logout() {
			this.axios
				.post("/users/logout")
				.then(function() {
					localStorage.removeItem(process.env.VUE_APP_TOKEN_NAME);
					window.location.href = "/";
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>
