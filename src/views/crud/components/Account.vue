<template>
	<v-data-table
		:headers="headers"
		:items="items"
		sort-by="calories"
		class="elevation-1"
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
											v-model="editedItem.balance"
											label="Balance"
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
											v-model="editedItem.username"
											label="Username"
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
											v-model="editedItem.birthday"
											label="Birthday"
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
										<v-autocomplete
											label="Currency"
											:items="currencies"
											v-model="editedItem.currency"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.openingDate"
											label="Opening Date"
										></v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.loginLink"
											label="Login Link"
										></v-text-field>
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
										<v-autocomplete
											label="Type"
											:items="types"
											v-model="editedItem.type"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
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
											label="Operator"
											:items="operators"
											v-model="editedItem.operator"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-autocomplete
											label="Payment Account"
											:items="paymentAccounts"
											v-model="editedItem.paymentAccount"
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
		AccountsClient,
		CompaniesClient,
		CurrenciesClient,
		StatusesClient,
		TypesClient,
		StatesClient,
		OperatorsClient,
		PaymentAccountsClient,
		CompanyVM,
		CurrencyVM,
		StatusVM,
		TypeVM,
		StateVM,
		OperatorVM,
		PaymentAccountVM
	} from "@/utils/Api";

	@Component
	export default class League extends Vue {
		name = "League";

		@Prop()
		entity;

		constructor() {
			super();

			this.accountsClient = new AccountsClient();
			this.companiesClient = new CompaniesClient();
			this.currenciesClient = new CurrenciesClient();
			this.statusesClient = new StatusesClient();
			this.typesClient = new TypesClient();
			this.statesClient = new StatesClient();
			this.operatorsClient = new OperatorsClient();
			this.paymentAccountsClient = new PaymentAccountsClient();
		}

		accountsClient: AccountsClient;
		companiesClient: CompaniesClient;
		currenciesClient: CurrenciesClient;
		statusesClient: StatusesClient;
		typesClient: TypesClient;
		statesClient: StatesClient;
		operatorsClient: OperatorsClient;
		paymentAccountsClient: PaymentAccountsClient;

		dialog = false;
		dialogDelete = false;
		headers = [
			{ text: "Name", value: "name" },
			{ text: "Surname", value: "surname" },
			{ text: "Company", value: "company.name" },
			{ text: "Balance", value: "balance" },
			{ text: "Email", value: "email" },
			{ text: "Username", value: "username" },
			{ text: "Password", value: "password" },
			{ text: "Birthday", value: "birthday" },
			{ text: "Address", value: "address" },
			{ text: "Phone", value: "phone" },
			{ text: "Currency", value: "currency.name" },
			{ text: "OpeningDate", value: "openingDate" },
			{ text: "LoginLink", value: "loginLink" },
			{ text: "Status", value: "status.name" },
			{ text: "Type", value: "type.name" },
			{ text: "State", value: "state.name" },
			{ text: "Operator", value: "operator.name" },
			{ text: "Payment Account", value: "paymentAccount.name" },
			{ text: "Actions", value: "actions", sortable: false },
		];
		items: any[] = [];

		editedIndex = -1;
		editedItem: any = {
			name: "",
			companyId: CompanyVM,
			currencyId: CurrencyVM,
			statusId: StatusVM,
			typeId: TypeVM,
			stateId: StateVM,
			operatorId: OperatorVM,
			paymentAccountId: PaymentAccountVM,
		};
		defaultItem: any = {
			name: "",
			companyId: CompanyVM,
			currencyId: CurrencyVM,
			statusId: StatusVM,
			typeId: TypeVM,
			stateId: StateVM,
			operatorId: OperatorVM,
			paymentAccountId: PaymentAccountVM,
		};

		companies: any[] = [];
		currencies: any[] = [];
		statuses: any[] = [];
		types: any[] = [];
		states: any[] = [];
		operators: any[] = [];
		paymentAccounts: any[] = [];

		get formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}

		async created(): Promise<void> {
			[
				this.companies,
				this.currencies,
				this.statuses,
				this.types,
				this.states,
				this.operators,
				this.paymentAccounts,
			] = await Promise.all([
				this.companiesClient.getAll(),
				this.currenciesClient.getAll(),
				this.statusesClient.getAll(),
				this.typesClient.getAll(),
				this.statesClient.getAll(),
				this.operatorsClient.getAll(),
				this.paymentAccountsClient.getAll(),
			]);
		}

		mounted() {
			this.accountsClient.getAll().then((res) => {
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
			this.accountsClient.delete(this.editedItem.id);
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
				surname: this.editedItem.surname,
				companyId: this.editedItem.company.id,
				balance: this.editedItem.balance,
				email: this.editedItem.email,
				username: this.editedItem.username,
				password: this.editedItem.password,
				birthday: this.editedItem.birthday,
				address: this.editedItem.address,
				phone: this.editedItem.phone,
				currencyId: this.editedItem.currency.id,
				openingDate: this.editedItem.openingDate,
				loginLink: this.editedItem.loginLink,
				statusId: this.editedItem.status.id,
				typeId: this.editedItem.type.id,
				stateId: this.editedItem.state.id,
				operatorId: this.editedItem.operator.id,
				paymentAccountId: this.editedItem.paymentAccount.id
			};

			if (this.editedIndex > -1) {
				this.accountsClient.update(this.editedItem.id, editItem);
				Object.assign(this.items[this.editedIndex], this.editedItem);
			} else {
				this.accountsClient.create(editItem);
				this.items.push(this.editedItem);
			}

			this.close();
		}
	}
</script>
