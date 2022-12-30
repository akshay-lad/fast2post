<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ pincode.id == 0 ? "Add " : "" }}Pincode{{
								pincode.id > 0 ? " - " + pincode.pincode : ""
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
						<form @submit.prevent="handleSubmit(validateUserType)">
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
													v-model="pincode.country_id"
													@change="
														getStateByCountry(
															pincode.country_id
														)
													"
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
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="City"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>State</label
												><span class="text-danger"
													>*</span
												>
												<select
													class="au-input au-input--full form-control"
													name="state"
													id="state"
													v-model="pincode.state_id"
													@change="
														getCityByState(
															pincode.state_id
														)
													"
												>
													<option value=""
														>Please select</option
													>
													<option
														v-for="state in stateList"
														:value="state.id"
														:key="state.id"
													>
														{{ state.code }} -
														{{ state.name }}
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
												name="City"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>City</label
												><span class="text-danger"
													>*</span
												>
												<select
													class="au-input au-input--full form-control"
													name="city"
													id="city"
													v-model="pincode.city_id"
												>
													<option value=""
														>Please select</option
													>
													<option
														v-for="city in cityList"
														:value="city.id"
														:key="city.id"
													>
														{{ city.name }}
													</option>
												</select>
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
												name="Pincode"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>Pincode</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="pincode"
													name="pincode"
													v-model="pincode.pincode"
													placeholder="Enter Pincode..."
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
									v-if="pincode.id === 0"
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
