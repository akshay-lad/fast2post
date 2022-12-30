<template>
	<div>
		<header-list
			title="Tickets List"
			search-id="tickets_search"
			@search="search"
		></header-list>
		<div class="row">
			<div class="col-lg-12">
				<!-- DATA TABLE -->
				<div class="table-responsive table--no-card m-b-30">
					<table
						class="table table-borderless table-striped table-earning"
					>
						<thead>
							<tr>
								<th>Name</th>
								<th>Contact Detail</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody v-if="showLoader">
							<tr>
								<td colspan="3" class="text-center">
									<img
										src="images/icon/loader.gif"
										height="70"
										width="70"
									/>
								</td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr
								class="tr-shadow"
								v-for="(ticket, k) in ticketsList"
								:key="k"
							>
								<td width="20%">
									{{
										ticket.first_name +
											" " +
											ticket.last_name
									}}
								</td>

								<td width="30%">
									<a
										target="_blank"
										:href="'mailto: ' + ticket.email"
										><i class="fas fa-envelope"></i>
										{{ ticket.email }}</a
									><br />
									<a
										v-if="ticket.phone"
										target="_blank"
										:href="'tel: ' + ticket.phone"
										><i class="fas fa-tty"></i>
										{{ ticket.phone }}</a
									>
									{{ ticket.phone }}
								</td>
								<td width="50%">
									{{ ticket.message }}
								</td>
							</tr>
							<tr v-if="ticketsList.length === 0">
								<td colspan="3" class="text-center">
									No record found.
								</td>
							</tr>
							<tr class="spacer"></tr>
						</tbody>
					</table>
				</div>
				<div class="text-center">
					<paginate
						ref="paginate"
						:page-count="paginate.page_count"
						:click-handler="getNextPage"
						active-class="active"
						containerClass="pagination"
						page-class="'page-item'"
						:first-last-button="true"
						first-button-text="<<"
						last-button-text=">>"
						prev-text="<"
						next-text=">"
					>
					</paginate>
				</div>
				<!-- END DATA TABLE -->
			</div>
		</div>
	</div>
</template>
<script src="./index.js" />
