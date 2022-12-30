<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Service Charges</strong>
					</div>
					<ValidationObserver
						ref="observer"
						v-slot="{ handleSubmit }"
					>
						<form
							@submit.prevent="
								handleSubmit(validateServiceCharge)
							"
						>
							<div class="card-body card-block">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<validation-provider
												name="Maintainancen Charge"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="maintainance_charge"
													class=" form-control-label"
													>Maintainancen Charge</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="maintainance_charge"
													name="maintainance_charge"
													v-model="
														serviceCharge.maintainance_charge
													"
													placeholder="Enter Maintainancen Charge..."
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
												name="Insurance"
												rules="required|numeric"
												v-slot="{ errors }"
											>
												<label
													for="insurance"
													class=" form-control-label"
													>Insurance</label
												><span class="text-danger"
													>*</span
												>
												<input
													type="text"
													id="insurance"
													name="insurance"
													v-model="
														serviceCharge.insurance
													"
													placeholder="Enter Insurance"
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
				title="Service Charges"
				search-id="service_charges_search"
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
									<th>Maintainance Charge</th>
									<th>Insurance</th>
									<th></th>
								</tr>
							</thead>
							<tbody v-if="showLoader">
								<tr>
									<td colspan="3" class="text-center">
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
									v-for="(charge, k) in serviceChargeList"
									:key="k"
								>
									<td>
										{{ charge.maintainance_charge }}
									</td>
									<td>
										{{ charge.insurance }}
									</td>
									<td>
										<div class="table-data-feature">
											<button
												class="item"
												data-toggle="tooltip"
												data-placement="top"
												title="Delete"
												@click="getDetail(charge.id)"
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
												@click="deleteRecord(charge.id)"
											>
												<i
													class="far fa-trash-alt theme-trash"
												></i>
											</button>
										</div>
									</td>
								</tr>
								<tr v-if="serviceChargeList.length === 0">
									<td colspan="3" class="text-center">
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
