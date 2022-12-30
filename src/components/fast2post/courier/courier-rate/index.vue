<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Courier Rate</strong>
						<div class="back-btn">
							<router-link
								:to="backUrl"
								class="btn btn-outline-primary btn-sm"
							>
								<i class="fa fa-arrow-left"></i> Back
							</router-link>
						</div>
						<div class="back-btn"></div>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form
							@submit.prevent="handleSubmit(validateCourierRate)"
						>
							<div class="card-body card-block">
								<input
									type="hidden"
									id="courier_id"
									name="courier_id"
									v-model="courier_rate.courier_id"
								/>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Minimum Weight"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="min_weight"
													class=" form-control-label"
													>Minimum Weight</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="min_weight"
													name="min_weight"
													v-model="
														courier_rate.min_weight
													"
													placeholder="Enter Minimum Weight..."
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
												name="Maximum Weight"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="max_weight"
													class=" form-control-label"
													>Maximum Weight</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="max_weight"
													name="max_weight"
													v-model="
														courier_rate.max_weight
													"
													placeholder="Enter Maximum Weight"
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
												name="Minimum km"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="min_km"
													class=" form-control-label"
													>Minimum km</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="min_km"
													name="min_km"
													v-model="
														courier_rate.min_km
													"
													placeholder="Enter Minimum km..."
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
												name="Maximum km"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="max_km"
													class=" form-control-label"
													>Maximum km</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="max_km"
													name="max_km"
													v-model="
														courier_rate.max_km
													"
													placeholder="Enter Maximum km"
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
												name="Rate"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="rate"
													class=" form-control-label"
													>Rate</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="rate"
													name="rate"
													v-model="courier_rate.rate"
													placeholder="Enter Rate..."
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
								<button
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

		<div>
			<header-list
				title="Courier Rate"
				search-id="courier_rate_search"
				add-url="/courier_rate/0"
				@search="search"
			></header-list>
			<div class="row">
				<div class="col-lg-12">
					<!-- DATA TABLE -->
					<div class="table-responsive table--no-card m-b-30">
						<table
							class="table table-borderless table-striped table-earning"
						>
							<thead>
								<tr>
									<th>Min Weight</th>
									<th>Max Weight</th>
									<th>Min km</th>
									<th>Max km</th>
									<th>Rate</th>
									<th></th>
								</tr>
							</thead>
							<tbody v-if="showLoader">
								<tr>
									<td colspan="7" class="text-center">
										<img
											src="/images/icon/loader.gif"
											height="70"
											width="70"
										/>
									</td>
								</tr>
							</tbody>
							<tbody v-else>
								<tr
									class="tr-shadow"
									v-for="(crate, k) in courierRateList"
									:key="k"
								>
									<td>
										{{ crate.min_weight }}
									</td>
									<td>
										{{ crate.max_weight }}
									</td>
									<td>
										{{ crate.min_km }}
									</td>
									<td>
										{{ crate.max_km }}
									</td>
									<td>
										{{ crate.rate }}
									</td>
									<td>
										<div class="table-data-feature">
											<button
												class="item"
												data-toggle="tooltip"
												data-placement="top"
												title="Delete"
												@click="getDetail(crate.id)"
											>
												<i
													class="far fa-edit theme-color"
												></i>
											</button>
											<button
												class="item"
												data-toggle="tooltip"
												data-placement="top"
												title="Delete"
												@click="deleteRecord(crate.id)"
											>
												<i
													class="far fa-trash-alt theme-trash"
												></i>
											</button>
										</div>
									</td>
								</tr>
								<tr v-if="courierRateList.length === 0">
									<td colspan="4" class="text-center">
										No record found.
									</td>
								</tr>
								<tr class="spacer"></tr>
							</tbody>
						</table>
					</div>
					<div class="text-center">
						<paginate
							ref="paginate"
							:page-count="paginate.page_count"
							:click-handler="getNextPage"
							active-class="active"
							containerClass="pagination"
							page-class="'page-item'"
							:first-last-button="true"
							first-button-text="<<"
							last-button-text=">>"
							prev-text="<"
							next-text=">"
						>
						</paginate>
					</div>
					<!-- END DATA TABLE -->
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js" />
