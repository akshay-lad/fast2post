<template>
	<div class="page-content--bge5">
		<div class="container">
			<div class="login-wrap">
				<div class="login-content">
					<div class="login-logo">
						<h3>Login</h3>
					</div>
					<div class="login-form">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form @submit.prevent="handleSubmit(validateUser)">
								<div class="form-group">
									<label>Email Address<span class="text-danger">*</span></label>
									<validation-provider
										name="Email Address"
										rules="required"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full form-control"
											type="text"
											name="user_name"
											v-model="login.user_name"
											placeholder="Email Address"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>
								<div class="form-group">
									<label>Password<span class="text-danger">*</span></label>
									<validation-provider
										name="Password"
										rules="required"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full"
											type="password"
											name="password"
											v-model="login.password"
											placeholder="Password"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>
								<div class="login-checkbox">
									<label>
										<input
											type="checkbox"
											name="remember"
										/>Remember Me
									</label>
									<label>
										<a href="/forgot-password">Forgotten Password?</a>
									</label>
								</div>
								<button
									class="au-btn au-btn--block au-btn--green m-b-20"
									type="submit"
								>
									sign in
								</button>
							</form>
						</ValidationObserver>
						<div class="register-link">
							<p>
								Don't you have account?
								<a href="/register">Sign Up Here</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./login.js"></script>
