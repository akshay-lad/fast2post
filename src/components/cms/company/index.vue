<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Company</strong>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form @submit.prevent="handleSubmit(validateCompany)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-6">
										<label class=" form-control-label"
											>Company Logo</label
										>
										<div class="avatar-upload">
											<div class="avatar-edit">
												<input
													type="file"
													id="imageUpload"
													accept=".png, .jpg, .jpeg"
													@change="selectImage"
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
													style="background-image: url(images/icon/office-building-grey.svg)"
												></div>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<label class=" form-control-label"
											>Favicon icon</label
										>
										<div class="avatar-upload">
											<div class="avatar-edit">
												<input
													type="file"
													id="faviconImageUpload"
													accept=".png, .jpg, .jpeg"
													@change="
														selectImage(
															$event,
															'favicon'
														)
													"
												/>
												<label for="faviconImageUpload"
													><i
														class="fas fa-camera image-edit-pencil"
													></i
												></label>
											</div>
											<div class="avatar-preview">
												<div
													id="faviconImagePreview"
													style="background-image: url(images/icon/office-building-grey.svg)"
												></div>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<validation-provider
												name="Company Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="companyname"
													class=" form-control-label"
													>Company Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="companyname"
													name="companyname"
													v-model="company.name"
													placeholder="Enter Company Name..."
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
												name="Email"
												rules="required|email"
												v-slot="{ errors }"
											>
												<label
													for="email"
													class=" form-control-label"
													>Email</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="email"
													name="email"
													v-model="company.email"
													placeholder="Enter Email..."
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
												name="Email2"
												rules="required|email"
												v-slot="{ errors }"
											>
												<label
													for="email2"
													class=" form-control-label"
													>Email (Company
													Profile)</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="email2"
													name="email2"
													v-model="company.email2"
													placeholder="Enter Email (company profile)..."
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
												rules="required|min:10"
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
													v-model="company.contact_no"
													placeholder="Enter Contact Number..."
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
												name="Contact Number 2"
												rules="required|min:10"
												v-slot="{ errors }"
											>
												<label
													for="contact_no2"
													class=" form-control-label"
													>Contact Number (company
													profile)</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="contact_no2"
													name="contact_no2"
													v-model="
														company.contact_no2
													"
													placeholder="Enter Contact Number (company profile)..."
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
											<label
												for="address"
												class=" form-control-label"
												>Address</label
											>
											<textarea
												id="address"
												name="address"
												v-model="company.address"
												placeholder="Enter Address..."
												class="au-input au-input--full form-control"
												rows="4"
											></textarea>
										</div>
									</div>
								</div>

								<div class="row">
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
													v-model="company.country"
													placeholder="Enter Pincode Url..."
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
													v-model="company.state"
													placeholder="Enter Pincode Url..."
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
													v-model="company.city"
													placeholder="Enter Pincode Url..."
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
												name="Pincode"
												rules="numeric"
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
													v-model="company.pincode"
													placeholder="Enter Pincode Url..."
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
												name="Whatsapp Number"
												rules="numeric|min:10"
												v-slot="{ errors }"
											>
												<label
													for="whatsapp"
													class=" form-control-label"
													>Whatsapp Number</label
												>
												<input
													type="text"
													id="whatsapp"
													name="whatsapp"
													v-model="company.whatsapp"
													placeholder="Enter Whatsapp Number..."
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
												name="Facebook Url"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="facebook"
													class=" form-control-label"
													>Facebook Url</label
												>
												<input
													type="text"
													id="facebook"
													name="facebook"
													v-model="company.facebook"
													placeholder="Enter facebook url..."
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
												name="instagram"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="instagram"
													class=" form-control-label"
													>Instagram Url</label
												>
												<input
													type="text"
													id="google"
													name="google"
													v-model="company.instagram"
													placeholder="Enter Instagram url..."
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
												name="google"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="google"
													class=" form-control-label"
													>Google Url</label
												>
												<input
													type="text"
													id="google"
													name="google"
													v-model="company.google"
													placeholder="Enter google url..."
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
												name="youtube"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="youtube"
													class=" form-control-label"
													>Youtube Url</label
												>
												<input
													type="text"
													id="youtube"
													name="youtube"
													v-model="company.youtube"
													placeholder="Enter youtube url..."
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
												name="twitter"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="twitter"
													class=" form-control-label"
													>Twitter Url</label
												>
												<input
													type="text"
													id="twitter"
													name="twitter"
													v-model="company.twitter"
													placeholder="Enter twitter url..."
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
												name="linkedin"
												:rules="{
													regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
												}"
												v-slot="{ errors }"
											>
												<label
													for="linkedin"
													class=" form-control-label"
													>Linkedin Url</label
												>
												<input
													type="text"
													id="linkedin"
													name="linkedin"
													v-model="company.linkedin"
													placeholder="Enter linkedin url..."
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
											<label
												for="meta_title"
												class=" form-control-label"
												>Meta Title</label
											>
											<input
												type="text"
												id="meta_title"
												name="meta_title"
												v-model="company.meta_title"
												placeholder="Enter meta title..."
												class="au-input au-input--full form-control"
											/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label
												for="meta_keyword"
												class=" form-control-label"
												>Meta Keyword</label
											>
											<input
												type="text"
												id="meta_keyword"
												name="meta_keyword"
												v-model="company.meta_keyword"
												placeholder="Enter meta keyword..."
												class="au-input au-input--full form-control"
											/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label
												for="meta_description"
												class=" form-control-label"
												>Meta Description</label
											>
											<textarea
												id="meta_description"
												name="meta_description"
												v-model="
													company.meta_description
												"
												placeholder="Enter meta description..."
												class="au-input au-input--full form-control"
												rows="4"
											></textarea>
										</div>
									</div>
								</div>
							</div>
							<div class="card-footer text-right">
								<button
									type="submit"
									class="btn btn-outline-primary btn-sm"
								>
									<i class="fas fa-save"></i>&nbsp; Save</button
								>&nbsp;&nbsp;
								<button
									v-if="company.id === 0"
									type="button"
									class="btn btn-outline-danger btn-sm"
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
