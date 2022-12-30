<template>
	<div>
		<div>
			<header-list
				title="Delivery boy Pincodes"
				search-id="delivery_boy_pincode_search"
				@search="search"
			></header-list>
			<div class="row">
				<div class="col-md-4 col-xs-12">
					<div class="form-group">
						<validation-provider
							name="Country"
							rules="required"
							v-slot="{ errors }"
						>
							<label for="nf-email" class=" form-control-label"
								>Country</label
							><span class="text-danger">*</span>
							<select
								class="au-input au-input--full form-control"
								name="country"
								id="country"
								v-model="deliveryPincode.country_id"
								@change="
									getStateByCountry(
										deliveryPincode.country_id
									)
								"
							>
								<option value="">Please select</option>
								<option
									v-for="country in countryList"
									:value="country.id"
									:key="country.id"
								>
									({{ country.phone_code }})
									{{ country.code }} -
									{{ country.name }}
								</option>
							</select>
							<span class="invalid-feedback">{{
								errors[0]
							}}</span>
						</validation-provider>
					</div>
				</div>
				<div class="col-md-4 col-xs-12">
					<div class="form-group">
						<validation-provider
							name="State"
							rules="required"
							v-slot="{ errors }"
						>
							<label for="nf-email" class=" form-control-label"
								>State</label
							><span class="text-danger">*</span>
							<select
								class="au-input au-input--full form-control"
								name="state"
								id="state"
								v-model="deliveryPincode.state_id"
								@change="
									getCityByState(deliveryPincode.state_id)
								"
							>
								<option value="">Please select</option>
								<option
									v-for="state in stateList"
									:value="state.id"
									:key="state.id"
								>
									{{ state.name }}
								</option>
							</select>
							<span class="invalid-feedback">{{
								errors[0]
							}}</span>
						</validation-provider>
					</div>
				</div>
				<div class="col-md-4 col-xs-12">
					<div class="form-group">
						<validation-provider
							name="City"
							rules="required"
							v-slot="{ errors }"
						>
							<label for="nf-email" class=" form-control-label"
								>City</label
							><span class="text-danger">*</span>
							<select
								class="au-input au-input--full form-control"
								name="city"
								id="city"
								@change="
									getPincodeByCity(deliveryPincode.city_id)
								"
								v-model="deliveryPincode.city_id"
							>
								<option value="">Please select</option>
								<option
									v-for="city in cityList"
									:value="city.id"
									:key="city.id"
								>
									{{ city.name }}
								</option>
							</select>
							<span class="invalid-feedback">{{
								errors[0]
							}}</span>
						</validation-provider>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<!-- DATA TABLE -->
					<div class="table-responsive table--no-card m-b-30">
						<table
							class="table table-borderless table-striped table-earning"
						>
							<thead>
								<tr>
									<th>Pincode</th>
									<th>Delivery boy</th>
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
									v-for="(pincode, k) in pincodeList"
									:key="k"
								>
									<td width="20%">
										{{ pincode.pincode }}
									</td>
									<td width="50%">
										<!-- <template
											v-if="pincode.deliveryboy_pincode"
										>
											{{
												pincode.deliveryboy_pincode
													.deliveryboy.firstname
											}}
											{{
												pincode.deliveryboy_pincode
													.deliveryboy.lastname
											}}
											({{
												pincode.deliveryboy_pincode
													.deliveryboy.contact_no
											}})
										</template>
										<template v-else> -->
										<select
											class="au-input au-input--full form-control"
											name="deliveryboy_id"
											id="deliveryboy_id"
											v-model="pincode.deliveryboy_id"
										>
											<option value=""
												>Please select</option
											>
											<option
												v-for="user in deliveryBoyList"
												:value="user.id"
												:key="user.id"
											>
												{{ user.firstname }}
												{{ user.lastname }} ({{
													user.contact_no
												}})
											</option>
										</select>
										<!-- </template> -->
									</td>
									<td width="30%">
										<button
											v-if="!pincode.deliveryboy_pincode"
											class="btn btn-outline-success btn-md w-80"
											title="Filter"
											@click="
												assignDeliveryBoy(
													pincode.id,
													pincode.deliveryboy_id
												)
											"
										>
											<i class="fas fa-download"></i>
											Assign
										</button>
										<button
											v-else
											class="btn btn-outline-success btn-md w-80"
											title="Filter"
											@click="
												updateDeliveryBoy(
													pincode.deliveryboy_pincode
														.id,
													pincode.id,
													pincode.deliveryboy_id
												)
											"
										>
											<i class="fas fa-download"></i>
											Update
										</button>
									</td>
								</tr>
								<tr v-if="pincodeList.length === 0">
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
