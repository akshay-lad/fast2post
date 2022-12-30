<template>
	<div
		class="modal fade"
		id="staticOrderExportModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="staticModalLabel"
		data-backdrop="static"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						Export Orders
					</h5>
					<button
						id="closeExportModal"
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<div class="form-check-inline form-check">
							<label
								for="inline-radio1"
								class="form-check-label m-r-10"
							>
								<input
									type="radio"
									id="inline-radio1"
									name="inline-courier-radios"
									v-model="courier"
									value="speedpost"
									class="form-check-input"
								/>
								Speed Post
							</label>
							<label
								for="inline-radio2"
								class="form-check-label m-r-10 "
							>
								<input
									type="radio"
									id="inline-radio2"
									name="inline-courier-radios"
									v-model="courier"
									value="parcel"
									class="form-check-input"
								/>
								Parcel
							</label>
							<label
								for="inline-radio3"
								class="form-check-label "
							>
								<input
									type="radio"
									id="inline-radio3"
									name="inline-courier-radios"
									v-model="courier"
									value="reg_parcel"
									class="form-check-input"
								/>
								Reg. Parcel
							</label>
						</div>
					</div>
					<div class="form-group">
						<a
							href="javascript:;"
							class="btn btn-outline-success btn-md w-80"
							@click="exportOrder('cod')"
						>
							<i class="fas fa-download"></i>
							Export Cash On Delivery
						</a>
						<a
							href="javascript:;"
							class="btn btn-outline-success btn-md w-80 ml-3"
							@click="exportOrder('prepaid')"
						>
							<i class="fas fa-download"></i>
							Export Prepaid
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./export.js" />
