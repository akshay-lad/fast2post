<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ city.id == 0 ? "Add " : "" }}City{{
								city.id > 0 ? " - " + city.name : ""
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
						<form @submit.prevent="handleSubmit(validateCity)">
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
													v-model="city.country_id"
													@change="
														getStateByCountry(
															city.country_id
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
													v-model="city.state_id"
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
												name="City Code"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>City Code</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="city_code"
													name="city_code"
													v-model="city.code"
													placeholder="Enter City Code..."
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
												name="City Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="nf-email"
													class=" form-control-label"
													>City Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="city_name"
													name="city_name"
													v-model="city.name"
													placeholder="Enter City Name..."
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
									v-if="city.id === 0"
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
