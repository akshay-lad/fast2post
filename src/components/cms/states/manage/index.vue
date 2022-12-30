<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ state.id == 0 ? "Add " : "" }}State{{
								state.id > 0 ? " - " + state.name : ""
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
						<form @submit.prevent="handleSubmit(validateState)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Country"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>Country</label
												><span class="text-danger"
													>*</span
												>
												<select
													class="au-input au-input--full form-control"
													name="country"
													id="country"
													v-model="state.country_id"
												>
													<option value=""
														>Please select</option
													>
													<option
														v-for="country in countryList"
														:value="country.id"
														:key="country.id"
													>
														({{
															country.phone_code
														}}) {{ country.code }} -
														{{ country.name }}
													</option>
												</select>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="State Code"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>State Code</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="state_code"
													name="state_code"
													v-model="state.code"
													placeholder="Enter State Code..."
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
												name="State Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>State Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="state_name"
													name="state_name"
													v-model="state.name"
													placeholder="Enter State Name..."
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
									v-if="state.id === 0"
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
