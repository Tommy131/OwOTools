
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
    bindTag: '-',
    style: {
      colorFormat(primaryColor = 'white', secondColor = 'black', weight = '200') {
        return 'background-color: ' + primaryColor + '; color: ' + secondColor + '; font-weight: ' + weight + '; ';
      },
      basePadding: 'padding: 2px 3px; ',
      level:   'border-radius: 5px 0 0 5px; ',
      message: 'border-radius: 0 5px 5px 0; ',
      time:    ['#424242', 'white', 200]
    },
  },
  date() {
    const fillZero = (number) => {return (number > 0 && number <= 9) ? '0' + number : number;};
    let date  = new Date();
    let year  = date.getFullYear();
    let month = date.getMonth();
    let day   = date.getDate();
    let time  = '';
    if(this.settings.useTime == true) {
      time = ' ' + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes()) + ':' + fillZero(date.getSeconds());
    }
    return year + this.settings.bindTag + fillZero(month) + this.settings.bindTag + fillZero(day) + time;
  },
  format(level = 'info') {
    let colorFormat = {};
    // 颜色编辑区域;
    colorFormat.info = {
      prefix:   ['#15AC', 'white', 'bold'],
      text: ['white']
    };
    colorFormat.success = {
      prefix:   ['#228329', 'white', 'bold'],
      text: ['#006057', 'white']
    };
    colorFormat.warning = {
      prefix:   ['#ff7c55', 'white', 'bold'],
      text: ['#FFDC2F', 'black', '300']
    };
    colorFormat.alert = {
      prefix:   ['#970000', 'white', 'bold'],
      text: ['#FFDC2F', 'black', '300']
    };
    colorFormat.error = {
      prefix:   ['#830000', 'white', 'bold'],
      text: ['#560000', 'white', '300']
    };
    colorFormat.emergency = {
      prefix:   ['#830000', 'white', 'bold'],
      text: ['#560000', 'white', '300']
    };
    // 输出区域;
    if(colorFormat[level] === undefined) {
      level = 'info';
    }
    let result = [
      this.settings.style.basePadding + this.settings.style.colorFormat(...colorFormat[level].prefix) + this.settings.style.level,
      this.settings.style.basePadding + this.settings.style.colorFormat(...colorFormat[level].text) + this.settings.style.message
    ];
    if(this.settings.useDate == true) {
      result.unshift(this.settings.style.basePadding + this.settings.style.colorFormat(...this.settings.style.time));
    }
    return result;
  },
  getDateFormat() {
    if(this.settings.useDate == true) {
      return '%c ' + this.date(this.settings.useTime, this.settings.bindTag) + ' ';
    }
    return '';
  },
  send(message, level = 'info', boom = false) {
    level = level.toLowerCase();
    let consoleOutPutType;
    switch(level) {
      default:
      case 'info':
      case 'success':
      case 'alert':
      case 'error':
        consoleOutPutType = 'log';
      break;

      case 'warning':
        consoleOutPutType = 'warn';
      break;

      case 'emergency':
        consoleOutPutType = 'error';
      break;
    }
    console[consoleOutPutType](this.getDateFormat() + '%c ' + level.toUpperCase() + ' %c ' + message + ' ', ...this.format(level));
    (boom == true) ? alert(message) : '';
  },
  info(message, boom = false) {
    this.send(message, 'info', boom);
  },
  success(message, boom = false) {
    this.send(message, 'success', boom);
  },
  warning(message, boom = false) {
    this.send(message, 'warning', boom);
  },
  alert(message, boom = false) {
    this.send(message, 'alert', boom);
  },
  error(message, boom = false) {
    this.send(message, 'error', boom);
  },
  emergency(message, boom = false) {
    this.send(message, 'emergency', boom);
  },
};