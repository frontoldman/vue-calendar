
<style type="text/css">
	.calendar .cal-layer{
		display: inline-block;
		background: #C6FFC5;
		box-shadow: 3px 3px 5px #888888;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.calendar .cal-layer .cal-header{
		padding:8px 10px;
	}
	.calendar table th, .calendar table td{
		width: 40px;
		height: 40px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
	}
</style>

<template>
	<div class="calendar">
		<input type="text"/>
		<div class="cal-layer">
			<div class="cal-header">{{this.year + '-' + this.monthFormat}}</div>
			<table>
				<thead>
					<tr>
						<th v-for="weekday in weeks" track-by="$index">{{weekday}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in 6">
						<td v-for="col in 7">
							{{
								(col + 1) + (row * 7) - dateOfMonthBegin > daysOfCurrentMonth
								? '' 
								: (col + 1) + (row * 7) - dateOfMonthBegin
							}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		{{daysOfCurrentMonth}}
	</div>
</template>

<script>

	const utils = {
		formatNumBelowTen(num) {
			return num < 10 ? '0' + num : num;
		}
	}

	export default {
		data() {
			return {
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				currentDateShow: new Date()
			}
		},
		computed: {
			year() {
				return this.currentDateShow.getFullYear();
			},
			month() {
				return this.currentDateShow.getMonth() + 1;
			},
			date() {
				return this.currentDateShow.getDate();
			},
			monthFormat() {
				return utils.formatNumBelowTen(this.month);
			},
			dayFormat() {
				return utils.formatNumBelowTen(this.date);
			},
			dateOfMonthBegin() {
				let _date = new Date();
				_date.setYear(this.year);
				_date.setMonth(this.month-1);
				_date.setDate(1);

				return _date.getDay();
			},
			daysOfCurrentMonth() {
				let _date = new Date();
				_date.setYear(this.year);
				_date.setMonth(this.month);
				_date.setDate(0);
				return _date.getDate();
			}
		}
	}



</script>