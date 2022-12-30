<template>
	<div
		class="modal fade"
		id="staticCourierList"
		tabindex="-1"
		role="dialog"
		aria-labelledby="staticCourierList"
		data-backdrop="static"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						Select Courier to Assign
					</h5>
					<button
						id="closeCourierModal"
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
							<label v-for="(courier,k) in courierList" :key="k"
								:for="'inline-radio'+courier.slug"
								class="form-check-label m-r-10"
							>
								<input
									type="radio"
									id="inline-radio1"
									name="inline-courier-radios"
									v-model="selectedCourierId"
									:value="courier.id"
									class="form-check-input"
								/>
								{{courier.name}}
							</label>
						</div>
					</div>
					<div class="form-group">
						<a
							href="javascript:;"
							class="btn btn-outline-success btn-md w-80"
							@click="assignCourier()"
						>
							Assign Courier
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
		selectedCourierId:1
	}),
	components: {},
	props:{
		courierList:Array
	},
	methods: {
		assignCourier() {
			this.$emit('bulkCourierAssign',this.selectedCourierId);
			document.getElementById("closeCourierModal").click();
		}
	},
	mounted() {
		document.body.appendChild(
			document.getElementById("staticCourierList")
		);
	}
};

</script>
