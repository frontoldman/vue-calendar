
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
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
		padding: 10px 10px;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}
	.calendar .cal-layer .cal-header .prev,
	.calendar .cal-layer .cal-header .next{
		display: inline-block;
		width: 10%;
		cursor: pointer;
	}
	.calendar .cal-layer .cal-header .date-text{
		display: inline-block;
		width: 50%;
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
			<div class="cal-header">
				<div class="prev" v-on:click="changeYear(-1)"> << </div>
				<div class="prev" v-on:click="changeMonth(-1)"> < </div>
				<div class="date-text">{{this.year + '-' + this.monthFormat}}</div>
				<div class="next" v-on:click="changeMonth(1)"> > </div>
				<div class="next" v-on:click="changeYear(1)"> >> </div>
			</div>
			<table>
				<thead>
					<tr>
						<th v-for="weekday in weeks" track-by="$index">{{weekday}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in 6">
						<td v-for="col in 7">
							{{getDayShow(row, col)}}
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
				return this.currentDateShow.getMonth();
			},
			date() {
				return this.currentDateShow.getDate();
			},
			monthFormat() {
				return utils.formatNumBelowTen(this.month + 1);
			},
			dayFormat() {
				return utils.formatNumBelowTen(this.date);
			},
			dateOfMonthBegin() {
				let _date = new Date();
				_date.setYear(this.year);
				_date.setMonth(this.month);
				_date.setDate(1);

				return _date.getDay();
			},
			daysOfCurrentMonth() {
				let _date = new Date();
				_date.setYear(this.year);
				_date.setMonth(this.month + 1);
				_date.setDate(0);
				return _date.getDate();
			}
		},
		methods: {
			changeMonth(month) {
				let _date = new Date();
				let newMonth = this.month + month;

				_date.setYear(this.year);
				_date.setMonth(newMonth);
				_date.setDate(1);

				this.currentDateShow = _date;
			},
			changeYear(year) {
				let _date = new Date();
				let newYear = this.year + year;

				_date.setYear(newYear);
				_date.setMonth(this.month);
				_date.setDate(1);

				this.currentDateShow = _date;
			},
			getDayShow(row, col) {
				let dayNum = (col + 1) + (row * 7) - this.dateOfMonthBegin;
				dayNum = dayNum <= 0 ? '' : dayNum;
				dayNum = dayNum > this.daysOfCurrentMonth ? '' : dayNum;
				return dayNum;
			}
		}
	}



</script>