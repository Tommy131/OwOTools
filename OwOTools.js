
/*********************************************************************
	 _____   _          __  _____   _____   _       _____   _____
	/  _  \ | |        / / /  _  \ |  _  \ | |     /  _  \ /  ___|
	| | | | | |  __   / /  | | | | | |_| | | |     | | | | | |
	| | | | | | /  | / /   | | | | |  _  { | |     | | | | | |  _
	| |_| | | |/   |/ /    | |_| | | |_| | | |___  | |_| | | |_| |
	\_____/ |___/|___/     \_____/ |_____/ |_____| \_____/ \_____/

	* Copyright (c) 2015-2022 OwOBlog-DGMT.
	* Developer: HanskiJay(Tommy131)
	* Telegram:  https://t.me/HanskiJay
	* E-Mail:    support@owoblog.com
	* GitHub:    https://github.com/Tommy131

**********************************************************************/


/**
 * [Logger] 日志输出对象
 */
const logger = {
	settings: {
		useDate: true,
		useTime: false,
		style: {
			padding:        'padding: 2px 3px; ',
			radius_level:   ' border-radius: 5px 0 0 5px;',
			radius_message: ' border-radius: 0 5px 5px 0;',
			colorFormat: (primaryColor = 'white', secondColor = 'black', weight = '200') => {
				return 'background-color: ' + primaryColor + '; color: ' + secondColor + '; font-weight: ' + weight + '; ';
			}
		},
	},
	date(bindTag = '-') {
		let fillZero = (number) => {return (number > 0 && number <= 9) ? '0' + number : number;};
		let date  = new Date();
		let year  = date.getFullYear();
		let month = date.getMonth();
		let day   = date.getDate();
		let time  = '';
		if(this.settings.useTime == true) {
			time = ' ' + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes()) + ':' + fillZero(date.getSeconds());
		}
		return year + bindTag + fillZero(month) + bindTag + fillZero(day) + time;
	},
	format(level = 'info') {
		let colorFormat = [];
		// 颜色编辑区域;
		colorFormat['info'] = [
			this.settings.style.colorFormat('#15AC', 'white', 'bold'),
			this.settings.style.colorFormat('white')
		];
		colorFormat['success'] = [
			this.settings.style.colorFormat('#228329', 'white', 'bold'),
			this.settings.style.colorFormat('#006057', 'white')
		];
		colorFormat['warning'] = [
			this.settings.style.colorFormat('#ff7c55', 'white', 'bold'),
			this.settings.style.colorFormat('#FFDC2F', 'black', '300')
		];
		colorFormat['alert'] = [
			this.settings.style.colorFormat('#970000', 'white', 'bold'),
			this.settings.style.colorFormat('#FFDC2F', 'black', '300')
		];
		colorFormat['error'] = [
			this.settings.style.colorFormat('#830000', 'white', 'bold'),
			this.settings.style.colorFormat('#560000', 'white', '300')
		];
		colorFormat['emergency'] = [
			this.settings.style.colorFormat('#830000', 'white', 'bold'),
			this.settings.style.colorFormat('#560000', 'white', '300')
		];
		// 输出区域;
		if(colorFormat[level] === undefined) {
			level = 'info';
		}
		let result = [
			this.settings.style.padding + colorFormat[level][0] + this.settings.style.radius_level,
			this.settings.style.padding + colorFormat[level][1] + this.settings.style.radius_message
		];
		if(this.settings.useDate == true) {
			result.unshift(this.settings.style.padding + this.settings.style.colorFormat('black', 'white', '200'));
		}
		return result;
	},
	getDateFormat(bindTag = '-') {
		if(this.settings.useDate == true) {
			return '%c' + this.date(this.useTime, bindTag);
		} else {
			return '';
		}
	},
	info(message) {
		console.log(this.getDateFormat() + '%c INFO: %c' + message, ...this.format());
	},
	success(message) {
		console.log(this.getDateFormat() + '%c SUCCESS: %c' + message, ...this.format('success'));
	},
	warning(message) {
		console.warn(this.getDateFormat() + '%c WARNING: %c' + message, ...this.format('warning'));
	},
	alert(message, boom = false) {
		if(boom == true) {
			alert(message);
		}
		console.log(this.getDateFormat() + '%c ALERT: %c' + message, ...this.format('alert'));
	},
	error(message) {
		console.info(this.getDateFormat() + '%c ERROR: %c' + message, ...this.format('error'));
	},
	emergency(message, boom = false) {
		if(boom == true) {
			alert(message);
		}
		console.error(this.getDateFormat() + '%c EMERGENCY: %c' + message, ...this.format('emergency'));
	},
};