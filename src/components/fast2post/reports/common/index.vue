<template>
	<div>
		<header-list
			:title="title"
			search-id="orders_search"
			@search="search"
		></header-list>
		<div class="row" >
			<div class="col-lg-12 mb-4 align-center">
				<div class="row" >
					<div v-if="title!='Payment Cycle Report'" class="col-lg-4">
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
					<div class="col-md-4">
						<button v-if="title!='Payment Cycle Report'"
							class="btn btn-outline-success btn-md w-80 m-r-20"
							title="Filter"
							@click="getNextPage(1)"
						>
							<i class="fas fa-filter"></i>
							Filter
						</button>
						<button
							class="btn btn-outline-success btn-md w-80"
							title="Filter"
							@click="exportExcel"
						>
							<i class="fas fa-download"></i>
							Export
						</button>
					</div>
				</div>
			</div>
		</div>
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
					@click="getAll()"
				>
					<i class="fas fa-filter"></i>
					Filter
				</button>
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
								<th>Order detail</th>
								<th>Customer detail</th>
								<th>Client detail</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="4" class="text-center">
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
								<td width="25%">
									<strong>Order#: </strong
									>{{ order.order_number }}<br />
									<strong>Date: </strong>{{ order.order_date
									}}<br />
									<strong>Barcode: </strong
									>{{ order.barcode_number }}<br />
								</td>

								<td width="30%">
									<strong>Name: </strong
									>{{ order.customer_name }}<br />
									<strong
										><i
											class="fas fa-envelope"
										></i> </strong
									>&nbsp;{{ order.email }}<br />
									<strong><i class="fas fa-tty"></i> </strong
									>&nbsp;{{ order.contact_number1 }}<br />
								</td>
								<td width="30%">
									{{ order.client.firstname }} {{order.client.lastname}}<br />
									<strong
										><i
											class="fas fa-envelope"
										></i> </strong
									>&nbsp;{{ order.client.email }}<br />
									
								</td>
								<td width="15%">
									{{ order.report_amount }}
								</td>
							</tr>
							<tr v-if="orderList.length === 0">
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
</template>
<script src="./index.js" />
