<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-body">
					<div class="default-tab">
						<nav>
							<div
								class="nav nav-tabs"
								id="nav-tab"
								role="tablist"
							>
								<a
									class="nav-item nav-link active"
									id="nav-home-tab"
									data-toggle="tab"
									href="javascript:void(0);"
									@click="changeTab('courier-manage')"
									role="tab"
									aria-controls="nav-home"
									aria-selected="true"
									>Courier</a
								>
								<a
									v-bind:class="{
										'nav-item nav-link': true,
										disabled: isCourierRateDisabled
									}"
									id="nav-profile-tab"
									data-toggle="tab"
									href="javascript:void(0);"
									@click="changeTab('courier-rate-manage')"
									role="tab"
									aria-controls="nav-profile"
									aria-selected="false"
									>Courier Rate</a
								>
								<a
									v-bind:class="{
										'nav-item nav-link': true,
										disabled: isCourierRateDisabled
									}"
									id="nav-barcode-tab"
									data-toggle="tab"
									href="javascript:void(0);"
									@click="changeTab('barcode')"
									role="tab"
									aria-controls="nav-barcode"
									aria-selected="false"
									>Barcode</a
								>
							</div>
						</nav>
						<div class="tab-content pt-4" id="nav-tabContent">
							<div
								v-bind:class="{
									'tab-pane fade': true,
									'show active':
										currentTab === 'courier-manage'
								}"
								id="nav-home"
								v-if="currentTab == 'courier-manage'"
								role="tabpanel"
								aria-labelledby="nav-home-tab"
							>
								<courier-manage></courier-manage>
							</div>
							<div
								v-bind:class="{
									'tab-pane fade': true,
									'show active':
										currentTab === 'courier-rate-manage'
								}"
								id="nav-profile"
								v-if="currentTab == 'courier-rate-manage'"
								role="tabpanel"
								aria-labelledby="nav-profile-tab"
							>
								<courier-rate-list></courier-rate-list>
							</div>
							<div
								v-bind:class="{
									'tab-pane fade': true,
									'show active': currentTab === 'barcode'
								}"
								id="nav-barcode"
								v-if="currentTab == 'barcode'"
								role="tabpanel"
								aria-labelledby="nav-barcode-tab"
							>
								<barcode></barcode>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js"></script>
