<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Change Password</strong>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form @submit.prevent="handleSubmit(update)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-7">
										<div class="form-group">
											<validation-provider
												name="Old Password"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="oldpassword"
													class=" form-control-label"
													>Old Password</label
												><span class="text-danger">*</span>
												<input
													type="password"
													id="oldpassword"
													name="oldpassword"
													v-model="
														user.current_password
													"
													placeholder="Enter old password here..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<div class="col-md-7">
										<div class="form-group">
											<validation-provider
												name="Password"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="password"
													class=" form-control-label"
													>Password</label
												><span class="text-danger">*</span>
												<input
													type="password"
													id="password"
													name="password"
													v-model="user.new_password"
													placeholder="Enter Password here..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<div class="col-md-7">
										<div class="form-group">
											<validation-provider
												name="Confirm Password"
												rules="required|confirmed:Password"
												v-slot="{ errors }"
											>
												<label
													for="confirmpassword"
													class=" form-control-label"
													>Confirm Password</label
												><span class="text-danger">*</span>
												<input
													type="password"
													id="confirmpassword"
													name="confirmpassword"
													v-model="
														user.confirm_password
													"
													placeholder="Enter Confirm Password here..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
								</div>
							</div>
							<div class="card-footer text-right">
								<button
									type="submit"
									class="btn btn-outline-primary btn-sm"
								>
									<i class="fa fa-check"></i>&nbsp; Submit</button
								>&nbsp;&nbsp;
								<button
									type="button"
									class="btn btn-outline-danger btn-sm"
									@click="resetForm"
								>
									<i class="fa fa-refresh"></i> Reset
								</button>
							</div>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js"></script>
