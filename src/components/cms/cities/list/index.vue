<template>
	<div>
		<header-list
			title="Cities"
			search-id="cities_search"
			add-url="/city/0"
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
								<th>Country</th>
								<th>State</th>
								<th>Code</th>
								<th>Name</th>
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
								v-for="(city, k) in cityList"
								:key="k"
							>
								<!-- <td>
									<label class="au-checkbox">
										<input type="checkbox" />
										<span class="au-checkmark"></span>
									</label>
								</td> -->
								<td>
									({{ city.country.phone_code }})
									{{ city.country.code }} -
									{{ city.country.name }}
								</td>
								<td>
									{{ city.state.code }} -
									{{ city.state.name }}
								</td>
								<td>{{ city.code }}</td>
								<td>{{ city.name }}</td>

								<td>
									<div class="table-data-feature">
										<router-link
											:to="'city/' + city.id"
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
											@click="deleteRecord(city.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</button>
									</div>
								</td>
							</tr>
							<tr v-if="cityList.length === 0">
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
	</div>
</template>
<script src="./index.js" />
