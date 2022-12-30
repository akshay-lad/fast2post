<template>
	<div
		class="modal fade"
		id="staticBarcodeModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="staticModalLabel"
		data-backdrop="static"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticModalLabel">
						Upload Barcodes
					</h5>
					<button
						id="closeModal"
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-check-inline form-check form-group">
						<label for="inline-radio1" class="form-check-label ">
							<input
								type="radio"
								id="inline-radio1"
								name="inline-radios"
								v-model="payment_mode"
								value="p"
								class="form-check-input"
							/>Prepaid
						</label>
						<label
							for="inline-radio2"
							class="form-check-label ml-3"
						>
							<input
								type="radio"
								id="inline-radio2"
								name="inline-radios"
								v-model="payment_mode"
								value="c"
								class="form-check-input "
							/>Cash On Delivery
						</label>
						<label
							for="inline-radio3"
							class="form-check-label ml-3"
						>
							<input
								type="radio"
								id="inline-radio3"
								name="inline-radios"
								v-model="payment_mode"
								value="cp"
								class="form-check-input"
							/>Cash On Delivery - Prepaid
						</label>
					</div>
					<div class="row">
						<div class="col-md-7 form-group">
							<input
								type="file"
								id="file-input"
								name="file-input"
								class="form-control-file"
								@change="onFileChange(...arguments)"
							/>
						</div>
						<div class="col-md-5 form-group">
							<button
								class="btn btn-outline-primary btn-sm"
								@click="uploadBarcode"
							>
								<i class="fas fa-cloud-upload-alt"></i> Upload
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./import.js" />
