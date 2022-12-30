<template>
	<div>
		<header-list
			title="All Orders"
			search-id="user_search"
			add-url="https://www.shipshop.in/shipshop_user/user/registration"
			:direct-link="true"
			@search="search"
		></header-list>
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
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{ active: orderStatus == '' }"
										><i
											class="fas fa-truck theme-color"
										></i>
										All Orders
										<span class="badge badge-success">{{
											ordersTotal.total_orders
										}}</span></a
									>
									<a
										v-if="
											usertype != 'deliveryboy' &&
												usertype != 'staff'
										"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('pending')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active: orderStatus == 'pending'
										}"
										><i class="fas fa-map-marker-alt"></i>
										Un Paid
										<span class="badge badge-success">{{
											ordersTotal.total_pending
										}}</span></a
									>
									<a
										v-if="
											usertype != 'deliveryboy' &&
												usertype != 'staff'
										"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('received')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active: orderStatus == 'received'
										}"
										><i class="fas fa-home"></i>
										Paid
										<span class="badge badge-success">{{
											ordersTotal.total_received
										}}</span></a
									>
								</div>
							</nav>
							<div class="tab-content pt-4" id="nav-tabContent">
								<div
									class="tab-pane fade show active"
									id="nav-home"
									role="tabpanel"
									aria-labelledby="nav-home-tab"
								>
									<div class="form-group row">
										<div class="d-inline-block ml-3">
											<p>Download Page Size</p>
											<select class="au-input" v-model="downloadPageSize">
												<option value="1">1</option>
												<option value="2">1/2</option>
												<option value="4">1/4</option>

											</select>
										</div>
										<div class="col-lg-4">
											<VueCtkDateTimePicker
												v-model="selectedDateRange"
												:dark="isTheme"
												format="YYYY-MM-DD"
												:range="true"
												:shortcut="'last30Days'"
												output-format="YYYY-MM-DD"
												auto-close
												only-date
											/>
										</div>
										<button
											class="btn btn-outline-success btn-md "
											title="Filter"
											@click="changeTab(orderStatus)"
										>
											<i class="fas fa-filter"></i>
											Filter
										</button>
										<button
										v-if="orderStatus == 'pending'"
											class="btn btn-outline-success btn-md m-l-10"
											title="Export"
											@click="changeTab(orderStatus,true)"
										>
											<i class="fas fa-filter"></i>
											Export
										</button>
										<button
											class="btn btn-outline-success btn-md m-l-10"
											v-if="
												(usertype == 'superadmin' ||
													usertype == 'admin') &&
													orderStatus == 'pending'
											"
											@click="updatePayment(null)"
										>
											<i class="fas fa-filter"></i>
											Paid Bulk Order
										</button>
										<button
											class="btn btn-outline-success m-l-10 btn-md w-80"
											title="Import Paid Order"
											data-toggle="modal"
											data-target="#staticOrderPaidModal"
											v-if="(usertype == 'superadmin' ||
													usertype == 'admin')"
										>
											<i
												class="fas fa-cloud-upload-alt"
											></i>
											Import Paid Order
										</button>
									</div>
									<div
										class=""
										v-if="
											usertype == 'admin' ||
												usertype == 'superadmin'
										"
									>
										<div class="row form-group">
											<div class="col-md-8 col-xs-12">
												<label class="typo__label"
													><strong>Client</strong></label
												>
												<multi-select
													v-model="selectedClient"
													tag-placeholder="Select Client"
													placeholder="Search Client"
													label="displayName"
													track-by="id"
													:options="clientList"
													:multiple="true"
													:taggable="true"
												></multi-select>
											</div>
											<div class="col-md-2 col-xs-12">
												<label class="typo__label"
													><strong>Payment Type</strong></label
												>
												<select class="form-control" v-model="paymentType">
													<option value="all">All</option>
													<option value="cod">COD</option>
													<option value="prepaid">Prepaid</option>
												</select>
											</div>
											<div class="col-md-2 col-xs-12">
												<br>
												<button
													class="btn btn-outline-success btn-md mt-2"
													title="Filter"
													@click="
														changeTab(orderStatus)
													"
												>
													<i
														class="fas fa-filter"
													></i>
													Filter
												</button>
											</div>
										</div>
									</div>

									<!-- DATA TABLE -->
									<div
										class="table-responsive table--no-card m-b-30"
									>
										<table
											class="table table-borderless table-striped table-earning"
										>
											<thead>
												<tr>
													<th
														style="vertical-align: top;"
													>
														<label
															class="au-checkbox"
														>
															<input
																type="checkbox"
																id="selectAllOrder"
																name="selectAllOrder"
																@click="
																	checkUncheckedOrderList
																"
																:checked="
																	selectAllOrder
																"
															/>
															<span
																class="au-checkmark"
															></span>
														</label>
													</th>
													<th>
														Order
													</th>
													<th>Customer</th>
													<th>Seller</th>
													<th></th>
												</tr>
											</thead>
											<tbody v-if="showLoader">
												<tr>
													<td
														colspan="5"
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
											<tbody v-else>
												<tr
													class="tr-shadow"
													v-for="(order,
													k) in orderList"
													:key="k"
												>
													<td width="5%">
														<label
															class="au-checkbox"
														>
															<input
																type="checkbox"
																v-model="
																	order.isSelected
																"
															/>
															<span
																class="au-checkmark"
															></span>
														</label>
													</td>
													<td width="26%">
														<strong>REF#: </strong
														>{{
															order.reference_number
														}}<br />
														<strong
															>Barcode: </strong
														>{{
															order.barcode_number
														}}<br />
														<span
															class="badge badge-success"
															>{{
																order.order_status
															}}</span
														>
														<span
															class="ml-2 badge"
															:class="
																order.payment_mode ===
																'cod'
																	? 'badge-success'
																	: 'badge-primary'
															"
															>{{
																order.payment_mode
															}}</span
														>
													</td>
													<td width="25%">
														{{ order.customer_name
														}}<br />
														<strong
															><i
																class="fas fa-envelope"
															></i> </strong
														>&nbsp;{{ order.email
														}}<br />
														<strong
															><i
																class="fas fa-tty"
															></i> </strong
														>&nbsp;{{
															order.contact_number1
														}}<br />
													</td>
													<td width="23%">
														<template
															v-if="order.client"
														>
															{{
																order.client
																	.firstname
															}}
															{{
																order.client
																	.lastname
															}}
														</template>
													</td>
													<td>
														<div
															class="table-data-feature"
														>
															<button
																href="javascript:;"
																v-if="
																	(usertype ==
																		'superadmin' ||
																		usertype ==
																			'admin') &&
																		order.payment_mode ===
																			'cod' &&
																		orderStatus ==
																			'pending'
																"
																class="btn btn-outline-success btn-sm"
																title="Paid"
																@click="
																	updatePayment(
																		order.id
																	)
																"
															>
																Paid
															</button>
															<router-link
																:to="
																	'/order/' +
																		order.id
																"
																class="item"
																data-toggle="tooltip"
																data-placement="top"
																title="View"
																v-if="
																	orderStatus ==
																		'inprogress' &&
																		usertype !=
																			'deliveryboy'
																"
															>
																<i
																	class="fas fa-info theme-color"
																></i
															></router-link>
															<a
																href="javascript:;"
																v-if="
																	order.barcode_number &&
																		order
																			.barcode_number
																			.length >
																			0 &&
																		(order.payment_mode ==
																			'cod' ||
																			(order.payment_mode ==
																				'prepaid' &&
																				order.payment_status !=
																					'Pending'))
																"
																@click="
																	downloadPdf(
																		order.id
																	)
																"
																class="item"
																data-toggle="tooltip"
																data-placement="top"
																title="PDF"
																><i
																	class="fas fa-print theme-color"
																></i
															></a>
															<a
																href="javascript:;"
																v-if="
																	usertype ==
																		'superadmin' ||
																		usertype ==
																			'admin' ||
																		(orderStatus ==
																			'inprogress' &&
																			usertype !=
																				'deliveryboy')
																"
																class="item"
																data-toggle="tooltip"
																data-placement="top"
																title="Delete"
																@click="
																	deleteRecord(
																		order.id
																	)
																"
															>
																<i
																	class="far fa-trash-alt theme-trash"
																></i>
															</a>
														</div>
													</td>
												</tr>
												<tr
													v-if="
														orderList.length === 0
													"
												>
													<td
														colspan="5"
														class="text-center"
													>
														No record found.
													</td>
												</tr>
												<tr class="spacer"></tr>
											</tbody>
										</table>
									</div>
									<div class="row">
										<div class="col-md-3">
											<label class="w-50 align-top"
												>Record Per Page:</label
											>
											<select
												v-model="paginate.per_page"
												@change="changeTab(orderStatus)"
												class="au-input au-input--full form-control d-inline-block w-50"
											>
												<option value="25">25</option>
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="-1">All</option>
											</select>
										</div>
										<div class="col-md-6">
											<div class="text-center">
												<paginate
													ref="paginate"
													:page-count="
														paginate.page_count
													"
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
										</div>
										<div class="col-md-3"></div>
									</div>
									<!-- END DATA TABLE -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<import-paid @orderUploaded="changeTab(orderStatus)"></import-paid>
	</div>
</template>
<script src="./index.js" />
<style scoped>
.nav-item {
	text-align: center;
}
</style>
