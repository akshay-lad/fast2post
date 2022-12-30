<template>
	<div>
		<header-list
			title="Barcodes"
			search-id="barcode_search"
			@search="search"
		></header-list>
		<div class="row ">
			<div class="col-md-5 form-group">
				<button
					class="btn btn-outline-success m-l-10 btn-md w-80"
					title="Import Barcodes"
					data-toggle="modal"
					data-target="#staticBarcodeModal"
				>
					<i class="fas fa-cloud-upload-alt"></i>
					Import Barcodes
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
								<th>Barcode</th>
								<th>Assigned</th>
								<th></th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="3" class="text-center">
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
								v-for="(barcode, k) in barcodeList"
								:key="k"
							>
								<td>{{ barcode.barcode }}</td>
								<td>{{ barcode.is_assigned }}</td>
								<td>
									<div class="table-data-feature">
										<button
											class="item"
											data-toggle="tooltip"
											data-placement="top"
											title="Delete"
											@click="deleteRecord(barcode.id)"
										>
											<i
												class="far fa-trash-alt theme-trash"
											></i>
										</button>
									</div>
								</td>
							</tr>
							<tr v-if="barcodeList.length === 0">
								<td colspan="3">
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
		<import-barcodes @barcodeUpdated="getAll()"></import-barcodes>
	</div>
</template>
<script src="./index.js" />
