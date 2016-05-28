import Vue from 'vue'
import * as Calendar from './src/index.vue'


new Vue({
	el: 'body',
	data:{
		dateSelect:'2016-12-10'
	},
	components: {
		Calendar
	}
})