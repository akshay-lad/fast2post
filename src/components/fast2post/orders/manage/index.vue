<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<div class="default-tab">
							<nav>
								<div
									class="nav nav-tabs"
									id="nav-tab"
									role="tablist"
								>
									<a
										class="nav-item nav-link active"
										id="nav-home-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('order-detail')"
										role="tab"
										aria-controls="nav-home"
										aria-selected="true"
										>Order Detail</a
									>
									<a
										v-bind:class="{
											'nav-item nav-link': true,
											disabled: !($route.params.id > 0)
										}"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('transactions')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										>Transactions</a
									>
								</div>
							</nav>
							<div class="tab-content pt-4" id="nav-tabContent">
								<div
									v-bind:class="{
										'tab-pane fade': true,
										'show active':
											currentTab === 'order-detail'
									}"
									id="nav-home"
									v-if="currentTab == 'order-detail'"
									role="tabpanel"
									aria-labelledby="nav-home-tab"
								>
									<div class="card">
										<div class="card-header">
											<strong
												>{{
													order.id == 0 ? "Add " : ""
												}}Order{{
													order.id > 0
														? " - " +
														  order.order_number
														: ""
												}}</strong
											>
											<div class="back-btn">
												<router-link
													:to="backUrl"
													class="btn btn-outline-primary btn-sm"
												>
													<i
														class="fa fa-arrow-left"
													></i>
													Back
												</router-link>
											</div>
										</div>

										<ValidationObserver ref="observer">
											<form>
												<div
													class="card-body card-block"
												>
													<fieldset
														:disabled="
															order.id > 0 &&
																order.order_status !=
																	'InProgress'
														"
													>
														<div class="row">
															<div
																class="col-md-12"
															>
																<h4>
																	Customer
																	Details
																</h4>
																<hr />
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Order Date"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="order_date"
																			class=" form-control-label"
																			>Order
																			Date</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<VueCtkDateTimePicker
																			v-model="
																				order.order_date
																			"
																			:dark="
																				isTheme
																			"
																			id="order_date"
																			name="order_date"
																			format="YYYY-MM-DD"
																			output-format="YYYY-MM-DD"
																			auto-close
																			only-date
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>

															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Payment Mode"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="payment_mode"
																			class=" form-control-label"
																			>Payment
																			Mode</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<div>
																			<div
																				class="form-check-inline form-check"
																			>
																				<label
																					for="inline-radio1"
																					class="form-check-label m-r-10"
																				>
																					<input
																						type="radio"
																						id="inline-radio1"
																						name="inline-radios"
																						v-model="
																							order.payment_mode
																						"
																						value="prepaid"
																						class="form-check-input"
																					/>
																					Prepaid
																				</label>
																				<label
																					for="inline-radio2"
																					class="form-check-label "
																				>
																					<input
																						type="radio"
																						id="inline-radio2"
																						name="inline-radios"
																						v-model="
																							order.payment_mode
																						"
																						value="cod"
																						class="form-check-input"
																					/>
																					Cash
																					On
																					Delivery
																				</label>
																			</div>
																		</div>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Total Weight"
																		rules="required|numeric"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="total_weight"
																			class=" form-control-label"
																			>Total
																			Weight
																			(in
																			gm
																			)</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="total_weight"
																			name="total_weight"
																			v-model="
																				order.total_weight
																			"
																			placeholder="Enter total weight..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Order Amount"
																		rules="required|numeric"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="total_order_amount"
																			class=" form-control-label"
																			>Order
																			Amount</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="total_order_amount"
																			name="total_order_amount"
																			v-model="
																				order.total_order_amount
																			"
																			placeholder="Enter total order amount..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-12 p-r-5"
															>
																<label
																	class=" form-control-label"
																	>Order
																	Dimension
																	(in
																	cm)</label
																><span
																	class="text-danger"
																	>*</span
																><br />
															</div>
															<div
																class="col-md-2 p-r-5"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="width"
																		rules="required|decimal"
																		v-slot="{
																			errors
																		}"
																	>
																		<input
																			type="text"
																			id="width"
																			name="width"
																			v-model="
																				order.width
																			"
																			placeholder="width..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<span
																class="cross-spliter"
																>X</span
															>
															<div
																class="col-md-2 p-r-5 p-l-5"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="height"
																		rules="required|decimal"
																		v-slot="{
																			errors
																		}"
																	>
																		<input
																			type="text"
																			id="width"
																			name="height"
																			v-model="
																				order.height
																			"
																			placeholder="height..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<span
																class="cross-spliter"
																>X</span
															>
															<div
																class="col-md-2 p-r-5 p-l-5"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="length"
																		rules="required|decimal"
																		v-slot="{
																			errors
																		}"
																	>
																		<input
																			type="text"
																			id="length"
																			name="length"
																			v-model="
																				order.length
																			"
																			placeholder="length..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Pincode"
																		rules="required|numeric"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="pincode"
																			class=" form-control-label"
																			>Pincode</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="pincode"
																			name="pincode"
																			v-model="
																				order.pincode
																			"
																			placeholder="Enter Pincode..."
																			@blur="
																				getCityStateCountryByPincode
																			"
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Country"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="country"
																			class=" form-control-label"
																			>Country</label
																		><span
																			class="text-danger"
																			>*</span
																		>

																		<input
																			type="text"
																			id="country"
																			name="country"
																			v-model="
																				order.country
																			"
																			placeholder="Enter Country Name..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="State"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="state"
																			class=" form-control-label"
																			>State</label
																		><span
																			class="text-danger"
																			>*</span
																		>

																		<input
																			type="text"
																			id="state"
																			name="state"
																			v-model="
																				order.state
																			"
																			placeholder="Enter State Name..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="City"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="city"
																			class=" form-control-label"
																			>City</label
																		><span
																			class="text-danger"
																			>*</span
																		>

																		<input
																			type="text"
																			id="city"
																			name="city"
																			v-model="
																				order.city
																			"
																			placeholder="Enter City Name..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Address 1"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="address1"
																			class=" form-control-label"
																			>Address
																			1</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<textarea
																			id="address1"
																			name="address1"
																			v-model="
																				order.address1
																			"
																			placeholder="Enter Address 1..."
																			class="au-input au-input--full form-control"
																			rows="3"
																		></textarea>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="address2"
																		class=" form-control-label"
																		>Address
																		2</label
																	>
																	<textarea
																		id="address2"
																		name="address2"
																		v-model="
																			order.address2
																		"
																		placeholder="Enter Address 2..."
																		class="au-input au-input--full form-control"
																		rows="3"
																	></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Customer Name"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="customer_name"
																			class=" form-control-label"
																			>Customer
																			Name</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="customer_name"
																			name="customer_name"
																			v-model="
																				order.customer_name
																			"
																			placeholder="Enter Customer Name..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Email"
																		rules="required|email"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="email"
																			class=" form-control-label"
																			>Email</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="email"
																			name="email"
																			v-model="
																				order.email
																			"
																			placeholder="Enter Email"
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Contact Number 1"
																		rules="required"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="contact_number1"
																			class=" form-control-label"
																			>Contact
																			Number
																			1</label
																		><span
																			class="text-danger"
																			>*</span
																		>
																		<input
																			type="text"
																			id="contact_number1"
																			name="contact_number1"
																			v-model="
																				order.contact_number1
																			"
																			placeholder="Enter Contact Number 1..."
																			class="au-input au-input--full form-control"
																			maxlength="10"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Contact Number 2"
																		rules="numeric"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="contact_number2"
																			class=" form-control-label"
																			>Contact
																			Number
																			2</label
																		>
																		<input
																			type="text"
																			id="contact_number2"
																			name="contact_number2"
																			v-model="
																				order.contact_number2
																			"
																			placeholder="Enter Contact Number 2..."
																			class="au-input au-input--full form-control"
																			maxlength="10"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-12"
															>
																<h4>
																	Order Detail
																</h4>
																<hr />
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Order Number"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="order_number"
																			class=" form-control-label"
																			>Order
																			Number</label
																		>
																		<input
																			type="text"
																			id="order_number"
																			name="order_number"
																			v-model="
																				order.order_number
																			"
																			placeholder="Enter Order Number..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Order Url"
																		:rules="{
																			regex: /^(http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/
																		}"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="order_url"
																			class=" form-control-label"
																			>Order
																			Url</label
																		>
																		<input
																			type="text"
																			id="order_url"
																			name="order_url"
																			v-model="
																				order.order_url
																			"
																			placeholder="Enter Order Url..."
																			class="au-input au-input--full form-control"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
														</div>

														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="reference_number"
																		class=" form-control-label"
																		>Reference
																		Number</label
																	>
																	<input
																		type="text"
																		id="reference_number"
																		name="reference_number"
																		v-model="
																			order.reference_number
																		"
																		placeholder="Enter Reference Number..."
																		class="au-input au-input--full form-control"
																		disabled
																	/>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="barcode_number"
																		class=" form-control-label"
																		>Barcode
																		Number</label
																	>
																	<input
																		type="text"
																		id="barcode_number"
																		name="barcode_number"
																		v-model="
																			order.barcode_number
																		"
																		placeholder="Enter Barcode Number..."
																		class="au-input au-input--full form-control"
																		disabled
																	/>
																</div>
															</div>
														</div>
														<div class="row">
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="total_charge_amount"
																		class=" form-control-label"
																		>Total
																		Charge
																		Amount</label
																	>
																	<input
																		type="text"
																		disabled="disabled"
																		id="total_charge_amount"
																		name="total_charge_amount"
																		v-model="
																			order.total_charge_amount
																		"
																		placeholder="Enter total charge amount..."
																		class="au-input au-input--full form-control"
																	/>
																</div>
															</div>
															<div
																class="col-md-6"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="order_status"
																		class=" form-control-label"
																		>Order
																		Status</label
																	>
																	<br />
																	<label
																		for="order_status"
																		class=" form-control-label"
																		><span
																			class="badge badge-success"
																			>{{
																				order.order_status
																			}}</span
																		></label
																	>
																</div>
															</div>
														</div>

														<br />
														<br />
														<div class="row">
															<div
																class="col-md-12"
															>
																<h4>
																	Order Items
																</h4>
																<hr />
															</div>
														</div>

														<div
															class="row"
															v-if="order.id == 0"
														>
															<div
																class="col-md-3"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="sku"
																		class=" form-control-label"
																		>Sku</label
																	>
																	<input
																		type="text"
																		id="sku"
																		name="sku"
																		ref="sku"
																		v-model="
																			order_item.sku
																		"
																		placeholder="Enter sku..."
																		class="au-input au-input--full form-control"
																	/>
																</div>
															</div>
															<div
																class="col-md-3"
															>
																<div
																	class="form-group"
																>
																	<label
																		for="item_code"
																		class=" form-control-label"
																		>Item
																		Code</label
																	>
																	<input
																		type="text"
																		id="item_code"
																		name="item_code"
																		ref="item_code"
																		v-model="
																			order_item.item_code
																		"
																		placeholder="Enter item code..."
																		class="au-input au-input--full form-control"
																	/>
																</div>
															</div>
															<div
																class="col-md-3"
															>
																<div
																	class="form-group"
																>
																	<validation-provider
																		name="Quantity"
																		rules="numeric"
																		v-slot="{
																			errors
																		}"
																	>
																		<label
																			for="Quantity"
																			class=" form-control-label"
																			>Quantity</label
																		>
																		<input
																			type="text"
																			id="quantity"
																			name="quantity"
																			v-model="
																				order_item.quantity
																			"
																			placeholder="Enter Quantity"
																			class="au-input au-input--full form-control"
																			maxlength="4"
																			ref="item_quantity"
																		/>
																		<span
																			class="invalid-feedback"
																			>{{
																				errors[0]
																			}}</span
																		>
																	</validation-provider>
																</div>
															</div>
															<div
																class="col-md-2"
															>
																<button
																	type="button"
																	class="btn btn-outline-primary btn-sm w-100 m-t-30"
																	@click="
																		addOrderItem
																	"
																>
																	<i
																		class="fas fa-plus"
																	></i
																	>&nbsp; Add
																</button>
															</div>
														</div>
														<div class="row">
															<div
																class="col-lg-12"
															>
																<!-- DATA TABLE -->
																<div
																	class="table-responsive table--no-card m-b-30"
																>
																	<table
																		class="table table-borderless table-striped table-earning"
																	>
																		<thead>
																			<tr>
																				<th>
																					Sku
																				</th>
																				<th>
																					Item
																					Code
																				</th>
																				<th>
																					Quantity
																				</th>
																				<th></th>
																			</tr>
																		</thead>
																		<tbody
																			v-if="
																				showLoader
																			"
																		>
																			<tr>
																				<td
																					colspan="4"
																					class="text-center"
																				>
																					<img
																						src="/images/icon/loader.gif"
																						height="70"
																						width="70"
																					/>
																				</td>
																			</tr>
																		</tbody>
																		<tbody
																			v-else
																		>
																			<tr
																				class="tr-shadow"
																				v-for="(order_item,
																				k) in order.order_items"
																				:key="
																					k
																				"
																			>
																				<td>
																					{{
																						order_item.sku
																					}}
																				</td>
																				<td>
																					{{
																						order_item.item_code
																					}}
																				</td>
																				<td>
																					{{
																						order_item.quantity
																					}}
																				</td>
																				<td>
																					<div
																						class="table-data-feature"
																					>
																						<!--	<button
																						class="item"
																						data-toggle="tooltip"
																						data-placement="top"
																						title="Delete"
																						@click="getOrderItem(order_item.id)"
																					>
																						<i
																							class="far fa-edit theme-color"
																						></i
																					></button> -->
																						<button
																							class="item"
																							data-toggle="tooltip"
																							data-placement="top"
																							title="Delete"
																							v-on:click="
																								removeOrderItem(
																									k
																								)
																							"
																							v-if="
																								order.id ==
																									0
																							"
																						>
																							<i
																								class="far fa-trash-alt theme-trash"
																							></i>
																						</button>
																					</div>
																				</td>
																			</tr>
																			<tr
																				v-if="
																					order
																						.order_items
																						.length ===
																						0
																				"
																			>
																				<td
																					colspan="3"
																					class="text-center"
																				>
																					No
																					record
																					found.
																				</td>
																			</tr>
																			<tr
																				class="spacer"
																			></tr>
																		</tbody>
																	</table>
																</div>
																<!-- END DATA TABLE -->
															</div>
														</div>

														<br />
														<br />
													</fieldset>
												</div>
												<div
													class="card-footer text-right"
													v-show="
														order.order_status ==
															'InProgress'
													"
												>
													<button
														type="button"
														@click="validateOrder"
														class="btn btn-outline-primary btn-sm"
													>
														<i
															class="fas fa-save"
														></i
														>&nbsp; Save</button
													>&nbsp;&nbsp;
													<button
														v-if="order.id === 0"
														type="button"
														class="btn btn-outline-danger btn-sm"
														@click="resetForm"
													>
														<i
															class="fas fa-sync-alt"
														></i>
														Reset
													</button>
												</div>
											</form>
										</ValidationObserver>
									</div>
								</div>
								<div
									v-bind:class="{
										'tab-pane fade': true,
										'show active':
											currentTab === 'transactions'
									}"
									id="nav-profile"
									v-if="currentTab == 'transactions'"
									role="tabpanel"
									aria-labelledby="nav-profile-tab"
								>
									<div
										class="table-responsive table--no-card m-b-30"
									>
										<table
											class="table table-borderless table-striped table-earning"
										>
											<thead>
												<tr>
													<th>Description</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												<tr
													class="tr-shadow"
													v-for="(log,
													k) in transactions"
													:key="k"
												>
													<td>
														{{ log.description }}
													</td>
													<td>
														{{ log.created_at }}
													</td>
												</tr>
												<tr
													v-if="
														transactions.length ===
															0
													"
												>
													<td
														colspan="2"
														class="text-center"
													>
														No record found.
													</td>
												</tr>
												<tr class="spacer"></tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row"></div>
	</div>
</template>
<script src="./index.js"></script>
