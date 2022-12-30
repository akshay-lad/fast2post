<template>
	<div>
		<header-list
			title="IP Complain List"
			search-id="complain_search"
			@search="search"
		></header-list>
		<div class="row">
			<div class="col-lg-12">
				<div class="form-group row">
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
						@click="downloadPdf(null)"
					>
						<i class="fas fa-filter"></i>
						Generate Pdf
					</button>
					<button
						class="btn btn-outline-success btn-md m-l-10 w-80"
						title="Export"
						@click="changeTab(orderStatus, true)"
					>
						<i class="fas fa-download"></i>
						Export
					</button>
				</div>
				<div class="">
					<label class="typo__label"><strong>Client</strong></label>
					<div class="row form-group">
						<div class="col-md-10 col-xs-12">
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
							<button
								class="btn btn-outline-success btn-md "
								title="Filter"
								@click="changeTab(orderStatus)"
							>
								<i class="fas fa-filter"></i>
								Filter
							</button>
						</div>
					</div>
				</div>
				<!-- DATA TABLE -->
				<div class="table-responsive table--no-card m-b-30">
					<table
						class="table table-borderless table-striped table-earning"
					>
						<thead>
							<tr>
								<th style="vertical-align: top;">
									<label class="au-checkbox">
										<input
											type="checkbox"
											id="selectAllOrder"
											name="selectAllOrder"
											@click="checkUncheckedOrderList"
											:checked="selectAllOrder"
										/>
										<span class="au-checkmark"></span>
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
								<td colspan="5" class="text-center">
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
								v-for="(order, k) in orderList"
								:key="k"
							>
								<td width="5%">
									<label class="au-checkbox">
										<input
											type="checkbox"
											v-model="order.isSelected"
										/>
										<span class="au-checkmark"></span>
									</label>
								</td>
								<td width="26%">
									<strong>REF#: </strong
									>{{ order.reference_number }}<br />
									<strong>Barcode: </strong
									>{{ order.barcode_number }}<br />
									<span class="badge badge-success">{{
										order.order_status
									}}</span>
									<span
										class="ml-2 badge"
										:class="
											order.payment_mode === 'cod'
												? 'badge-success'
												: 'badge-primary'
										"
										>{{ order.payment_mode }}</span
									>
									<span
										v-if="
											order.complain_status ===
												'requested'
										"
										class="ml-2 badge badge-danger"
									>
										Complain Raised</span
									>
								</td>
								<td width="25%">
									{{ order.customer_name }}<br />
									<strong
										><i
											class="fas fa-envelope"
										></i> </strong
									>&nbsp;{{ order.email }}<br />
									<strong><i class="fas fa-tty"></i> </strong
									>&nbsp;{{ order.contact_number1 }}<br />
								</td>
								<td width="20%">
									<template v-if="order.client">
										{{ order.client.firstname }}
										{{ order.client.lastname }}
									</template>
								</td>
								<td>
									<div class="table-data-feature">
										<div class="mb-2">
											<button
												class="btn btn-outline-primary m-l-10 btn-sm"
												title="Update Complain"
												data-toggle="modal"
												data-target="#staticComplainModal"
												@click="
													selectedComplain =
														order.complain
												"
											>
												Update Complain
											</button>
											<!-- <button
												class="btn btn-outline-success m-l-10 btn-sm"
												title="Resolve"
												@click="resolveComplain(order)
												"
											>
												Resolve
											</button> -->
										</div>
										<a
											href="javascript:;"
											@click="downloadPdf(order.id)"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="PDF"
											><i
												class="fas fa-print theme-color"
											></i
										></a>
										<router-link
											:to="'/order/' + order.id"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="View"
										>
											<i
												class="fas fa-info theme-color"
											></i
										></router-link>
										<a
											href="javascript:;"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Delete"
											@click="deleteRecord(order.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</a>
									</div>
								</td>
							</tr>
							<tr v-if="orderList.length === 0">
								<td colspan="5" class="text-center">
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
		<update-complain :selectedComplain="selectedComplain"></update-complain>
	</div>
</template>
<script src="./index.js" />
