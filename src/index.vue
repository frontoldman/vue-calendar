
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
						<td v-for="col in 7" @click="">
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
				return this.getNewDate(this.year, this.month, 1).getDay();
			},
			daysOfCurrentMonth() {
				return this.getNewDate(this.year, this.month + 1, 0).getDate();
			}
		},
		methods: {
			changeMonth(month) {
				this.currentDateShow = 
				this.getNewDate(this.year, this.month + month, 1);
			},
			changeYear(year) {
				this.currentDateShow = 
				this.getNewDate(this.year + year, this.month, 1);
			},
			getDayShow(row, col) {
				let dayNum = (col + 1) + (row * 7) - this.dateOfMonthBegin;
				dayNum = dayNum <= 0 ? '' : dayNum;
				dayNum = dayNum > this.daysOfCurrentMonth ? '' : dayNum;
				return dayNum;
			},
			syncDate(row, col) {
				
			},
			getNewDate(year, month, day) {
				let _date = new Date();
				_date.setYear(year);
				_date.setMonth(month);
				_date.setDate(day);
				return _date
			}
		}
	}



</script>