<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong
							>{{ userType.id == 0 ? "Add " : "" }}User Type{{
								userType.id > 0 ? " - " + userType.name : ""
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
								<div class="form-group">
									<validation-provider
										name="User Type"
										rules="required"
										v-slot="{ errors }"
									>
										<label
											for="nf-email"
											class=" form-control-label"
											>User Type</label
										><span class="text-danger">*</span>
										<input
											type="text"
											id="user_type"
											name="user_type"
											v-model="userType.name"
											placeholder="Enter User Type..."
											class="au-input au-input--full form-control"
										/>
										<span class="invalid-feedback">{{
											errors[0]
										}}</span>
									</validation-provider>
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
									v-if="userType.id === 0"
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
