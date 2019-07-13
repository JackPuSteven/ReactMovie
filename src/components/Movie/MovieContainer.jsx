import React from "react"

// 布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


// 导入路由相关的组件
import {Link, Route, Switch} from "react-router-dom"

// 导入路由组件页面
import MovieList from "@/components/Movie/MovieList" 

import MovieDetail from "@/components/Movie/MovieDetail"


export default class MovieContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }

    }
    render() {
        return  <Layout style={{height:"100%"}}>
                    {/* defaultSelectedKeys={['1']}  */}
                    {/* 设置的默认 defaultSelectedKeys 从网站中拿，为了防止刷新回到最开始的位置  */}
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={window.location.hash.split("/")[2]}
          style={{ height: '100%', borderRight: 0 }}
        >
        
            <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
            <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
            <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>           
        </Menu>
      </Sider>
      {/* 自定义，留出一个线框 */}
      <Layout style={{ paddingLeft: "2px" }}>
        
        <Content
          style={{
            background: '#fff',
            padding: 10,
            margin: 0,
            minHeight: 280,
          }}
        >
            {/* 在此处防止唯一一个组件即可，因为其他链接只是数据不一样，布局都是一样的 */}
            {/* 在匹配路由规则的时候，这里提供了两个参数 */}
            {/* 提取路由规则中 的参数，需要使用 this.props.match.params */}

            {/* 因为react路由都是模糊匹配，需要制定精确匹配，不然会出错 */}

            {/* 注意：哪怕 为路由启用精确匹配 exact 模式，也会从上到下把 所有的路由规则匹配一遍 解析如下 */}
            {/* http://127.0.0.1:3000/#/movie/detail/26884354 这一条规则下面的路由都能够匹配得上 */}

          <Switch>
            {/* switch的作用和js/java里面的差不多，都是当进入了一条后，就不能够再进入下一条了 */}

            {/* 使用路由中的 Switch 组件， 能够指定，如果前面的路由规则优先匹配到了， 则放弃匹配后续路由 */}
            <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>

            <Route exact path="/movie/:type/:page" component={MovieList} />

          {/* 现在做电影信息的详情，增加Route*/}
          </Switch>
        </Content>
      </Layout>
    </Layout>
       
            
        
    }
}

