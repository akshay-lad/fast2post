<template>
	<div>
		<header-list
			title="Page List"
			search-id="page_search"
			add-url="/page/0"
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
								<th>Name</th>
								<th>Url</th>
								<th></th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="3" class="text-center">
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
								v-for="(page, k) in pageList"
								:key="k"
							>
								<td>
									{{ page.name }}
								</td>

								<td>
									{{ page.url }}
								</td>

								<td>
									<div class="table-data-feature">
										<div>
											<label
												class="switch switch-text custom-switch-text switch-success switch-pill"
											>
												<input
													type="checkbox"
													class="switch-input"
													v-model="page.is_active"
													:checked="page.is_active"
													@change="
														updatePageStatus(
															page,
															$event
														)
													"
												/>
												<span
													data-on="Active"
													data-off="InActive"
													class="switch-label custom-switch-label"
												></span>
												<span
													class="switch-handle"
												></span>
											</label>
										</div>
										<router-link
											:to="'page/' + page.id"
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
											@click="deleteRecord(page.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</button>
									</div>
								</td>
							</tr>
							<tr v-if="pageList.length === 0">
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
</template>
<script src="./index.js" />
