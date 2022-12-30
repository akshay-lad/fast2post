<template>
	<div
		class="modal fade"
		id="staticComplainModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="staticComplainModal"
		data-backdrop="static"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-md" role="document" style="width:500px">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticModalLabel">
						Update Complain
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
					<div class="form-group">
						<label class=" form-control-label">Type</label>
						<select
							id="type"
							name="type"
							v-model="selectedComplain.type"
							placeholder="Enter User Type..."
							class="au-input au-input--full form-control"
						>
							<option value="Abstraction of contents"
								>Abstraction of contents</option
							>
							<option value="Delay in Delivery of Articles"
								>Delay in Delivery of Articles</option
							>
							<option
								value="Delivery of mails to disputed/unauthorized firms or persons"
								>Delivery of mails to disputed/unauthorized
								firms or persons</option
							>
							<option value="Loss of Articles"
								>Loss of Articles</option
							>
							<option value="Non Delivery of Articles"
								>Non Delivery of Articles</option
							>
							<option
								value="Non Receipt of Ack./Proof of Delivery"
								>Non Receipt of Ack./Proof of Delivery</option
							>
							<option value="Wrong Delivery of Articles"
								>Wrong Delivery of Articles</option
							>
						</select>
					</div>
					<div class="form-group">
						<label class=" form-control-label"
							>Complain Number</label
						>
						<input
							type="text"
							id="compalin_number"
							name="compalin_number"
							v-model="selectedComplain.compalin_number"
							placeholder="Enter Compalin Number..."
							class="au-input au-input--full form-control"
						/>
					</div>
					<div class="form-group">
						<label class=" form-control-label">Remarks1</label>
						<textarea
							id="remarks1"
							name="remarks1"
							rows="3"
							v-model="selectedComplain.remarks1"
							placeholder="Enter Remarks1..."
							class="au-input au-input--full form-control"
						></textarea>
					</div>
					<div class="form-group">
						<label class=" form-control-label">Remarks2</label>
						<textarea
							id="remarks2"
							name="remarks2"
							rows="3"
							v-model="selectedComplain.remarks2"
							placeholder="Enter Remarks2..."
							class="au-input au-input--full form-control"
						></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-outline-danger m-l-10 btn-md"
						data-dismiss="modal"
					>
						Cancel
					</button>
					<button
						type="button"
						class="btn btn-outline-success m-l-10 btn-md"
						@click="uploadComplain"
					>
						Update
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./update.js" />
