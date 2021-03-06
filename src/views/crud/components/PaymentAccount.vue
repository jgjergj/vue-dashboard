<template>
	<v-data-table
		:headers="headers"
		:items="items"
	>
	<template v-slot:[`item.documentExpiry`]="{ item }">
			<span>{{ formatDate(item.documentExpiry) }}</span>
		</template>
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
										<v-autocomplete
											label="Company"
											:items="companies"
											v-model="editedItem.company"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
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
											label="Status"
											:items="statuses"
											v-model="editedItem.status"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
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
										<v-menu
											v-model="documentExpiryMenu"
											:close-on-content-click="false"
											:nudge-right="40"
											transition="scale-transition"
											offset-y
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="editedItem.documentExpiry"
													label="Document Expiry"
													prepend-icon="mdi-calendar"
													:value="editedItem.documentExpiry"
													readonly
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="editedItem.documentExpiry"
												@input="documentExpiryMenu = false"
											></v-date-picker>
										</v-menu>
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
	import { format, parseISO } from 'date-fns';
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
			this.paymentAccountsClient = new PaymentAccountsClient();
			this.statesClient = new StatesClient();
			this.companiesClient = new CompaniesClient();
			this.statusesClient = new StatusesClient();

		}

		paymentAccountsClient: PaymentAccountsClient;
		statesClient: StatesClient;
		companiesClient: CompaniesClient;
		statusesClient: StatusesClient;
		
		documentExpiryMenu = false;
		dialog = false;
		dialogDelete = false;
		headers = [
			{ text: "Company", value: "company.name" },
			{ text: "Username", value: "username" },
			{ text: "Email", value: "email" },
			{ text: "Password", value: "password" },
			{ text: "State", value: "state.name" },
			{ text: "Status", value: "status.name" },
			{ text: "Balance", value: "balance" },
			{ text: "Name", value: "name" },
			{ text: "Surname", value: "surname" },
			{ text: "Address", value: "address" },
			{ text: "Phone", value: "phone" },
			{ text: "Document Expiry", value: "documentExpiry" },
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

		public formatDate(date) {
			if(typeof date === "string"){
				date = parseISO(date)
			}
			return format(date, 'yyyy-MM-dd');
		}

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
			item.documentExpiry = this.formatDate(item.documentExpiry)
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
				companyId: this.editedItem.company.id,
				username: this.editedItem.username,
				email: this.editedItem.email,
				password: this.editedItem.password,
				stateId: this.editedItem.state.id,
				statusId: this.editedItem.status.id,
				balance: this.editedItem.balance,
				name: this.editedItem.name,
				surname: this.editedItem.surname,
				address: this.editedItem.address,
				phone: this.editedItem.phone,
				documentExpiry: this.editedItem.documentExpiry
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
