<template>
	<div>
		<header-list
			title="Processing Orders"
			search-id="user_search"
			add-url="https://www.shipshop.in/shipshop_user/user/registration"
			:searchValue="searchText"
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
										v-if="
											usertype != 'deliveryboy' &&
												usertype != 'staff'
										"
										class="nav-item nav-link"
										id="nav-home-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('inprogress')"
										role="tab"
										aria-controls="nav-home"
										aria-selected="true"
										:class="{
											active: orderStatus == 'inprogress'
										}"
										><i class="fas fa-archive"></i>
										InProcess
										<span class="badge badge-success">{{
											ordersTotal.total_inprogress
										}}</span></a
									>
									<a
										v-if="
											usertype != 'deliveryboy' &&
												usertype != 'staff'
										"
										class="nav-item nav-link"
										id="nav-home-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('cart')"
										role="tab"
										aria-controls="nav-home"
										aria-selected="true"
										:class="{
											active: orderStatus == 'cart'
										}"
										><i class="fas fa-archive"></i>
										Cart
										<span class="badge badge-success">{{
											ordersTotal.total_cart
										}}</span></a
									>
									<a
										v-if="usertype != 'staff'"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('readyforpickup')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active:
												orderStatus == 'readyforpickup'
										}"
										><i
											class="fas fa-dolly theme-color"
										></i>
										Ready for PickUp
										<span class="badge badge-success">{{
											ordersTotal.total_readyforpickup
										}}</span></a
									>
									<a
										v-if="usertype != 'staff'"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('readytoship')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active: orderStatus == 'readytoship'
										}"
										><i
											class="fas fa-truck theme-color"
										></i>
										Ready to Ship
										<span class="badge badge-success">{{
											ordersTotal.total_readytoship
										}}</span></a
									>
									<a
										v-if="usertype != 'deliveryboy'"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('intransit')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active: orderStatus == 'intransit'
										}"
										><i class="fas fa-map-marker-alt"></i>
										In Transist
										<span class="badge badge-success">{{
											ordersTotal.total_intransit
										}}</span></a
									>
									<a
										v-if="usertype != 'deliveryboy'"
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('delivered')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										:class="{
											active: orderStatus == 'delivered'
										}"
										><i class="fas fa-home"></i>
										Delivered
										<span class="badge badge-success">{{
											ordersTotal.total_delivered
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
											class="btn btn-outline-success btn-md m-l-10"
											title="Filter"
											v-if="
												orderStatus != 'inprogress' &&
													orderStatus != 'cart'
											"
											@click="downloadPdf(null)"
										>
											<i class="fas fa-filter"></i>
											Generate Pdf
										</button>
										<button
											class="btn btn-outline-success btn-md m-l-10 w-80"
											title="Export IP"
											data-toggle="modal"
											data-target="#staticOrderExportModal"
											v-if="orderStatus === 'readytoship' || orderStatus === 'intransit'"
										>
											<i class="fas fa-download"></i>
											Export IP
										</button>
										<button
											class="btn btn-outline-success btn-md m-l-10 w-80"
											title="Export Barcode"
											v-if="
												orderStatus === 'intransit' &&
													usertype != 'deliveryboy'
											"
											@click="
												changeTab(orderStatus, true,true)
											"
										>
											<i class="fas fa-download"></i>
											Export Barcode
										</button>
										<button
											class="btn btn-outline-success btn-md m-l-10 w-80"
											title="Export"
											v-if="
												orderStatus === 'intransit' &&
													usertype == 'staff'
											"
											@click="
												changeTab(orderStatus, true)
											"
										>
											<i class="fas fa-download"></i>
											Export
										</button>
										
										<!-- <button
											class="btn btn-outline-success m-l-10 btn-md w-80"
											title="Import order"
											data-toggle="modal"
											data-target="#staticModal"
											v-if="usertype != 'staff'"
										>
											<i
												class="fas fa-cloud-upload-alt"
											></i>
											Import order
										</button>
										 -->
									</div>
									<div class="form-group row">
										<button
											v-if="usertype == 'superadmin' ||
													usertype == 'admin'"
											class="btn btn-outline-success m-l-10 btn-md w-80"
											title="Import track data"
											data-toggle="modal"
											data-target="#staticTrackModal"
										>
											<i
												class="fas fa-cloud-upload-alt"
											></i>
											Import track data
										</button>
										<button
											class="btn btn-outline-danger btn-md m-l-10"
											v-if="
												usertype == 'superadmin' ||
													usertype == 'admin' ||
													(orderStatus ==
														'inprogress' &&
														usertype !=
															'deliveryboy')
											"
											@click="deleteRecord(null)"
										>
											<i class="far fa-trash-alt"></i>
											Delete Bulk
										</button>
										<button
											class="btn btn-outline-warning btn-md m-l-10"
											v-if="(orderStatus ==
														'inprogress' &&
														usertype !=
															'deliveryboy')
											"
											data-toggle="modal"
											data-target="#staticCourierList"
										>
											<i class="fas fa-truck"></i>
											Assign Courier
										</button>
										
										<button
											class="btn btn-outline-success btn-md m-l-10"
											v-if="orderStatus == 'cart'"
											@click="updatePayment(null)"
										>
											<i class="fas fa-filter"></i>
											Paid Bulk Order
										</button>
										<button
											v-if="
												orderStatus == 'intransit' &&
													usertype != 'deliveryboy'
											"
											class="btn btn-outline-success btn-sm m-l-10"
											title="Complain"
											@click="updateComplain(null)"
										>
											Complain Bulk
										</button>
										<button
											v-if="
												orderStatus ==
													'readyforpickup' &&
													usertype !=
														'client'
											"
											@click="
												pickUpOrder(
													null
												)
											"
											class="btn btn-outline-success btn-sm m-l-10"
											title="Pick Up"
										>
											<i
												class="fas fa-cubes"
											></i>
											Pick Up
										</button>
										<button
											v-if="
												orderStatus ==
													'readytoship' &&
													usertype !=
														'client'
											"
											@click="
												deliverToCourier(null)"
											class="btn btn-outline-success btn-sm m-l-10"
											title="Deliver to Courier"
										>
											<i
												class="fas fa-box"
											></i>
											Deliver to
											Courier
										</button>
										<button
											v-if="
												orderStatus ==
													'intransit' &&
													usertype !=
														'client'
											"
											@click="
												delivered(null)
											"
											class="btn btn-outline-success btn-sm m-l-10"
											title="Delivered"
										>
											<i
												class="fas fa-box"
											></i>
											Delivered
										</button>
										<button
											v-if="
												(orderStatus ==
																			'intransit' || orderStatus ==
																			'delivered') &&
													usertype !=
														'client'
											"
											@click="
												returnedOrder(null)
											"
											class="btn btn-outline-success btn-sm  m-l-10"
											title="Return"
										>
											<i
												class="fas fa-box"
											></i>
											Return
										</button>
									</div>
									<div
										class="form-group"
										v-if="orderStatus == 'cart'"
									>
										Total Payable Amout :
										{{ totalPayableAmount }}
									</div>
									<div
										class=""
										v-if="
											usertype == 'admin' ||
												usertype == 'superadmin'  ||
												usertype == 'staff'
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
														<span
															v-if="
																order.complain_status ===
																	'requested'
															"
															class="ml-2 badge badge-danger"
														>
															Complain
															Raised</span
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
													<td width="20%">
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
															<div class="mb-2">
																<button
																	href="javascript:;"
																	v-if="
																		orderStatus ==
																			'cart'
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
																	v-if="
																		orderStatus ==
																			'inprogress'
																	"
																	:to="
																		'/assign-courier/' +
																			order.id
																	"
																	class="item"
																	data-toggle="tooltip"
																	data-placement="top"
																	title="Assign-courier"
																>
																	<i
																		class="fas fa-truck text-warning"
																	></i
																></router-link>

																<button
																	v-if="
																		orderStatus ==
																			'readyforpickup' &&
																			usertype !=
																				'client'
																	"
																	@click="
																		pickUpOrder(
																			order.id
																		)
																	"
																	class="btn btn-outline-success btn-sm"
																	title="Pick Up"
																>
																	<i
																		class="fas fa-cubes"
																	></i>
																	Pick Up
																</button>
																<button
																	v-if="
																		orderStatus ==
																			'readytoship' &&
																			usertype !=
																				'client'
																	"
																	@click="
																		deliverToCourier(
																			order.id
																		)
																	"
																	class="btn btn-outline-success btn-sm"
																	title="Deliver to Courier"
																>
																	<i
																		class="fas fa-box"
																	></i>
																	Deliver to
																	Courier
																</button>
																<button
																	v-if="
																		orderStatus ==
																			'intransit' &&
																			usertype !=
																				'client'
																	"
																	@click="
																		delivered(
																			order.id
																		)
																	"
																	class="btn btn-outline-success btn-sm"
																	title="Delivered"
																>
																	<i
																		class="fas fa-box"
																	></i>
																	Delivered
																</button>
																<button
																	v-if="
																		(orderStatus ==
																			'intransit' || orderStatus ==
																			'delivered') &&
																			usertype !=
																				'client'
																	"
																	@click="
																		returnedOrder(
																			order.id
																		)
																	"
																	class="btn btn-outline-success btn-sm ml-2"
																	title="Return"
																>
																	<i
																		class="fas fa-box"
																	></i>
																	Return
																</button>
															</div>
															<button
																href="javascript:;"
																v-if="
																	orderStatus ==
																		'intransit' &&
																		usertype !=
																			'deliveryboy' &&
																		order.complain_status ==
																			null
																"
																class="btn btn-outline-success btn-sm"
																title="Complain"
																@click="
																	updateComplain(
																		order.id
																	)
																"
															>
																Complain
															</button>
															<a
																href="javascript:;"
																v-if="
																	orderStatus !=
																		'inprogress' &&
																		orderStatus !=
																			'cart'
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
															<router-link
																:to="
																	'/order/' +
																		order.id
																"
																class="item"
																data-toggle="tooltip"
																data-placement="top"
																title="Edit"
																v-if="
																	orderStatus ==
																		'inprogress' &&
																		usertype !=
																			'deliveryboy'
																"
															>
																<i
																	class="far fa-edit theme-color"
																></i
															></router-link>
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
																	orderStatus !=
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
		<import-order @orderUploaded="changeTab(orderStatus)"></import-order>
		<export-order @exportOrder="exportExcel"></export-order>
		<courier-list-modal :courier-list="courierList" @bulkCourierAssign="bulkCourierAssign"></courier-list-modal>
		<import-track></import-track>
	</div>
</template>
<script src="./index.js" />
<style scoped>
.nav-item {
	text-align: center;
}
</style>
