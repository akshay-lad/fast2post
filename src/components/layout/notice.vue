
<template>
	<div
		class="modal fade"
		id="commonNoticeModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="staticModalLabel"
		data-backdrop="static"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						Instructions regarding non-delivery of Postal articles due to lockdown in the wake of COVID-19
					</h5>
					<button
						id="closeCommonNoticeModal"
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
						<ul>
							<li>
								It is noticed that delivery of Postal articles including Speed Post, Registered Post, etc. has been adversely affected due to lockdown imposed by various State Governments.
							</li>
							<li>
								In order to avoid any inconvenience to the addressees, it has been decided that the postal articles including Speed Post and Registered Post, which cannot be delivered due to closure of offices/premises, may be kept in deposit in delivery Post offices with proper remarks in DPMS till the situation becomes normal and offices are open for accepting delivery. In case of addressee's mobile number/phone number being available on the article, the addressee may be requested to collect the article from the post office.
							</li>
							<li>
								Further, Circles are also requested to inform bulk/corporate customers about the likely delay in delivery of articles due to closure of office premises.
							</li>
							<li>
								Circles are therefore requested to issue necessary instructions to the delivery post offices to keep the postal articles in deposit, if delivery is not possible due to closure of offices due to lockdown.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
	}),
	mounted() {
		$("#commonNoticeModal").modal('show'); 
		document.body.appendChild(
			document.getElementById("commonNoticeModal")
		);
	}
};

</script>
