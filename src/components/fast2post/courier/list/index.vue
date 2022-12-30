<template>
	<div>
		<header-list
			title="Courier List"
			search-id="courier_search"
			add-url="/courier/0"
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
								<!-- <th>
									<label class="au-checkbox">
										<input type="checkbox" />
										<span class="au-checkmark"></span>
									</label>
								</th> -->
								<th>Name</th>
								<th>Email</th>
								<th>Pincode</th>
								<th></th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="5" class="text-center">
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
								v-for="(courier, k) in courierList"
								:key="k"
							>
								<td>
									{{ courier.name }}
								</td>
								<td>
									{{ courier.email }}
								</td>
								<td>
									{{ courier.pincode }}
								</td>
								<td>
									<div class="table-data-feature">
										<router-link
											:to="'courier/' + courier.id"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Edit"
										>
											<i
												class="far fa-edit theme-color"
											></i
										></router-link>
										<label
											class="switch switch-text custom-switch-text switch-success switch-pill"
										>
											<input
												type="checkbox"
												class="switch-input"
												:checked="!courier.deleted_at"
												@change="
													updateCourierStatus(
														courier,
														$event
													)
												"
											/>
											<span
												data-on="Active"
												data-off="InActive"
												class="switch-label custom-switch-label"
											></span>
											<span class="switch-handle"></span>
										</label>
										<a
											href="javascript:;"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Delete"
											@click="deleteRecord(courier.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</a>
									</div>
								</td>
							</tr>
							<tr v-if="courierList.length === 0">
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
