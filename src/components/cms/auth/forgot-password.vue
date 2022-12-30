<template>
	<div class="page-content--bge5">
		<div class="container">
			<div class="login-wrap">
				<div class="login-content">
					<div class="login-logo">
						<h3>Forgot Password</h3>
					</div>
					<div class="login-form">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="
									handleSubmit(validateForgotPassword)
								"
							>
								<div class="form-group">
									<label>Email Address<span class="text-danger">*</span></label>
									<validation-provider
										name="Email"
										rules="required|email"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full form-control"
											type="text"
											name="user_name"
											v-model="login.user_name"
											placeholder="Enter Email here..."
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
									Send Link
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
<script src="./forgot-password.js"></script>
