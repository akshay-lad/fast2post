<template>
	<div>
		<header-list
			title="State"
			search-id="state_search"
			add-url="/state/0"
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
								<th>Country</th>
								<th>State Code</th>
								<th>State Name</th>
								<th></th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="4" class="text-center">
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
								v-for="(state, k) in stateList"
								:key="k"
							>
								<td>
									({{ state.country.phone_code }})
									{{ state.country.code }} -
									{{ state.country.name }}
								</td>
								<td>{{ state.code }}</td>
								<td>{{ state.name }}</td>

								<td>
									<div class="table-data-feature">
										<router-link
											:to="'state/' + state.id"
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Edit"
										>
											<i
												class="far fa-edit theme-color"
											></i
										></router-link>

										<button
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Delete"
											@click="deleteRecord(state.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</button>
									</div>
								</td>
							</tr>
							<tr v-if="stateList.length === 0">
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
