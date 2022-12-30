<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
						<strong>Developer Guideline</strong>
					</div>
					<div class="card-body">
						<div class="form-group">
							Developer private key &nbsp;&nbsp;
							<button
								class="btn btn-outline-primary btn-sm float-right"
								@click="generateToken"
							>
								Generate New Key
							</button>
						</div>
						<div class="form-group">
							<input
								type="text"
								class="au-input au-input--full form-control"
								id="spanKey"
								onclick="copyText()"
								:value="apiKey"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.js" />
