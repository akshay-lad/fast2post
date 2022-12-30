<template>
	<div class="container-fluid">
		<div class="row" v-if="usertype != 'client'">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Profile</strong>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form @submit.prevent="handleSubmit(update)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-12">
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
													style="background-image: url(images/icon/default-user.svg)"
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
										<div
											class="form-group"
											v-if="usertype == 'superadmin'"
										>
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
                                            ><span class="text-danger">*</span>
                                            <input
                                                type="text"
                                                id="whatsapp_number"
                                                name="whatsapp_number"
                                                v-model="user.whatsapp_number"
                                                placeholder="Enter whatsapp Number..."
                                                class="au-input au-input--full form-control"
                                                maxlength="10"
                                            />
                                            <span class="invalid-feedback">{{
                                                        errors[0]
                                                    }}</span>
                                        </validation-provider>
                                    </div>		
                                </div> -->
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
							</div>
							<div class="card-footer text-right">
								<button
									type="submit"
									class="btn btn-outline-primary btn-sm"
								>
									<i class="fas fa-save"></i>&nbsp; Save</button
								>&nbsp;&nbsp;
							</div>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</div>
		<div v-if="usertype == 'client'">
			<user-profile></user-profile>
		</div>
	</div>
</template>
<script src="./index.js"></script>
