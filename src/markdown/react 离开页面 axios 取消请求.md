---
path: /detail/3
date: 2019-04-29
title: react 离开页面 axios 取消请求
img: https://pic4.zhimg.com/80/v2-c48a668d033248a2c39bc6f9de57930d_1440w.jpg
---

## react 离开页面时 axios 取消之前还未返回的请求

```
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import ReactDOM from 'react-dom'
import Error from '../components/Error'

import Home from '../pages/Home'
import NoPage from '../pages/404'
import Login from '../pages/Login'

class Interceptors extends React.Component {
  constructor(props) {
    super(props)
    this.errorDom = null
    this.cancel = null
  }


  componentDidMount() {
    // 监听路由变化
    this.props.history.listen(route => {
      if (this.cancel) {
        this.cancel("取消请求")
        Toast.hide()
      }
    })
  }


  renderError() {
    if (this.errorDom) {
      return
    }
    this.errorDom = document.createElement('div')
    ReactDOM.render(
      <Error reload={() => {
        this.errorDom.remove()
        window.location.reload()
      }}
        goBack={() => {
          this.errorDom.remove()
          this.props.history.goBack()
        }}
      />, this.errorDom)
    document.body.appendChild(this.errorDom)
  }

  componentWillMount() {
    let cancelToken = axios.CancelToken
		/**
	 	* 添加请求拦截器
	 	*/
    axios.interceptors.request.use(config => {
      this.errorDom && this.errorDom.remove()
      config.headers['token'] = getToken()
      config.cancelToken = new cancelToken(c => {
        this.cancel = c
      })
      return config
    }, error => {
      return Promise.reject(error)
    })

		/**
	 	* 添加响应拦截器
	 	*/
    axios.interceptors.response.use(response => {
      const { data, msg, success } = response.data
      if (success === -1) {
        this.props.history.push('/login')
        return ''
      }
      if (success === false) {
        Toast.info(msg, 2)
        return Promise.reject(msg)
      }
      return data || response.data
    }, error => {
      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }
      Toast.fail('服务器出错', 2)
      this.renderError()
      return Promise.reject(error)
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/404' component={NoPage} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Interceptors)
```
