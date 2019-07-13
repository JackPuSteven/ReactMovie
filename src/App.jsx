// 这是项目的根组件
import React from "react"

// 导入路由组件
import {HashRouter, Route, Link} from "react-router-dom"

// 导入需要的 ant design组件
import { Layout, Menu } from 'antd';



const { Header, Content, Footer } = Layout;

// 导入模块化的样式
import styles from "@/css/app.scss"

// 导入路由相关的组件页面
import HomeContainer from "@/components/Home/HomeContainer"
import AboutContainer from "@/components/About/AboutContainer"
import MovieContainer from "@/components/Movie/MovieContainer"


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  

    }
  }

  // 刷新之后还是关于，为了防刷新
  // defaultSelectedKeys={['1']}
  componentWillMount() {

    console.log(window.location.hash.split("/")[1])
  }
  

  
  render() {
    return <HashRouter>

<Layout className="layout" style={{height: "100%"}}>

  {/* Header头部区域 */}
    <Header>
      <div className={styles.logo} />
      {/* 刷新之后还是关于，为了防刷新 */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split("/")[1]]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
        <Menu.Item key="movie"><Link to="/movie/in_theaters/1">电影</Link></Menu.Item>
        <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
      </Menu>
    </Header>

    {/* 中间的内容区 */}
    {/* 调整100%的问题 height: "100%" */}
    <Content style={{ backgroundColor: '#fff', flex:1  }}>
      <Route path="/home" component={HomeContainer}></Route>
      <Route path="/about" component={AboutContainer}></Route>
      <Route path="/movie" component={MovieContainer}></Route>

      {/* <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div> */}
    </Content>


    {/* Footer底部区域 */}
    <Footer style={{ textAlign: 'center' }}>JC ©2019 Created by Jack Chan</Footer>
  </Layout>,

    </HashRouter>
  
    
  }
}