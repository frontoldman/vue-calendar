
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
		position: absolute;
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
		width: 60px;
		height: 60px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
	}
	.calendar table td .day-num{
		font-size: 16px;
	}
	.calendar table td .lunar-num{
		font-size: 10px;
		text-align: right;
		margin-top: 15px;
	}
	.calendar table td .lunar-num.isFest{
		color: red;
	}
	.calendar table td.disableded{
		cursor: disabled;
		color: #dedede;
	}
	.calendar table td.now{
		background: #336633;
		color: #fff;
	}
</style>

<template>
	<div class="calendar" v-on:click.stop="noop">
		<input type="text" readonly v-model="dateSelect" @focus="showCalendar($event)"/>
		<div class="cal-layer" v-show="isShow" :style="{'top': top, 'left': left}">
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
						<td v-for="col in 7" :class="{'disableded':isBefore(row, col),'now':isNow(row, col)}" @click="syncDate(row, col)">
							<div class="day-num">{{getDayShow(row, col)}}</div>
							<div class="lunar-num" :class="{'isFest':getFest(row, col).isFest}">{{getFest(row, col).lunarDayStr}}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>

	import { formatNumBelowTen } from './utils'
	import { GetLunarDay } from './Lunar'

	export default {
		props:{
			dateSelect: String
		},
		data() {
			let currentDateShow = this.dateSelect ? new Date(this.dateSelect) : new Date();
			return {
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				currentDateShow: currentDateShow,
				isShow: false,
				top: 0,
				left: 0
			}
		},
		ready() {
			document.addEventListener('click', this._hideCalendar, false);
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
				return formatNumBelowTen(this.month + 1);
			},
			dayFormat() {
				return formatNumBelowTen(this.date);
			},
			dateOfMonthBegin() {
				return this.getNewDate(this.year, this.month, 1).getDay();
			},
			daysOfCurrentMonth() {
				return this.getNewDate(this.year, this.month + 1, 0).getDate();
			}
		},
		methods: {
			noop() {},
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
				let dayNum = this.getDayShow(row, col);
				if(dayNum && !this.isBefore(row, col)){
					this.dateSelect = `${this.year}-${this.monthFormat}-${formatNumBelowTen(dayNum)}`
				}
			},
			getNewDate(year, month, day) {
				let _date = new Date();
				_date.setYear(year);
				_date.setMonth(month);
				_date.setDate(day);
				return _date
			},
			isBefore(row, col) {
				if(this._getDateByDayNum(row, col).getTime() < (new Date()).getTime()){
					return true;
				}
				return false;
			},
			isNow(row, col) {
				if(this._getDateByDayNum(row, col).getTime() === (new Date()).getTime()){
					return true;
				}
				return false;
			},
			getFest(row, col) {
				const dayNum = this.getDayShow(row, col);
				const { lunarDayStr, isFest } = GetLunarDay(this.year, this.monthFormat, formatNumBelowTen(dayNum)); 
				if(dayNum){
					return { 
						lunarDayStr,
						isFest
					}
				}

				return {}
			},
			showCalendar(event) {
				const target = event.target;
				const { left, bottom } = target.getBoundingClientRect();
				this.left = left + 'px';
				this.top = bottom + 'px';
				this.isShow = true;
			},
			_hideCalendar() {
				this.isShow = false;
			},
			_getDateByDayNum(row, col) {
				let dayNum = this.getDayShow(row, col);
				return this.getNewDate(this.year, this.month, dayNum);
			}
		}
	}



</script>