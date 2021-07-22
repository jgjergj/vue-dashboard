<template>
	<v-container fluid tag="section">
		<base-material-card color="primary">
			<template v-slot:heading>
				<div class="display-2 font-weight-light">
					Match
				</div>
			</template>
			<v-row align="start" justify="center">
				<v-col md="2" sm="12" xs="12">
					<v-card>
						<v-card-title class="text-md-h4">Match</v-card-title>
						<v-card-text>
							<v-autocomplete
								placeholder="League"
								:items="leagues"
								v-model="match.league"
							></v-autocomplete>

							<v-autocomplete
								placeholder="Home Team"
								:items="teams"
								v-model="match.homeTeam"
							></v-autocomplete>

							<v-autocomplete
								placeholder="Away Team"
								:items="teams"
								v-model="match.awayTeam"
							></v-autocomplete>

							<template>
								<!-- v-model="showPicker"
							:close-on-content-click="false" -->
								<v-menu
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on }">
										<!-- v-model="row.startTime" -->
										<v-text-field
											label="Start Date"
											persistent-hint
											readonly
											v-on="on"
										></v-text-field>
									</template>
									<!-- v-model="row.startTime" -->
									<!-- @change="startTimeChanged(row.index)" -->
									<!-- @input="showPicker = false" -->
									<v-date-picker no-title></v-date-picker>
								</v-menu>
							</template>

							<!-- v-model="row.endTime" -->
							<v-text-field placeholder="End Time" readonly></v-text-field>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col md="10" sm="12" xs="12">
					<v-card>
						<v-card-title class="text-md-h4">
							<div class="float-left">
								Bets
							</div>
							<v-spacer></v-spacer>
							<div class="float-right">
								<v-btn
									color="primary"
									dark
									class="mb-2 float-right"
									justify="end"
									v-on:click="addNewRow()"
								>
									New Bet
								</v-btn>
							</div>
						</v-card-title>
						<v-card-text>
							<table class="new-bets-table" width="100%">
								<tr>
									<th>Company</th>
									<th>Account</th>
									<th>Line</th>
									<th>Status</th>
									<th>Stake</th>
									<th>Odd</th>
									<th>Return</th>
									<th>Profit</th>
									<th>Profit ARB</th>
									<th>Predict</th>
									<th>Type</th>
								</tr>
								<tr v-for="row in newBetItems" :key="row.index">
									<td width="250px">
										<v-autocomplete
											:items="companies"
											v-model="row.company"
											placeholder="Company"
										></v-autocomplete>
									</td>
									<td width="auto">
										<v-autocomplete
											:items="accounts"
											v-model="row.account"
											placeholder="Account"
										></v-autocomplete>
									</td>
									<td width="110px">
										<v-autocomplete
											:items="lines"
											v-model="row.line"
											placeholder="Line"
										></v-autocomplete>
									</td>
									<td width="110px">
										<v-autocomplete
											:items="statuses"
											v-model="row.status"
											placeholder="Status"
											@change="outcomesChanged(row.index)"
										></v-autocomplete>
									</td>
									<td width="80px">
										<v-text-field
											v-model="row.stake"
											:rules="[rules.required, rules.number]"
											@change="outcomesChanged(row.index)"
										></v-text-field>
										<!-- type="number" -->
									</td>
									<td width="80px">
										<v-text-field
											v-model="row.odd"
											:rules="[rules.required, rules.number]"
											@change="outcomesChanged(row.index)"
										></v-text-field>
									</td>
									<td width="80px">
										<v-text-field v-model="row.return" readonly />
									</td>
									<td width="80px">
										<v-text-field v-model="row.profit" readonly />
									</td>
									<td width="100px">
										<v-text-field v-model="row.profitARB" readonly />
									</td>
									<td width="80px">
										<v-text-field v-model="row.predict" readonly />
									</td>
									<td width="125px">
										<v-autocomplete
											:items="types"
											v-model="row.type"
											placeholder="Type"
										></v-autocomplete>
									</td>
									<td>
										<v-icon @click="removeBetRow(row.index)">X</v-icon>
									</td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</base-material-card>

		<!-- <v-col>
				<base-material-card color="primary">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							Bets
						</div>
					</template>
					
				</base-material-card>
			</v-col> -->
		<!-- <v-col cols="12">
				<base-material-card color="primary">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							{{ $route.name }}
						</div>
					</template>

					<v-card-text>
						<v-container class="pa-0" fluid>
							<v-row >
								
							</v-row>
							
						</v-container>
					</v-card-text>
				</base-material-card>
			</v-col> -->

		<!-- begin region matches -->

		<v-row align="center" justify="center">
			<v-col cols="12">
				<base-material-card color="primary">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							Placed Bets
						</div>
					</template>
					<v-card-text>
						<v-container class="pa-0" fluid>
							<div class="section">
								<v-data-table
									:headers="betHeaders"
									:items="items"
									hide-default-footer
									item-key="index"
									group-by="uuid"
									group-expanded
								>
									<template v-slot:[`group.header`]="{ items, isOpen, toggle }">
										<th colspan="12" class="green lighten-4">
											<div class="float-left">
												<v-icon @click="toggle"
													>{{ isOpen ? "mdi-minus" : "mdi-plus" }}
												</v-icon>
												{{ items[0].match }}
											</div>

											<v-spacer></v-spacer>
											<div class="float-right">
												<v-icon
													medium
													class="mr-2"
													@click="editArbitrage(items)"
												>
													mdi-pencil
												</v-icon>
												<v-icon medium @click="deleteArbitrage(items)">
													mdi-delete
												</v-icon>
											</div>
										</th>
									</template>

									<!-- <template slot="items" slot-scope="props" > -->
									<template v-slot:item="{ item }">
										<tr>
											<!-- <td>{{ item.match }}</td> -->
											<td>{{ item.company }}</td>
											<td>{{ item.account }}</td>
											<td>{{ item.line }}</td>
											<td>
												<v-chip
													:color="getStatusColor(item.status)"
													text-color="white"
												>
													{{ item.status }}
												</v-chip>
											</td>
											<td>{{ item.stake }}</td>
											<td>{{ item.odd }}</td>
											<td>{{ item.return }}</td>
											<td>{{ item.profit }}</td>
											<td>{{ item.profitARB }}</td>
											<td>{{ item.predict }}</td>
											<td>{{ item.type }}</td>
											<td>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="primary"
													@click="changeStatusWin(item)"
												>
													<v-icon>mdi-check</v-icon>
												</v-btn>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="error"
													@click="changeStatusLose(item)"
												>
													<v-icon>mdi-close</v-icon>
												</v-btn>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="blue-grey"
													@click="changeStatusVoid(item)"
												>
													<v-icon>mdi-minus</v-icon>
												</v-btn>
											</td>
											<!-- <v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.match"
														label="Match"
													></v-text-field>
												</v-col>
											</v-row>
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
														v-model="editedItem.account"
														label="Account"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.type"
														label="Type"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.line"
														label="Line"
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
														v-model="editedItem.stake"
														label="Stake"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.odd"
														label="Odd"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.return"
														label="Return"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.profit"
														label="Profit"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.profitARB"
														label="Profit ARB"
													></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														v-model="editedItem.predict"
														label="Predict"
													></v-text-field>
												</v-col>
											</v-row> -->
										</tr>
									</template>
								</v-data-table>
							</div>
						</v-container>
					</v-card-text>
				</base-material-card>
			</v-col>
		</v-row>
		<!-- end region matches -->
		<v-snackbar
			:timeout="2000"
			:value="true"
			v-model="snackbar.state"
			absolute
			top
			color="success"
			outlined
			right
		>
			{{ snackbar.msg }}
		</v-snackbar>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-container>
</template>

<script lang="ts">
	import { v4 as uuidv4 } from "uuid";
	import { Vue, Component, Prop, Watch } from "vue-property-decorator";
	import MaterialCard from "/src/components/base/MaterialCard.vue";

	//todo: uncomment
	// import { BetsClient } from "@/utils/Api";

	const types = ["ARB", "Middle", "Pa mbrojtur"];
	const companies = ["Bet 365", "bwin", "1xbet", "888sport"];
	const accounts = ["Mondi", "Gimi", "Gjergji", "Coli", "Filani", "Fisteku"];
	const statuses = ["Win", "Lose", "Void"];
	const lines = ["1", "x", "2", "12", "1x", "x2", "0-2", "3+"];
	const leagues = [
		"Serie A",
		"Premier League",
		"Bungesliga",
		"La Liga",
		"Eredivisie",
		"Ligue 1",
	];
	const teams = [
		"Inter",
		"Milan",
		"Juventus",
		"Atalanta",
		"Liverpool",
		"Chelsea",
		"Manchester United",
		"Arsenal",
		"Roma",
		"Lazio",
		"Napoli",
	];

	let itemsSample = [
		{
			index: 0,
			id: 1,
			uuid: "4618d483-4072-4b05-9dec-f36264b43822",
			league: "Serie A",
			homeTeam: "Inter",
			awayTeam: "Milan",
			startTime: "",
			endTime: "",
			match: "Inter vs Milan",
			type: "Middle",
			company: "Bet 365",
			account: "Gjergji",
			status: "Win",
			line: "1",
			stake: 500,
			odd: 1.8,
			return: 900,
			profit: 0,
			profitARB: 0,
			predict: 0,
		},
		{
			index: 1,
			id: 2,
			uuid: "0ec278ef-c168-4fee-8f4a-cff14260e32d",
			league: "Premier League",
			homeTeam: "Chelsea",
			awayTeam: "Arsenal",
			startTime: "",
			endTime: "",
			match: "Chelsea vs Arsenal",
			type: "Middle",
			company: "Bet 365",
			account: "Gjergji",
			status: "Lose",
			line: "2",
			stake: 500,
			odd: 2.3,
			return: 0,
			profit: 0,
			profitARB: 0,
			predict: 0,
		},
		{
			index: 2,
			id: 3,
			uuid: "dda0b3d6-b40d-47bf-b5da-1c323fa15a1b",
			league: "Serie A",
			homeTeam: "Atalanta",
			awayTeam: "Napoli",
			startTime: "",
			endTime: "",
			match: "Atalanta vs Napoli",
			type: "ARB",
			company: "Bet 365",
			account: "Gjergji",
			status: "Lose",
			line: "1",
			stake: 55,
			odd: 1.9,
			return: 0,
			profit: -55,
			profitARB: 0,
			predict: 0,
		},
		{
			index: 3,
			id: 4,
			uuid: "dda0b3d6-b40d-47bf-b5da-1c323fa15a1b",
			league: "Serie A",
			homeTeam: "Atalanta",
			awayTeam: "Napoli",
			startTime: "",
			endTime: "",
			match: "Atalanta vs Napoli",
			type: "ARB",
			company: "1xbet",
			account: "Coli",
			status: "Win",
			line: "x2",
			stake: 45,
			odd: 2.5,
			return: 112.5,
			profit: 67.5,
			profitARB: 12.5,
			predict: 0,
		},
	];

	//todo: this will be a type
	const newBetItem = {
		index: 0,
		company: "",
		account: "",
		status: "",
		line: "",
		stake: 0,
		odd: 0,
		return: 0,
		profit: 0,
		profitARB: 0,
		predict: 0,
		type: "",
	};

	@Component({
		components: {
			"base-material-card": MaterialCard,
		},
	})
	export default class Bets extends Vue {
		name = "Bets";

		@Prop()
		entity;

		snackbar = {
			state: false,
			msg: "",
		};
		overlay = false;
		types: string[] = [];
		companies: string[] = [];
		accounts: string[] = [];
		statuses: string[] = [];
		lines: string[] = [];
		leagues: string[] = [];
		teams: string[] = [];
		match = {
			league: "",
			homeTeam: "",
			awayTeam: "",
			startTime: "",
			endTime: "",
		};

		constructor() {
			super();
			//todo: to be uncommented
			// this.betsClient = new BetsClient();
			// this.type = ""
		}

		//todo: to be uncommented
		// betsClient: BetsClient;
		dialog = false;
		dialogDelete = false;
		// headers = [
		betHeaders = [
			// {
			// 	text: "Match",
			// 	value: "match",
			// 	class: "text-xl-h4 font-weight-black",
			// },
			{
				text: "Company",
				value: "company",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Account",
				value: "account",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Line",
				value: "line",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Status",
				value: "status",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Stake",
				value: "stake",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Odd",
				value: "odd",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Return",
				value: "return",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Profit",
				value: "profit",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Profit ARB",
				value: "profitARB",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Predict",
				value: "predict",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Type",
				value: "type",
				class: "text-xl-h4 font-weight-black",
			},
			{
				text: "Actions",
				value: "actions",
				class: "text-xl-h4 font-weight-black",
				sortable: false,
			},
		];
		items: any[] = [];
		newBetFillerData: any;
		newBetItems: any[] = [];
		typeText = "";

		editedIndex = -1;
		editedItem: any = {
			match: "",
			type: "",
			company: "",
			account: "",
			line: "",
			stake: 0,
			odd: 0,
			return: 0,
			profit: 0,
			profitARB: 0,
			predict: 0,
		};
		defaultItem: any = {
			match: "",
			type: "",
			company: "",
			account: "",
			line: "",
			stake: 0,
			odd: 0,
			return: 0,
			profit: 0,
			profitARB: 0,
			predict: 0,
		};

		get formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}

		created(): void {
			document.addEventListener.call(
				window,
				"keydown",
				(event: any) => {
					if (
						(window.navigator.platform.match("Mac")
							? event.metaKey
							: event.ctrlKey) &&
						event.keyCode == 83
					) {
						event.preventDefault();
						// Process the event here (such as click on submit button)
						this.save();
					}
				},
				false
			);
		}

		mounted(): void {
			//todo: to be uncommented
			// this.betsClient.getAll().then((res) => {
			// 	this.items = res;
			// });

			this.items = itemsSample;
			this.types = types;
			this.companies = companies;
			this.accounts = accounts;
			this.statuses = statuses;
			this.lines = lines;
			this.leagues = leagues;
			this.teams = teams;

			console.log(this.items);
			

			this.newBetItems = [
				[Object.assign({ index: this.newBetItems.length }, newBetItem)],
			];
		}

		save(): void {
			this.overlay = true;
			setTimeout(() => {
				let newBetItemsLength = 0;
				const uuid = uuidv4();
				let index = 0;
				this.newBetItems.forEach((item) => {
					item.uuid = uuid;
					item.index = index++;
					item.league = this.match.league;
					item.homeTeam = this.match.homeTeam;
					item.awayTeam = this.match.awayTeam;
					item.startTime = this.match.startTime;
					item.endTime = this.match.endTime;
					item.match = `${this.match.homeTeam} vs ${this.match.awayTeam}`;

					if (item.match !== "") {
						this.items.push(item);
						newBetItemsLength++;
					}
				});
				if (newBetItemsLength > 0) {
					if (newBetItemsLength > 1) {
						this.showInfo(`${newBetItemsLength} bets saved`);
					} else {
						this.showInfo(`1 bet saved`);
					}
				}
				this.newBetItems = [];
				this.newBetItems = [Object.assign({}, newBetItem)];

				this.resetMatchData();

				this.overlay = false;
			}, 600);
			// todo: to be uncommented
			// this.betsClient.create(this.editedItem);
		}

		resetMatchData(): void {
			this.match.league = "";
			this.match.homeTeam = "";
			this.match.awayTeam = "";
			this.match.startTime = "";
			this.match.endTime = "";
		}

		addNewRow(): void {
			this.newBetItems.push({
				index: this.newBetItems.length,
				match: "",
				type: "",
				company: "",
				account: "",
				line: "",
				stake: 0,
				odd: 0,
				return: 0,
				profit: 0,
				profitARB: 0,
				predict: 0,
			});
		}

		outcomesChanged(index): void {
			const selectedRow = this.newBetItems.find((i) => i.index == index);
			this.calculateOutcomes(selectedRow);
		}

		calculateOutcomes(row): void {
			const stake = parseFloat(row.stake);
			const odd = parseFloat(row.odd);
			if (stake > 0 && odd > 0) {
				switch (row.status) {
					case "Win":
						row.return = Math.round(stake * odd * 100) / 100;
						break;
					case "Lose":
						row.return = 0;
						break;
					case "Void":
						row.return = Math.round(stake * 100) / 100;
						break;
				}

				row.profit = Math.round((row.return - stake) * 100) / 100;
			}
		}

		removeBetRow(index): void {
			this.newBetItems.splice(index, 1);
		}

		showPicker = false;

		startTimeChanged(index): void {
			// const selectedRow = this.newMatchItems.find((i) => i.index == index);
			// const endTime = Date.parse(selectedRow.startTime);
			// console.log(new Date(endTime));
			// selectedRow.endTime = this.addDays(endTime, 5)
			// 	.toISOString()
			// 	.split("T")[0];
		}

		addDays(date, days) {
			let d = new Date(date);
			d.setDate(d.getDay() + days);
			return d;
		}

		showInfo(msg: string): void {
			this.snackbar.msg = msg;
			this.snackbar.state = true;
		}

		rules = {
			required: (value: string): string | boolean => !!value || "Required.",
			number: (value: string): string | boolean => {
				const pattern = /^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
				return pattern.test(value) || "Invalid number.";
			},
		};

		editArbitrage(items): void {
			this.match.league = items[0].league;
			this.match.homeTeam = items[0].homeTeam;
			this.match.awayTeam = items[0].awayTeam;
			this.match.startTime = items[0].startTime;
			this.match.endTime = items[0].endTime;

			this.newBetItems = [];
			items.forEach((item) => {
				this.newBetItems.push(item);
			});
		}

		deleteArbitrage(items): void {
			items.forEach((item) => {
				const itemToDeleteIndex = this.items.findIndex(
					(i) => i.uuid == item.uuid
				);
				this.items.splice(itemToDeleteIndex, 1);
			});
			this.showInfo(`Arbitrage bets deleted`)
		}

		getStatusColor(status): string {
			if (status == "Lose") return "error";
			else if (status == "Win") return "primary";
			else return "blue-grey";
		}

		changeStatusWin(item): void {
			const itemIndex = this.items.findIndex(i => i.id === item.id);
			this.items[itemIndex].status = "Win";
			this.showInfo(`Bet Status changed successfully`)
		}

		changeStatusLose(item): void {
			const itemIndex = this.items.findIndex(i => i.id === item.id);
			this.items[itemIndex].status = "Lose";
			this.showInfo(`Bet Status changed successfully`)
		}

		changeStatusVoid(item): void {
			const itemIndex = this.items.findIndex(i => i.id === item.id);
			this.items[itemIndex].status = "Void";
			this.showInfo(`Bet Status changed successfully`)
		}
	}
</script>

<style scoped>
	.new-bets-table tr th {
		text-align: left;
		padding: 5px;
	}

	.new-bets-table tr td {
		padding: 5px;
	}
</style>
