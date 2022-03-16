
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
 * [OwO] 通用方法合集
 */
const owo = {
  splitURL(url, layer) {
    let splitted = url.split('/').filter((e) => { return e; });
    if (typeof layer === 'number') {
      return splitted[layer] ?? undefined;
    }
    switch (layer.toLowerCase()) {
      case 'first':
        return splitted.shift();
      case 'end':
        return splitted.pop();
    }
  },
  path(layer = 'end') {
    return this.splitURL(location.pathname, layer);
  },
  sleep(time) {
    // 需要配合 async/await 使用;
    return new Promise((resolve) => setTimeout(resolve, time * 1000));
  },
  highlight: {
    style: 'border: 10px solid red; box-shadow: 0 0 5px 5px #a96464',
    selector: null,
    name: null,
    select(element) {
      let selector;
      if (typeof element === 'string') {
        selector = document.querySelector(element);
      } else if (typeof element === 'object') {
        selector = element;
      } else {
        logger.error('Element \'' + element + '\' is undefined!');
        return;
      }
      this.name     = selector.className ? selector.className : '#' + selector.id;
      this.selector = selector;
      return this;
    },
    shoot(func) {
      if (this.selector === null) {
        logger.error('Element is empty, cannot use Highlight function.');
        return;
      }
      if (typeof func === 'function') func(this);
      this.selector.style = this.style;
      logger.info('Highlighted element \'' + this.name + '\'.');
    },
    remove(func) {
      if (this.selector === null) {
        logger.error('Element is empty, cannot use Highlight function.');
        return;
      }
      if (typeof func === 'function') func(this);
      this.selector.style = '';
      logger.info('Removed highlight from element \'' + this.name + '\'.');
    }
  },
  script: {
    src: [],
    add(src) {
      if (typeof src === 'string') {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.querySelector('head').appendChild(script);
      }
    },
    load() {
      if (typeof this.src === 'object') {
        for (i of this.src) {
          this.add(i);
        }
      } else {
        this.add(this.src);
      }
    }
  }
};



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
      level: '',
      message: '',
      time: ['#424242', 'white', 200]
    },
  },
  date() {
    const fillZero = (number) => { return (number > 0 && number <= 9) ? '0' + number : number; };
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // API中月份是从0开始的, 因此需要+1;
    let day = date.getDate();
    let time = '';
    if (this.settings.useTime === true) {
      time = ' ' + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes()) + ':' + fillZero(date.getSeconds());
    }
    return year + this.settings.bindTag + fillZero(month) + this.settings.bindTag + fillZero(day) + time;
  },
  format(level = 'info') {
    let colorFormat = {};
    // 颜色编辑区域;
    colorFormat.info = {
      prefix: ['#607D8B', 'white', 'bold'],
      text: ['white']
    };
    colorFormat.notice = {
      prefix: ['#15AC', 'white', 'bold'],
      text: ['white']
    };
    colorFormat.success = {
      prefix: ['#228329', 'white', 'bold'],
      text: ['#006057', 'white']
    };
    colorFormat.warning = {
      prefix: ['#ff5722', 'white', 'bold'],
      text: ['#FFDC2F', 'black', '300']
    };
    colorFormat.alert = {
      prefix: ['#970000', 'white', 'bold'],
      text: ['#FFDC2F', 'black', '300']
    };
    colorFormat.error = {
      prefix: ['#830000', 'white', 'bold'],
      text: ['#560000', 'white', '300']
    };
    colorFormat.emergency = {
      prefix: ['#830000', 'white', 'bold'],
      text: ['#560000', 'white', '300']
    };
    // 输出区域;
    if (colorFormat[level] === undefined) {
      level = 'info';
    }
    let result = [
      this.settings.style.basePadding + this.settings.style.colorFormat(...colorFormat[level].prefix) + this.settings.style.level,
      this.settings.style.basePadding + this.settings.style.colorFormat(...colorFormat[level].text) + this.settings.style.message
    ];
    if (this.settings.useDate === true) {
      result.unshift(this.settings.style.basePadding + this.settings.style.colorFormat(...this.settings.style.time));
    }
    result[0] += '; border-radius: 3px 0 0 3px;';
    result[result.length - 1] += '; border-radius: 0 3px 3px 0';
    return result;
  },
  getDateFormat() {
    if (this.settings.useDate === true) {
      return '%c ' + this.date(this.settings.useTime, this.settings.bindTag) + ' ';
    }
    return '';
  },
  send(message, level = 'info', boom = false) {
    level = level.toLowerCase();
    let consoleOutPutType;
    switch (level) {
      default:
      case 'info':
      case 'notice':
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
    (boom === true) ? alert(message) : '';
  },
  info(message, boom = false) {
    this.send(message, 'info', boom);
  },
  notice(message, boom = false) {
    this.send(message, 'notice', boom);
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