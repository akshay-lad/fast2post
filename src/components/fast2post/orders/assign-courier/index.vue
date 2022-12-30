<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Assign Courier</strong>
						<div class="back-btn">
							<router-link
								:to="backUrl"
								class="btn btn-outline-primary btn-sm"
							>
								<i class="fa fa-arrow-left"></i> Back
							</router-link>
						</div>
					</div>
					<div class="card-body card-block">
						<div class="row">
							<div class="col-md-12">
								<div
									v-for="(courier, k) in courierList"
									:key="k"
								>
									<div class="courier-list">
										<div class="row">
											<div class="col-md-1">
												<div class="delivery-truck-img">
													<img
														src="/images/icon/delivery.svg"
														alt="delivery-truck"
													/>
												</div>
											</div>
											<div class="col-md-3">
												<h3>
													{{ courier.courier_name }}
												</h3>
												
											</div>
											<div class="col-md-3">
												<span class="badge badge-success">
													Min.Weight:
													{{
														courier.couriers_rates_min_weight
													}}Kg
												</span><br>
												<p class="badge badge-success">
													Max.Weight:
													{{
														courier.couriers_rates_max_weight
													}}Kg
												</p>	
											</div>
											<div class="col-md-3 text-center ">
												<div
													class="courier-rate-badge"
												>
													<h1>
														<i
															class="fas fa-rupee-sign"
														></i>
														{{
															Math.ceil(
																courier.final_rate
															)
														}}
													</h1>
												</div>
											</div>
											<div class="col-md-2 text-right">
												<button
													type="button"
													class="btn btn-outline-primary btn-sm mr-4"
													@click="
														assignCourier(courier)
													"
												>
													<i class="fas fa-dolly"></i>
													Shipment
												</button>
											</div>
										</div>
									</div>
								</div>
								<div v-if="courierList.length === 0">
									<div colspan="4" class="text-center">
										No record found.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js"></script>
<style>
.badge {
	padding: 5px;
}
.courier-list {
	padding: 15px;
	border: 1px solid;
	border-radius: 5px;
	margin-bottom: 25px;
}
.delivery-truck-img img {
	width: 70px;
	border: 2px solid;
	border-radius: 50%;
	padding: 10px;
}
.courier-rate-badge i.fas.fa-rupee-sign {
	font-size: 31px;
}
</style>
