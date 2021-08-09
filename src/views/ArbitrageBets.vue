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
								:rules="[rules.required]"
								v-model="match.league"
								item-text="name"
								item-value="id"
								return-object
								@change="onLeagueChange"
							></v-autocomplete>

							<v-autocomplete
								placeholder="Home Team"
								:items="teams"
								:rules="[rules.required]"
								v-model="match.homeTeam"
								item-text="name"
								item-value="id"
								return-object
							></v-autocomplete>

							<v-autocomplete
								placeholder="Away Team"
								:items="teams"
								:rules="[rules.required]"
								v-model="match.awayTeam"
								item-text="name"
								item-value="id"
								return-object
							></v-autocomplete>

							<!-- <template> -->
								<!-- v-model="showPicker"
									:close-on-content-click="false" -->
								<!-- <v-menu
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on }"> -->
										<!-- v-model="row.startTime" -->
										<!-- <v-text-field
											label="Start Date"
											persistent-hint
											readonly
											v-on="on"
										></v-text-field>
									</template> -->
									<!-- v-model="row.startTime" -->
									<!-- @change="startTimeChanged(row.index)" -->
									<!-- @input="showPicker = false" -->
									<!-- <v-date-picker no-title></v-date-picker>
								</v-menu>
							</template> -->

							<!-- v-model="row.endTime" -->
							<!-- <v-text-field placeholder="End Time" readonly></v-text-field> -->
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
											placeholder="Company"
											:items="companies"
											:rules="[rules.required]"
											v-model="row.company"
											@change="onCompanyChange"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</td>
									<td width="auto">
										<v-autocomplete
											placeholder="Account"
											:items="accounts"
											:rules="[rules.required]"
											v-model="row.account"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</td>
									<td width="110px">
										<v-autocomplete
											placeholder="Line"
											:items="lines"
											:rules="[rules.required]"
											v-model="row.line"
										></v-autocomplete>
									</td>
									<td width="110px">
										<v-autocomplete
											placeholder="Status"
											:items="statuses"
											v-model="row.status"
											item-text="name"
											item-value="id"
											return-object
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
											placeholder="Type"
											:items="types"
											v-model="row.type"
											item-text="name"
											item-value="id"
											return-object
										></v-autocomplete>
									</td>
									<td>
										<v-icon @click="removeBetRow(row.index)">mdi-close</v-icon>
									</td>
								</tr>
							</table>
						</v-card-text>
						<v-card-text>
							<div class="text-center">
								<v-btn
									color="primary"
									dark
									class="mb-2"
									justify="end"
									v-on:click="save()"
								>
									Save
								</v-btn>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</base-material-card>

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
									:items="arbitrageBets"
									:items-per-page="500"
									hide-default-footer
									item-key="index"
									group-by="arbitrageMatch.id"
									group-expanded
								>
									<template v-slot:[`group.header`]="{ items, isOpen, toggle }">
										<th colspan="12" class="green lighten-4">
											<div class="float-left">
												<v-icon @click="toggle"
													>{{ isOpen ? "mdi-minus" : "mdi-plus" }}
												</v-icon>
												{{ items[0].arbitrageMatch.matchName }}
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
											<td>{{ item.company.name }}</td>
											<td>{{ item.account.name }}</td>
											<td>{{ item.line }}</td>
											<td>
												<v-chip
													:color="getStatusColor(item.status)"
													text-color="white"
												>
													{{ item.status ? item.status.name : "" }}
												</v-chip>
											</td>
											<td>{{ item.stake }}</td>
											<td>{{ item.odd }}</td>
											<td>{{ item.return }}</td>
											<td>{{ item.profit }}</td>
											<td>{{ item.profitARB }}</td>
											<td>{{ item.predict }}</td>
											<td>{{ item.type ? item.type.name : "" }}</td>
											<td>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="primary"
													@click="changeMatchStatus(item, 'Win')"
												>
													<v-icon>mdi-check</v-icon>
												</v-btn>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="error"
													@click="changeMatchStatus(item, 'Lose')"
												>
													<v-icon>mdi-close</v-icon>
												</v-btn>
												<v-btn
													class="mx-1"
													fab
													x-small
													color="blue-grey"
													@click="changeMatchStatus(item, 'Void')"
												>
													<v-icon>mdi-minus</v-icon>
												</v-btn>
											</td>
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
	import { Vue, Component, Prop } from "vue-property-decorator";
	import MaterialCard from "/src/components/base/MaterialCard.vue";
	import {
		ArbitrageBetsClient,
		ArbitrageMatchesClient,
		LeaguesClient,
		TeamsClient,
		CompaniesClient,
		AccountsClient,
		StatusesClient,
		TypesClient,
		LeagueVM,
		CreateArbitrageBetCommand,
		UpdateArbitrageBetCommand,
		UpdateArbitrageBetStatusCommand,
	} from "@/utils/Api";

	const lines = ["1", "x", "2", "12", "1x", "x2", "0-2", "3+"];

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
	export default class ArbitrageBets extends Vue {
		name = "ArbitrageBets";

		@Prop()
		entity;

		constructor() {
			super();

			this.arbitrageBetsClient = new ArbitrageBetsClient();
			this.arbitrageMatchesClient = new ArbitrageMatchesClient();
			this.leaguesClient = new LeaguesClient();
			this.teamsClient = new TeamsClient();
			this.companiesClient = new CompaniesClient();
			this.accountsClient = new AccountsClient();
			this.statusesClient = new StatusesClient();
			this.typesClient = new TypesClient();
		}

		arbitrageBetsClient: ArbitrageBetsClient;
		arbitrageMatchesClient: ArbitrageMatchesClient;
		leaguesClient: LeaguesClient;
		teamsClient: TeamsClient;
		companiesClient: CompaniesClient;
		accountsClient: AccountsClient;
		statusesClient: StatusesClient;
		typesClient: TypesClient;

		snackbar = {
			state: false,
			msg: "",
		};
		overlay = false;
		leagues: any[] = [];
		teams: any[] = [];
		companies: any[] = [];
		accounts: any[] = [];
		statuses: any[] = [];
		types: any[] = [];
		lines: any[] = [];

		match = {
			id: "",
			leagueId: "",
			league: LeagueVM,
			homeTeamId: "",
			homeTeam: {},
			awayTeamId: "",
			awayTeam: {},
			matchName: "",
			startTime: "",
			endTime: "",
		};

		dialog = false;
		dialogDelete = false;
		betHeaders = [
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

		arbitrageBets: any[] = [];
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

		get formTitle(): string {
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

		async mounted(): Promise<void> {
			[
				this.arbitrageBets,
				this.leagues,
				this.companies,
				this.statuses,
				this.types,
			] = await Promise.all([
				this.arbitrageBetsClient.getAll(),
				this.leaguesClient.getAll(),
				this.companiesClient.getAll(),
				this.statusesClient.getAll(),
				this.typesClient.getAll(),
			]);
			this.lines = lines;

			this.arbitrageBets.forEach((bet, index) => {
				bet.index = index;
			});
			
			console.log(this.arbitrageBets);
			

			this.newBetItems = [newBetItem];
		}

		async onLeagueChange(): Promise<void> {
			this.teams = await this.teamsClient.getAll();
		}

		async onCompanyChange(): Promise<void> {
			this.accounts = await this.accountsClient.getAll();
		}

		async save(): Promise<void> {
			//todo: add validations here

			try {
				this.overlay = true;
				let newBetItemsLength = 0;
				let index = 0;

				//todo: to see how to manage these better without sending the matchName
				this.match.leagueId = (this.match.league as any).id;
				this.match.homeTeamId = (this.match.homeTeam as any).id;
				this.match.awayTeamId = (this.match.awayTeam as any).id;
				this.match.matchName =
					(this.match.homeTeam as any).name +
					" vs " +
					(this.match.awayTeam as any).name;

				if (this.match.id) {
					await this.arbitrageMatchesClient.update(
						this.match.id,
						this.match as any
					);
				} else {
					this.match.id = await this.arbitrageMatchesClient.create(
						this.match as any
					);
				}

				for (let i = 0; i < this.newBetItems.length; i++) {
					if (!this.newBetItems[i].id) {
						const arbitrageBet = await this.createArbitrageBet(this.newBetItems[i]);
						
						if (arbitrageBet.id) {
							arbitrageBet.index = this.arbitrageBets.length;
							//info: these are added for the ui as it needs the whole status object to display the name
							//todo: refactor these to use types
							arbitrageBet.company = this.newBetItems[i].company; 
							arbitrageBet.account = this.newBetItems[i].account; 
							arbitrageBet.status = this.newBetItems[i].status; 
							arbitrageBet.type = this.newBetItems[i].type; 
							arbitrageBet.arbitrageMatch = {};
							arbitrageBet.arbitrageMatch.matchName = this.match.matchName;
							
							this.arbitrageBets.push(arbitrageBet);
							newBetItemsLength++;
						}
					} else {
						await this.updateArbitrageBet(this.newBetItems[i]);
						newBetItemsLength++;
					}
				}
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
			} catch (error) {
				console.error(error);
			} finally {
				this.overlay = false;
			}
		}

		async createArbitrageBet(bet): Promise<any> {
			const item: CreateArbitrageBetCommand = new CreateArbitrageBetCommand();

			item.arbitrageMatchId = this.match.id;
			// item.index = index++;

			item.companyId = bet.company.id;
			item.accountId = bet.account.id;
			item.statusId = bet.status ? bet.status.id : null;
			item.typeId = bet.type ? bet.type.id : null;
			item.line = bet.line;
			item.stake = bet.stake;
			item.odd = bet.odd;
			item.return = bet.return;
			item.profit = bet.profit;
			item.profitARB = bet.profitARB;

			const arbitrageBetId = await this.arbitrageBetsClient.create(item);

			(item as any).id = arbitrageBetId;
			return item;
		}

		async updateArbitrageBet(bet): Promise<void> {
			const item: UpdateArbitrageBetCommand = new UpdateArbitrageBetCommand();
			item.id = bet.id;
			item.arbitrageMatchId = this.match.id;
			// item.index = index++;

			item.companyId = bet.company.id;
			item.accountId = bet.account.id;
			item.statusId = bet.status ? bet.status.id : null;
			item.typeId = bet.type ? bet.type.id : null;
			item.line = bet.line;
			item.stake = bet.stake;
			item.odd = bet.odd;
			item.return = bet.return;
			item.profit = bet.profit;
			item.profitARB = bet.profitARB;

			await this.arbitrageBetsClient.update(bet.id, item);
		}

		resetMatchData(): void {
			this.match.leagueId = "";
			this.match.league = LeagueVM;
			this.match.homeTeamId = "";
			this.match.homeTeam = "";
			this.match.awayTeamId = "";
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
			this.calculateOutcomes(selectedRow, this.newBetItems);
		}

		calculateOutcomes(row, connectedBets): void {
			const stake = parseFloat(row.stake) || 0;
			const odd = parseFloat(row.odd) || 0;

			const totalArbStake = connectedBets.reduce(
				(accumulator, currentValue) => {
					const accNo = parseFloat(accumulator);
					const currValNo = parseFloat(currentValue.stake) || 0;

					return accNo + currValNo;
				},
				0
			);

			if (stake > 0 && odd > 0 && row.status) {
				switch (row.status.name) {
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

				this.calculateProfitArb(parseFloat(totalArbStake), connectedBets);
			}

			this.calculatePredict(totalArbStake, connectedBets);
			// row.predict = Math.round(((stake * odd) - parseFloat(totalArbStake)) * 100) / 100;

			// return connectedBets;
		}

		calculateProfitArb(totalArbStake: number, connectedBets): void {
			const totalReturn = connectedBets.reduce(
				(accumulator, currentValue) => {
					//info: gets the return of bets with status win or void
					if (currentValue.status && currentValue.status.name != "Lose") {
						const accNo = parseFloat(accumulator);
						const currValNo = parseFloat(currentValue.return);

						return accNo + currValNo;
					} else {
						return accumulator;
					}
				},
				0
			);

			connectedBets.forEach((row) => {
				row.profitARB = Math.round((totalReturn - totalArbStake) * 100) / 100;
			});
		}

		calculatePredict(totalArbStake, connectedBets): void {
			connectedBets.forEach((row) => {
				row.predict =
					Math.round(
						(parseFloat(row.stake) * parseFloat(row.odd) -
							parseFloat(totalArbStake)) *
							100
					) / 100;
			});
		}

		removeBetRow(index): void {
			this.newBetItems.splice(index, 1);

			this.newBetItems.forEach((item, i) => {
				item.index = i;
			});
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

		addDays(date, days): Date{
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
			this.match.id = items[0].arbitrageMatch.id;
			this.match.leagueId = items[0].arbitrageMatch.leagueId;
			this.match.league = items[0].arbitrageMatch.league;
			this.match.homeTeamId = items[0].arbitrageMatch.homeTeamId;
			this.match.homeTeam = items[0].arbitrageMatch.homeTeam;
			this.match.awayTeamId = items[0].arbitrageMatch.awayTeamId;
			this.match.awayTeam = items[0].arbitrageMatch.awayTeam;
			this.match.startTime = items[0].arbitrageMatch.startTime;
			this.match.endTime = items[0].arbitrageMatch.endTime;

			this.teams.push(this.match.homeTeam);
			this.teams.push(this.match.awayTeam);

			this.newBetItems = [];
			items.forEach((item) => {
				this.accounts.push(item.account);
				this.newBetItems.push(item);
			});
		}

		deleteArbitrage(items): void {
			items.forEach((item) => {
				const itemToDeleteIndex = this.arbitrageBets.findIndex(
					(i) => i.arbitrageMatch == item.uuid
				);
				this.arbitrageBets.splice(itemToDeleteIndex, 1);
			});
			this.showInfo(`Arbitrage bets deleted`);
		}

		getStatusColor(status): string {
			if (status) {
				if (status.name == "Lose") return "error";
				else if (status.name == "Win") return "primary";
				else if (status.name == "Running") return "warning";
				else return "blue-grey";
			}

			return "";
		}

		async changeMatchStatus(item, status: string): Promise<void> {
			this.overlay = true;
			const statusObj = this.statuses.find(s => s.name == status);
			item.status = statusObj;
			const itemIndex = this.arbitrageBets.findIndex((i) => i.id === item.id);
			const connectedBets = this.arbitrageBets.filter(b => b.arbitrageMatch.id == item.arbitrageMatch.id)
			this.calculateOutcomes(item, connectedBets)
			try {
				
				await this.arbitrageBetsClient
					.updateStatus(item.id, {
						id: item.id,
						status: status,
					} as UpdateArbitrageBetStatusCommand)
					.then((res) => {
						this.arbitrageBets[itemIndex].status.name = status;						
						connectedBets.forEach(bet => {
							this.arbitrageBetsClient.update(bet.id, bet)
						});
						this.showInfo(`Bet Status changed successfully`);
					});
			} catch (error) {
				console.error(error);
			} finally {
				this.overlay = false;
			}
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
