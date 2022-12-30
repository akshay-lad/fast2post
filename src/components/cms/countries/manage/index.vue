<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ country.id == 0 ? "Add " : "" }}Country{{
								country.id > 0 ? " - " + country.name : ""
							}}</strong
						>
						<div class="back-btn">
							<router-link
								:to="backUrl"
								class="btn btn-outline-primary btn-sm"
							>
								<i class="fa fa-arrow-left"></i> Back
							</router-link>
						</div>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form @submit.prevent="handleSubmit(validateCountry)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Country Code"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>Code</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="country_code"
													name="country_code"
													v-model="country.code"
													placeholder="Enter Country Code..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Phone Code"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>Phone Code</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="phone_code"
													name="phone_code"
													v-model="country.phone_code"
													placeholder="Enter Phone Code..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Country Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="country_name"
													name="country_name"
													v-model="country.name"
													placeholder="Enter Country Name..."
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
									v-if="country.id === 0"
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
