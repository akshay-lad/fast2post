<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Profile</strong>
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
									<div class="col-md-6">
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
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label
												for="gst_number"
												class=" form-control-label"
												>GST Number
											</label>
											<input
												type="text"
												id="gst_number"
												name="gst_number"
												v-model="user.gst_number"
												placeholder="Enter GST Number..."
												class="au-input au-input--full form-control"
												maxlength="15"
											/>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label
												for="pan_number"
												class=" form-control-label"
												>PAN Number</label
											>
											<input
												type="text"
												id="pan_number"
												name="pan_number"
												v-model="user.pan_number"
												placeholder="Enter PAN Number..."
												class="au-input au-input--full form-control"
												maxlength="10"
											/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label
												for="website_ip"
												class=" form-control-label"
												>Website IP</label
											>
											<input
												type="text"
												id="website_ip"
												name="website_ip"
												v-model="user.website_ip"
												placeholder="Enter Website IP..."
												class="au-input au-input--full form-control"
											/>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Website URL"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="website_url"
													class=" form-control-label"
													>Website Url</label
												>
												<input
													type="text"
													id="website_url"
													name="website_url"
													v-model="user.website_url"
													placeholder="Enter Website URL..."
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
									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Facebook Url"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="facebook_url"
													class=" form-control-label"
													>Facebook Url</label
												>
												<input
													type="text"
													id="facebook_url"
													name="facebook_url"
													v-model="user.facebook_url"
													placeholder="Enter Facebook Url..."
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
												name="Instagram Url"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="instagram_url"
													class=" form-control-label"
													>Instagram Url</label
												>
												<input
													type="text"
													id="instagram_url"
													name="instagram_url"
													v-model="user.instagram_url"
													placeholder="Enter Instagram Url..."
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
												name="Twitter Url"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="twitter_url"
													class=" form-control-label"
													>Twitter Url</label
												>
												<input
													type="text"
													id="twitter_url"
													name="twitter_url"
													v-model="user.twitter_url"
													placeholder="Enter Twitter Url..."
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
												name="LinkedIn Url"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="linkedin_url"
													class=" form-control-label"
													>LinkedIn Url</label
												>
												<input
													type="text"
													id="linkedin_url"
													name="linkedin_url"
													v-model="user.linkedin_url"
													placeholder="Enter LinkedIn Url..."
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

								<br />
								<div class="row">
									<div class="col-md-4">
										<div>
											<label
												class="switch switch-text switch-success switch-pill"
											>
												<input
													type="checkbox"
													class="switch-input"
													v-model="user.isActive"
													:checked="user.isActive"
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

									<div class="col-md-4">
										<div>
											<label
												class="switch switch-text switch-success switch-pill"
											>
												<input
													type="checkbox"
													class="switch-input"
													v-model="user.isVerify"
													:checked="user.isVerify"
												/>
												<span
													class="switch-label custom-switch-label"
												></span>
												<span
													class="switch-handle"
												></span>
											</label>
											Is Verify?
										</div>
									</div>
									<div class="col-md-4">
										<div>
											<label
												class="switch switch-text switch-success switch-pill"
											>
												<input
													type="checkbox"
													class="switch-input"
													v-model="user.is_allow_api"
													:checked="user.is_allow_api"
												/>
												<span
													class="switch-label custom-switch-label"
												></span>
												<span
													class="switch-handle"
												></span>
											</label>
											Is Allow API?
										</div>
									</div>
								</div>

								<br />
								<br />
								<div class="row">
									<div class="col-md-12">
										<h4>Bank Detail</h4>
										<hr />
									</div>
								</div>

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="UPI ID"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="upi_id"
													class=" form-control-label"
													>UPI ID</label
												>
												<input
													type="text"
													id="upi_id"
													name="upi_id"
													v-model="user.upi_id"
													placeholder="Enter UPI ID..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>

									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Bank Name"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="bank_name"
													class=" form-control-label"
													>Bank Name</label
												>
												<input
													type="text"
													id="bank_name"
													name="bank_name"
													v-model="user.bank_name"
													placeholder="Enter Bank Name..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>

									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Branch Name"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="bank_branch_name"
													class=" form-control-label"
													>Branch Name</label
												>
												<input
													type="text"
													id="bank_branch_name"
													name="bank_branch_name"
													v-model="
														user.bank_branch_name
													"
													placeholder="Enter Branch Name..."
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
												name="Account Number"
												rules="alpha_num"
												v-slot="{ errors }"
											>
												<label
													for="bank_ac_number"
													class=" form-control-label"
													>Account Number</label
												>
												<input
													type="text"
													id="bank_ac_number"
													name="bank_ac_number"
													v-model="
														user.bank_ac_number
													"
													placeholder="Enter Account Number..."
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
												name="IFSC Code"
												rules="alpha_num"
												v-slot="{ errors }"
											>
												<label
													for="bank_ifsc_code"
													class=" form-control-label"
													>IFSC Code</label
												>
												<input
													type="text"
													id="bank_ifsc_code"
													name="bank_ifsc_code"
													v-model="
														user.bank_ifsc_code
													"
													placeholder="Enter IFSC Code..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>

									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Holder Name"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="bank_ac_holder_name"
													class=" form-control-label"
													>Holder Name</label
												>
												<input
													type="text"
													id="bank_ac_holder_name"
													name="bank_ac_holder_name"
													v-model="
														user.bank_ac_holder_name
													"
													placeholder="Enter Holder Name..."
													class="au-input au-input--full form-control"
												/>
												<span
													class="invalid-feedback"
													>{{ errors[0] }}</span
												>
											</validation-provider>
										</div>
									</div>

									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Branch Address"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="bank_branch_address"
													class=" form-control-label"
													>Branch Address</label
												>
												<textarea
													id="bank_branch_address"
													name="bank_branch_address"
													v-model="
														user.bank_branch_address
													"
													placeholder="Enter Branch Address..."
													class="au-input au-input--full form-control"
													rows="4"
												></textarea>
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
							</div>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js"></script>
