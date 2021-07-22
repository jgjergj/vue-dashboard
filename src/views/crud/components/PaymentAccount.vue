<template>
	<v-data-table
		:headers="headers"
		:items="items"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>{{ $route.name }}</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							New Item
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.company"
											label="Company"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.username"
											label="Username"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.email"
											label="Email"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.password"
											label="Password"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.state"
											label="State"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.status"
											label="Status"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.balance"
											label="Balance"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.name"
											label="Name"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.surname"
											label="Surname"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.address"
											label="Address"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.phone"
											label="Phone"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.documentExpiry"
											label="Document Expiry"
										></v-text-field>
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-autocomplete
											label="State"
											:items="states"
											v-model="editedItem.state"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-autocomplete
											label="Sport"
											:items="sports"
											v-model="editedItem.sport"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">
								Cancel
							</v-btn>
							<v-btn color="blue darken-1" text @click="save">
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="550px">
					<v-card>
						<v-card-title class="headline"
							>Are you sure you want to delete this item?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDelete"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="deleteItemConfirm"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon small class="mr-2" @click="editItem(item)">
				mdi-pencil
			</v-icon>
			<v-icon small @click="deleteItem(item)">
				mdi-delete
			</v-icon>
		</template>
		<!-- <template v-slot:no-data>
			<v-btn color="primary" @click="initialize">
			<v-btn color="primary">
				Reset
			</v-btn>
		</template> -->
	</v-data-table>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Watch } from "vue-property-decorator";
	import {
		PaymentAccountsClient,
		StatusesClient,
		StatesClient,
		CompaniesClient,
		StatusVM,
		StateVM,
		CompanyVM,
	} from "@/utils/Api";

	@Component
	export default class PaymentAccount extends Vue {
		name = "Payment Account";

		@Prop()
		entity;

		constructor() {
			super();
			this.paymentAccountsClient = new PaymentAccounsClient();
			this.statesClient = new StatesClient();
			this.companiesClient = new CompaniesClient();
			this.statusesClient = new StatusesClient();

		}

		paymentAccountsClient: PaymentAccounsClient;
		statesClient: StatesClient;
		companiesClient: CompaniesClient;
		statusesClient: StatusesClient;
		dialog = false;
		dialogDelete = false;
		headers = [
			{ text: "Name", value: "name" },
			{ text: "State", value: "state.name" },
			{ text: "Company", value: "company.name" },
			{ text: "Status", value: "status.name" },
			{ text: "Actions", value: "actions", sortable: false },
		];
		items: any[] = [];

		editedIndex = -1;
		editedItem: any = {
			name: "",
			stateId: StateVM,
			statusId: StatusVM,
			companyId: CompanyVM,
		};
		defaultItem: any = {
			name: "",
			stateId: StateVM,
			statusId: StatusVM,
			companyId: CompanyVM,
		};

		states: any[] = [];
		statuses: any[] = [];
		companies: any[] = [];

		get formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}

		async created(): Promise<void> {
			[this.states, this.companies, this.statuses] = await Promise.all([
				this.statesClient.getAll(),
				this.companiesClient.getAll(),
				this.statusesClient.getAll(),
			]);
		}

		mounted() {
			this.paymentAccountsClient.getAll().then((res) => {
				this.items = res;
			});
		}

		@Watch("dialog")
		onDialogChange(val) {
			val || this.close();
		}

		@Watch("dialogDelete")
		onDialogDelete(val) {
			val || this.closeDelete();
		}

		editItem(item) {
			this.editedIndex = this.items.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		}

		deleteItem(item) {
			this.editedIndex = this.items.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		}

		deleteItemConfirm() {
			// console.log(this.editedItem);
			// console.log(this.items[this.editedIndex]);
			this.paymentAccountsClient.delete(this.editedItem.id);
			// this.editedIndex

			this.items.splice(this.editedIndex, 1);
			this.closeDelete();
		}

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		}

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		}

		save() {
			const editItem: any = {
				id: this.editedItem.id,
				name: this.editedItem.name,
				companyId: this.editedItem.company.id,
				stateId: this.editedItem.state.id,
				statusId: this.editedItem.status.id,
			};

			if (this.editedIndex > -1) {
				this.paymentAccountsClient.update(this.editedItem.id, editItem);
				Object.assign(this.items[this.editedIndex], this.editedItem);
			} else {
				this.paymentAccountsClient.create(editItem);
				this.items.push(this.editedItem);
			}

			this.close();
		}
	}
</script>
