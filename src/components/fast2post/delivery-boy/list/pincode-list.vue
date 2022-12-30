<template>
	<div
		class="modal fade"
		id="staticPincodeList"
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
						Assigned Pincode List
					</h5>
					<button
						id="closePincodeListModal"
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group row">
						<div
							v-for="(pincode, k) in pincodeList"
							class="col-lg-3"
							:key="k"
						>
							{{ pincode.pincode.pincode }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		pincodeList: Array
	},
	mounted() {
		document.body.appendChild(document.getElementById("staticPincodeList"));
	}
};
</script>
