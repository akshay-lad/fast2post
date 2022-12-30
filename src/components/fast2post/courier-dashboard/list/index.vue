<template>
	<div>
		<div class="row">
			<div class="col-lg-12 mb-4 align-center">
				<div class="row">
					<div class="col-lg-4">
						<VueCtkDateTimePicker
								v-model="selectedDateRange"
								:dark="isTheme"
								format="YYYY-MM-DD"
								:range="true"
								:shortcut="'thisMonth'"
								output-format="YYYY-MM-DD"
								auto-close
								only-date
							/>
					</div>
					<div class="col-md-2">
						<button
							class="btn btn-outline-success btn-md w-100"
							title="Filter"
							@click="changeTab(orderStatus)"
						>
							<i
								class="fas fa-filter"
							></i>
							Filter
						</button>
					</div>
					<div class="col-md-2" v-if="orderList.length">
						<export-excel
							class="btn btn-outline-success btn-md w-100"
							:data="orderList"
							:fields="export_fields"
							worksheet="Order Report"
							name="Orders Report.xls"
							>						
							Export						
						</export-excel>
					</div>
				</div>
				
			</div>
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
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('readyforpickup')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										><i class="fas fa-dolly theme-color"></i> Ready for PickUp
										<span class="badge badge-success">{{
											ordersTotal.total_readyforpickup
										}}</span></a
									>
									<a
										class="nav-item nav-link"
										id="nav-profile-tab"
										data-toggle="tab"
										href="javascript:void(0);"
										@click="changeTab('readytoship')"
										role="tab"
										aria-controls="nav-profile"
										aria-selected="false"
										><i class="fas fa-truck theme-color"></i> Ready to Ship
										<span class="badge badge-success">{{
											ordersTotal.total_readytoship
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
									<div
										class="row"
										v-if="orderStatus == 'allorders'"
									>
										<div class="col-md-12 pb-4">
											<label class="typo__label"
												><strong
													>Order Status</strong
												></label
											>
											<multiselect
												v-model="selectedOption"
												tag-placeholder="Select Status"
												placeholder="Search or add a order status"
												label="name"
												track-by="code"
												:options="statusOptions"
												:multiple="true"
												:taggable="true"
											></multiselect>
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
													<th>Order No</th>
													<th>Customer</th>
													<th>Order Date</th>
													<th>Status</th>
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
															src="images/icon/loader.gif"
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
													<td>
														{{ order.order_number }}
													</td>
													<td>
														{{
															order.customer_name
														}}
													</td>
													<td>
														{{ order.order_date }}
													</td>
													<td>
														<span
															class="badge badge-success"
															>{{
																order.order_status
															}}</span
														>
													</td>
													<td>
														<div
															class="table-data-feature"
														>
															
															<button
																v-if="
																	orderStatus == 'readyforpickup' && usertype != 'client'
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
																	orderStatus == 'readytoship' && usertype != 'client'
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
				</div>
			</div>
		</div>
	</div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script src="./index.js" />
