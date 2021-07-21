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
											v-model="editedItem.description"
											label="Description"
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
											label="Type"
											:items="types"
											v-model="editedItem.type"
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
		<template v-slot:[`item.loginLink`]="{ item }">
			<a :href="'https://' + item.loginLink" v-html="item.loginLink" target="_blank"></a>
		</template>
	</v-data-table>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Watch } from "vue-property-decorator";
	import {
		CreateCompanyCommand,
		CompaniesClient,
		TypesClient,
		TypeVM,
	} from "@/utils/Api";

	@Component
	export default class Company extends Vue {
		name = "Company";

		@Prop()
		entity;

		constructor() {
			super();
			this.companiesCient = new CompaniesClient();
			this.typesClient = new TypesClient();
		}

		companiesCient: CompaniesClient;
		typesClient: TypesClient;
		dialog = false;
		dialogDelete = false;
		headers = [
			{ text: "Name", value: "name" },
			{ text: "Description", value: "description" },
			{ text: "Login Link", value: "loginLink" },
			{ text: "Type", value: "type.name" },
			{ text: "Actions", value: "actions", sortable: false },
		];
		items: any[] = [];

		editedIndex = -1;
		editedItem: any = {
			name: "",
			typeId: TypeVM,
		};
		defaultItem: any = {
			name: "",
			typeId: TypeVM,
		};

		types: any[] = [];

		get formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}

		async created(): Promise<void> {
			this.types = await this.typesClient.getAll();
		}

		mounted() {
			this.companiesCient.getAll().then((res) => {
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
			this.companiesCient.delete(this.editedItem.id);
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
				description: this.editedItem.description,
				loginLink: this.editedItem.loginLink,
				typeId: this.editedItem.type.id,
			};

			if (this.editedIndex > -1) {
				this.companiesCient.update(this.editedItem.id, editItem);
				Object.assign(this.items[this.editedIndex], this.editedItem);
			} else {
				this.companiesCient.create(editItem);
				this.items.push(this.editedItem);
			}

			this.close();
		}
	}
</script>
