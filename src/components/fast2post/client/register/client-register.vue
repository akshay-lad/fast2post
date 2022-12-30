<template>
	<div class="page-content--bge5">
		<div class="container">
			<div class="login-wrap">
				<div class="login-content">
					<div class="login-logo">
						<h3>Register</h3>
					</div>
					<div class="login-form">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form @submit.prevent="handleSubmit(validateUser)">

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
									<validation-provider
										name="Email Address"
										rules="required|email"
										v-slot="{ errors }"
									>
									<label
											for="usertype"
											class=" form-control-label"
											>Email Address<span class="text-danger">*</span></label
										>									
										<input
											class="au-input au-input--full form-control"
											type="text"
											name="user_name"
											v-model="user.email"
											placeholder="Email Address"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>
									</div>
								</div>
								

								<div class="form-group">
									<label>First Name <span class="text-danger">*</span></label>
									<validation-provider
										name="First Name"
										rules="required"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full form-control"
											type="text"
											name="first_name"
											v-model="user.firstname"
											placeholder="First Name"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>

								<div class="form-group">
									<label>Last Name<span class="text-danger">*</span></label>
									<validation-provider
										name="Last Name"
										rules="required"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full form-control"
											type="text"
											name="last_name"
											v-model="user.lastname"
											placeholder="Last Name"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>

								<div class="form-group">
									<validation-provider
										name="Contact Number"
										rules="required|numeric|min:10"
										v-slot="{ errors }"
									>
										<label
											for="contact_no"
											class=" form-control-label"
											>Contact Number<span class="text-danger">*</span></label
										>
										<input
											type="text"
											id="contact_no"
											name="contact_no"
											v-model="user.contact_no"
											placeholder="Enter Contact Number..."
											class="au-input au-input--full form-control"
											maxlength="10"
										/>
										<span
											class="invalid-feedback"
											>{{ errors[0] }}</span
										>
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
											v-model="user.password"
											placeholder="Password"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>

								<div class="form-group">
									<label>Confirm Password<span class="text-danger">*</span></label>
									<validation-provider
										name="Confirm Password"
										rules="required|confirmed:Password"
										v-slot="{ errors }"
									>
										<input
											class="au-input au-input--full"
											type="password"
											name="c_password"
											v-model="user.c_password"
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
									sign up
								</button>
							</form>
                           <div class="register-link">
                                <p>
                                    Already have account?
                                    <a href="/">Sign In</a>
                                </p>
                            </div>
						</ValidationObserver>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./client-register.js"></script>