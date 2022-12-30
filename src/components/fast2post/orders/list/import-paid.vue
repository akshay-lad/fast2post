<template>
	<div
		class="modal fade"
		id="staticOrderPaidModal"
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
						Import Barcodes For Paid
					</h5>
					<button
						id="closeOrderPaidModal"
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
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
								@click="uploadOrder"
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
<script src="./import-paid.js" />
