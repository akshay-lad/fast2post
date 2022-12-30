<template>
	<div class="page-content--bge5">
		<div class="container">
			<div class="login-wrap">
				<div class="login-content">
					<div class="login-logo">
						<h3>Reset Password</h3>
					</div>
					<div class="login-form">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form @submit.prevent="handleSubmit(validateResetPassword)">
								<div class="form-group">
									<label>Password</label>
									<validation-provider
										name="Password"
										rules="required"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full form-control"
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
								<div class="form-group">
									<label>Confirm Password</label>
									<validation-provider
										name="Confirm Password"
										rules="required|confirmed:Password"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full"
											type="password"
											name="confirmpassword"
											v-model="login.confirmpassword"
											placeholder="Confirm Password"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>
								<button
									class="au-btn au-btn--block au-btn--green m-b-20"
									type="submit"
								>
									Submit
								</button>
							</form>
						</ValidationObserver>
						<div class="register-link">
							<p>
								Don't you have account?
								<a href="#">Sign Up Here</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./reset-password.js"></script>
