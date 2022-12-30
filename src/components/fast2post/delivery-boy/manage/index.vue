<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ user.id == 0 ? "Add " : "" }}Client{{
								user.id > 0
									? " - " +
									  user.firstname +
									  " " +
									  user.lastname
									: ""
							}}</strong
						>
						<div class="back-btn">
							<a
								href="javascript:;"
								@click="$router.go(-1)"
								class="btn btn-outline-primary btn-sm"
							>
								<i class="fa fa-arrow-left"></i> Back
							</a>
						</div>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form @submit.prevent="handleSubmit(validateUser)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-12">
										<div class="avatar-upload">
											<div class="avatar-edit">
												<input
													type="file"
													id="imageUpload"
													accept=".png, .jpg, .jpeg"
													@change="selectUserImage"
												/>
												<label for="imageUpload"
													><i
														class="fas fa-camera image-edit-pencil"
													></i
												></label>
											</div>
											<div class="avatar-preview">
												<div
													id="imagePreview"
													style="background-image: url(../images/icon/default-user.svg)"
												></div>
											</div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="First Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="firstname"
													class=" form-control-label"
													>First Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="firstname"
													name="firstname"
													v-model="user.firstname"
													placeholder="Enter First Name..."
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
												name="Last Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="lastname"
													class=" form-control-label"
													>Last Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="lastname"
													id="lastname"
													name="lastname"
													v-model="user.lastname"
													placeholder="Enter Last Name..."
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

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="User Type"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="usertype"
													class=" form-control-label"
													>User Type</label
												><span class="text-danger"
													>*</span
												>

												<select
													class="au-input au-input--full form-control"
													name="usertype"
													id="usertype"
													v-model="user.usertype_id"
													disabled
												>
													<option value=""
														>Please select</option
													>
													<option
														v-for="type in usertyelist"
														v-bind:value="type.id"
														v-bind:key="type.name"
													>
														{{ type.name }}
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

								<div class="form-group">
									<validation-provider
										name="Email"
										rules="required|email"
										v-slot="{ errors }"
									>
										<label
											for="email"
											class=" form-control-label"
											>Email</label
										><span class="text-danger">*</span>
										<input
											type="text"
											id="email"
											name="email"
											v-model="user.email"
											placeholder="Enter Email..."
											class="au-input au-input--full form-control"
											:disabled="user.id > 0"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
								</div>
								<div class="row" v-if="user.id == 0">
									<div class="col-md-6">
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
												><span class="text-danger"
													>*</span
												>
												<input
													type="password"
													id="password"
													name="password"
													v-model="user.password"
													placeholder="Enter Password..."
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
												name="Confirm Password"
												rules="required|confirmed:Password"
												v-slot="{ errors }"
											>
												<label
													for="conpassword"
													class=" form-control-label"
													>Confirm Password</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="password"
													id="conpassword"
													name="conpassword"
													v-model="user.c_password"
													placeholder="Enter Confirm Password..."
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
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Contact Number"
												rules="required|numeric|min:10"
												v-slot="{ errors }"
											>
												<label
													for="contact_no"
													class=" form-control-label"
													>Contact Number</label
												><span class="text-danger"
													>*</span
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
									</div>
									<!-- <div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Whatsapp Number"
												rules="required|numeric|min:10"
												v-slot="{ errors }"
											>
												<label
													for="whatsapp_number"
													class=" form-control-label"
													>Whatsapp Number</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="whatsapp_number"
													name="whatsapp_number"
													v-model="
														user.whatsapp_number
													"
													placeholder="Enter whatsapp Number..."
													class="au-input au-input--full form-control"
													maxlength="10"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div> -->
								</div>

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Gmap Location"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="gmap_location"
													class=" form-control-label"
													>Gmap Location</label
												>
												<input
													type="text"
													id="gmap_location"
													name="gmap_location"
													v-model="
														user.gmap_location_url
													"
													placeholder="Enter GMap Location..."
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
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Street1"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="address"
													class=" form-control-label"
													>Street1</label
												><span class="text-danger"
													>*</span
												>
												<textarea
													id="address"
													name="address"
													v-model="user.address1"
													placeholder="Enter street1..."
													class="au-input au-input--full form-control"
													rows="2"
												></textarea>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label
												for="street2"
												class=" form-control-label"
												>Street2</label
											>
											<textarea
												id="street2"
												name="street2"
												v-model="user.address2"
												placeholder="Enter street2..."
												class="au-input au-input--full form-control"
												rows="2"
											></textarea>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Pincode"
												rules="required|numeric|min:6"
												v-slot="{ errors }"
											>
												<label
													for="pincode"
													class=" form-control-label"
													>Pincode</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="pincode"
													name="pincode"
													v-model="user.pincode"
													placeholder="Enter Pincode..."
													@blur="
														getCityStateCountryByPincode
													"
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
												name="City"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="city"
													class=" form-control-label"
													>City</label
												><span class="text-danger"
													>*</span
												>

												<input
													type="text"
													id="city"
													name="city"
													v-model="user.city"
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

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="State"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="state"
													class=" form-control-label"
													>State</label
												><span class="text-danger"
													>*</span
												>

												<input
													type="text"
													id="state"
													name="state"
													v-model="user.state"
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
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Country"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="country"
													class=" form-control-label"
													>Country</label
												><span class="text-danger"
													>*</span
												>

												<input
													type="text"
													id="country"
													name="country"
													v-model="user.country"
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

								<div class="row" v-if="!isProfilePage">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Delivery Boy Charge"
												:rules="{
													required: true,
													regex: /^\d*\.?\d*$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="conpassword"
													class=" form-control-label"
													>Delievry Boy Charge</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="deliveryboy_charge"
													name="deliveryboy_charge"
													v-model="
														user.deliveryboy_charge
													"
													placeholder="Enter Delivery Boy Charge..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>
									<br />
								</div>
								<div class="form-group">
									<label class=" form-control-label"
										>Cancelled Cheque :</label
									>
									<template v-if="chequeFile">
										<a
											:href="chequeFile"
											target="_blank"
											class="m-l-10"
											>Download</a
										>
									</template>
									<div v-else>
										<input
											type="file"
											id="file-input-cancelled-cheque"
											name="file-input-cancelled-cheque"
											class="form-control-file"
											accept="application/pdf"
											@change="
												uploadAttachment(
													...arguments,
													'cheque'
												)
											"
										/>
									</div>
								</div>

								<div class="form-group">
									<label class=" form-control-label"
										>Aadhar Card :</label
									>
									<template v-if="aadharCard">
										<a
											:href="aadharCard"
											target="_blank"
											class="m-l-10"
											>Download</a
										>
									</template>
									<div v-else>
										<input
											type="file"
											id="file-input-gst-certificate"
											name="file-input-gst-certificate"
											class="form-control-file"
											accept="application/pdf"
											@change="
												uploadAttachment(
													...arguments,
													'aadhar_card'
												)
											"
										/>
									</div>
								</div>
								<div class="row" v-show="!isProfilePage">
									<div class="col-md-4">
										<div>
											<label
												class="switch switch-text switch-success switch-pill"
											>
												<input
													type="checkbox"
													class="switch-input"
													v-model="user.isActive"
												/>
												<span
													class="switch-label custom-switch-label"
												></span>
												<span
													class="switch-handle"
												></span>
											</label>
											Is Active?
										</div>
									</div>
								</div>
							</div>
							<div class="card-footer text-right">
								<button
									type="submit"
									class="btn border-none btn-outline-primary btn-sm"
								>
									<i class="fas fa-save"></i>&nbsp; Save</button
								>&nbsp;&nbsp;&nbsp;&nbsp;
								<button
									v-if="user.id === 0"
									type="button"
									class="btn border-none btn-outline-danger btn-sm"
									@click="resetForm"
								>
									<i class="fas fa-sync-alt"></i> Reset
								</button>
								<button
									v-if="user.id > 0 && !isProfilePage"
									type="button"
									class="btn border-none btn-sm"
									:class="
										user.isVerify
											? 'btn-outline-danger'
											: 'btn-outline-success'
									"
									@click="verifyUser"
								>
									<i class="fas fa-sync-alt"></i>
									{{ user.isVerify ? "UnVerify" : "Verify" }}
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
