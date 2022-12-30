<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ page.id == 0 ? "Add " : "" }}Page{{
								page.id > 0 ? " - " + page.name : ""
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
						<form @submit.prevent="handleSubmit(validatePage)">
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Page Name"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="name"
													class=" form-control-label"
													>Page Name</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="name"
													name="name"
													v-model="page.name"
													placeholder="Enter Page Name..."
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
												name="Page Url"
												:rules="{ required: true }"
												v-slot="{ errors }"
											>
												<label
													for="url"
													class=" form-control-label"
													>Page Url</label
												>
												<input
													type="text"
													id="url"
													name="url"
													v-model="page.url"
													placeholder="Enter Page URL..."
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
												name="Page Title"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="page_title"
													class=" form-control-label"
													>Page Title</label
												>
												<input
													type="text"
													id="page_title"
													name="page_title"
													v-model="page.page_title"
													placeholder="Enter Page Title..."
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
												name="Page Html"
												rules="required"
												v-slot="{ errors }"
											>
												<label
													for="page_title"
													class=" form-control-label"
													>Page Html</label
												>
												<ckeditor
													type="classic"
													v-model="page.page_html"
													id="page_html"
													:config="editorConfig"
												></ckeditor>
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
												name="Meta Keywords"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="meta_keywords"
													class=" form-control-label"
													>Meta Keywords</label
												>
												<input
													type="text"
													id="meta_keywords"
													name="meta_keywords"
													v-model="page.meta_keywords"
													placeholder="Enter Meta Keywords..."
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
												name="Meta Description"
												rules=""
												v-slot="{ errors }"
											>
												<label
													for="meta_description"
													class=" form-control-label"
													>Meta Description</label
												>
												<textarea
													id="meta_description"
													name="meta_description"
													v-model="
														page.meta_description
													"
													placeholder="Enter Meta Description..."
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
													v-model="page.is_active"
													:checked="page.is_active"
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
									v-if="page.id === 0"
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
<style>
.ck-editor__editable {
	min-height: 500px;
}
</style>
<script src="./index.js"></script>
