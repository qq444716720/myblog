---
path: /detail/2
date: 2019-04-27
title: react 链式写法校验数据
img: https://pic3.zhimg.com/80/6b695b58a8c141161d5b9d9c39259579_1440w.jpg
---



#### 使用方法
```
try {
	new Joi()
	.data('李四', '姓名').required().chinese()
	.data('张三', '姓名').required().chinese('名字只可以是中文哦！')
	.data('1', '性别').required().enum(['1', '2'])
	// 这里写正常逻辑
} catch (error) {
	// 这里提示错误消息
	console.log(error)
}
```


#### 源码, 使用了 moment



```
import moment from 'moment'
export default class Joi {
	value = ''
	name = ''

	// 数据输入
	data(value, name = '') {
		this.value = value
		this.name = name
		return this
	}

	// 必填，不能为空
	required(message = `${this.name}不能为空`) {
		if (
			/^\s*$/g.test(this.value) ||
			this.value === null ||
			this.value === undefined
		) {
			throw message
		}
		return this
	}

	// 最小长度
	minLength(length = 6, message = `${this.name}长度不能小于${length}位`) {
		if (this.value.length < length) {
			throw message
		}
		return this
	}

	// 最大长度
	maxLength(length = 6, message = `${this.name}长度不能超过${length}位`) {
		if (this.value.length > length) {
			throw message
		}
		return this
	}

	// 固定长度
	length(length = 6, message = `${this.name}长度必须为${length}位`) {
		if (this.value.length !== length) {
			throw message
		}
		return this
	}

	// 整数
	integet(message = `${this.name}必须为整数`) {
		if (Number(this.value) === 'NaN') {
			throw message
		}
		return this
	}

	// 数字
	number(message = `${this.name}要是数字格式`) {
		if (!/^\+?[1-9][0-9]+.?[0-9]*$/.test(this.value)) {
			throw message
		}
		return this
	}

	// 不等于
	not(num = 0, message = `${this.name}不可以等于${num}`) {
		if (Number(this.value) === num) {
			throw message
		}
		return this
	}

	// 等于
	eq(num = 0, message = `${this.name}要等于${num}`) {
		if (Number(this.value) !== num) {
			throw message
		}
		return this
	}

	// 相等
	equals(value, message = '两次密码不一致') {
		if (this.value !== value) {
			throw message
		}
		return this
	}

	// 大于
	gt(num = 0, message = `${this.name}要大于${num}`) {
		if (Number(this.value) <= num) {
			throw message
		}
		return this
	}

	// 大于或等于
	gte(num = 0, message = `${this.name}要大于或等于${num}`) {
		if (Number(this.value) < num) {
			throw message
		}
		return this
	}

	// 小于
	lt(num = 0, message = `${this.name}要小于${num}`) {
		if (Number(this.value) >= num) {
			throw message
		}
		return this
	}

	// 小于或等于
	lte(num = 0, message = `${this.name}要小于或等于${num}`) {
		if (Number(this.value) > num) {
			throw message
		}
		return this
	}

	// 之间, 大于并小于
	between(nums = [0, 100], message = `${this.name}要在${nums[0]}至${nums[1]}之间`) {
		let num = Number(this.value)
		if (num >= nums[0] && num <= nums[0]) {
			return this
		}
		throw message
	}

	// 最小
	min(num = 0, message = `${this.name}最小值为${num}`) {
		if (Number(this.value) < num) {
			throw message
		}
		return this
	}

	// 最大
	max(num = 100, message = `${this.name}最大值为${num}`) {
		if (Number(this.value) > num) {
			throw message
		}
		return this
	}

	// 手机号
	mobile(message = "手机号不正确") {
		if (!/^1[3-9]\d{9}$/.test(this.value)) {
			throw message
		}
		return this
	}

	// 年龄
	age(arr = [0, 129], message = "年龄不正确") {
		let age = parseInt(this.value, 10)
		if (age > arr[1] || age < arr[0]) {
			throw message
		}
		return this
	}

	// 日期
	date(format = 'YYYY-MM-DD', message = `${this.name || '日期'}不正确`) {
		if (this.value.length !== format.length) {
			throw message
		}
		if (!moment(this.value, format).isValid()) {
			throw message
		}
		return this
	}

	// 日期是否之前
	isBefore(date, message = `${this.name || '日期'}请选择${date}之前的日期`) {
		if (!moment(this.value).isBefore(date)) {
			throw message
		}
		return this
	}

	// 日期是否之后
	isAfter(date, message = `${this.name || '日期'}请选择${date}之后的日期`) {
		if (!moment(this.value).isAfter(date)) {
			throw message
		}
		return this
	}

	// 日期是否相同
	isSame(date, message = `${this.name || '日期'}请选择${date}`) {
		if (!moment(this.value).isSame(date)) {
			throw message
		}
		return this
	}

	// 日期是否之间
	isBetween(dates = [moment().format('YYYY-MM-DD'), moment().add('day', 1).format('YYYY-MM-DD')], message = `${this.name || '日期'}请选择${dates[0]}至${dates[1]}`) {
		if (!moment(this.value).isBetween(dates[0], dates[1])) {
			throw message
		}
		return this
	}

	// 字母
	letter(message = `${this.name}必须为英文`) {
		if (!/^[A-Za-z]+$/g.test(this.value)) {
			throw message
		}
		return this
	}

	// 中文
	chinese(message = `${this.name}必须为中文`) {
		if (!/^[\u4e00-\u9fa5]+$/g.test(this.value)) {
			throw message
		}
		return this
	}

	// 枚举
	enum(arr = [], message = `${this.name}值必须为${arr.join(',')}中的一个`) {
		if (arr.indexOf(this.value) === -1) {
			throw message
		}
		return this
	}

	// 身份证
	idCard(message = '身份证不合法') {
		if (this.value.length !== 18) {
			throw message
		}
		let city = ["11", "12", "13", "14", "15", "21", "22", "23", "31", "32", "33", "34", "35", "36", "37", "41", "42", "43", "44", "45", "46", "50", "51", "52", "53", "54", "61", "62", "63", "64", "65", "71", "81", "82", "91"]
		if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.value)) {
			throw message
		}
		if (city.indexOf(this.value.substr(0, 2)) === -1) {
			throw message
		}
		let id_array = [...this.value]
		//加权因子
		let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
		//校验位
		let parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
		let sum = 0
		for (let i = 0; i < 17; i++) {
			sum += parseInt(id_array[i], 10) * parseInt(factor[i], 10)
		}
		if (id_array[17].toUpperCase() !== parity[sum % 11].toUpperCase()) {
			throw message
		}
		return this
	}

	// 邮箱
	email(message = '邮箱不合法') {
		if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.value)) {
			throw message
		}
		return this
	}

	// 自定义正则
	regexp(reg, message = `${this.name}格式不正确`) {
		if (!reg.test(this.value)) {
			throw message
		}
		return this
	}
}
```
