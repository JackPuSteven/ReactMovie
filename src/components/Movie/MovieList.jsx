import React from "react"

import { Spin, Alert, Pagination } from 'antd';

// 导入fetch-jsonp
import fetchJSONP from "fetch-jsonp"

import MovieItem from "@/components/Movie/MovieItem"

export default class MovieList extends React.Component {
    constructor(props){
        super(props)

        this.state = {  
            movies: [], //这是电影列表
            // 这个参数是看window.location.match.params看的，page是键值对的其中一个参数
            nowPage: parseInt(props.match.params.page) || 1, //当前显示第一页的页码值数据
            pageSize: 12, //每一页显示多少条数据
            total: 0, //当前电影分类下总共有多少条数据
            isloading: true, //如果为true,，表示正在加载数据  
            movieType: props.match.params.type, //保存一下要 获取的电影的类型




        }   
 
    }

    // 在即将加载的时候获取数据
    // 请求数据最好是在这个函数中请求
    componentWillMount() {
        //#region 用于解析fetch的作用
        // console.log("ok")
        // // 使用方法:
        // // fetch(api地址).then(response=>){console.log("response")}
        // fetch("http://www.liulongbin.top:3005/api/getnewslist")
        // .then(response=>{  //当使用fetch API获取数据的数据，第一个 .then中获取不到数据
        //     // 第一个.then中拿到的是一个 Response对象，我们可以调用 response.json() 得到一个新的promise
        //     console.log(response) 

        //     // 因为你要获取 response.json()的数据进行操作，所以需要返回一个数据出去才能操作，让第二个.then进行触发
        //     return response.json()
        // })
        // .then(data =>{
        //     console.log(data)
        // })
        //#endregion
        
        //#region 模拟延迟加载
        // 1秒
        // setTimeout(()=>{
        //     // 假设1秒以后数据获取回来了
        //     this.setState({
        //         isloading: false //当数据获取回来后，把 isloading 加载中设置为 false

        //     })

        // },1000)
        //#endregion

        this.loadMovieListByTypeAndPage()
        


    }

   

    // 组件将要接收新属性
    componentWillReceiveProps(nextProps){
        // console.log(nextProps.match)
        // 每当地址变化的时候，重置state中的参数项，重置完毕后，我们可以重新发起数据请求了
        this.setState({
            isloading: true, //又要重新加载电影数据了
            nowPage: parseInt(nextProps.match.params.page) || 1, //这是要获取第几页的数据
            movieType: nextProps.match.params.type, //电影类型
            // total: 0,  movie和total可以不改，因为当数据发生变化的时候，componentWillMount会重复赋值刷新
        },function(){
            this.loadMovieListByTypeAndPage()  //因为异步修改了数据，所以需要再一次使用回调函数调用加载新的数据
        })
    } 

    // 根据电影类型和电影页码，获取电影数据
    loadMovieListByTypeAndPage = ()=>{
        // 注意，默认的window.fetch受到跨域限制，无法直接使用，这时候，我们使用第三方包 fetch-jsonp来发送JSONP请求，他的用法，和浏览器内置的fetch完全一样
        //#region 单纯用fetch回产生跨域问题，并难以解决，采用下面的fetch-jsonp进行请求
        // 默认只有一句话的话，不写括号，默认return
        // 但是fetch会产生跨域问题，需要使用fetch-jsonp
        // fetch("https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a")
        // .then(response=> response.json())
        // .then(data =>{
        //     console.log(data)
        // })
        //#endregion
        //  cnpm i fetch-jsonp -S

        // fetchJSONP("https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a")
        // .then(response=> response.json())
        // .then(data=>{
        //     console.log(data)
        // })

        // 开始获取数据的索引


        // 下面是有用的，不过怕请求过时次数过多
        // const start = this.state.pageSize *(this.state.nowPage-1)

        // const url = `https://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`


        //  fetchJSONP(url)
        // .then(response=> response.json())
        // .then(data=>{
        //     console.log(data)
        //     this.setState({
        //         isloading:false,   //将loading效果隐藏
        //         movies: data.subjects,  //为电影列表重新赋值
        //         total: data.total    //把总条数保存到state上
        //     })
        // })
        // 上面是有用的，不过怕请求过时次数过多



        // 下面使用假数据
        const data = require("../Test_data/" + this.state.movieType + ".json")

        setTimeout(()=>{
            // console.log(data)
            this.setState({
                isloading:false,   //将loading效果隐藏
                movies: data.subjects,  //为电影列表重新赋值
                total: data.total    //把总条数保存到state上
            })
        },1000)
        // 上面使用假数据



    }

    // 回想生命周期函数，当state的值发生变化的时候，会重新加载渲染函数render重新渲染页面
    render() {
        return <div>
            {/* <h1> MovieList --- {this.props.match.params.type} --- {this.props.match.params.page} </h1> */}
            {this.renderList()}
            
        </div>  
    }

    // 渲染电影列表的方法，loading的方法
    renderList = ()=>{ 
        if(this.state.isloading){  //正在加载中
            return  <Spin tip="Loading...">
            <Alert
                message="正在请求电影列表"
                description="精彩内容马上呈现"
                type="info"/>
        </Spin>
        }else{  //加载完成
            // flex是打横的，flexWrap=wrap可以让flex换行换行
            return  <div>
                <div style={{display:"flex", flexWrap: "wrap"}}>
            
                    {this.state.movies.map(item =>{
                        // 把这里的history传到子组件中
                        return <MovieItem {...item} key={item.id}  history={this.props.history} ></MovieItem>
                    })}
           
                </div>
                {/* 分页自己看官网API */}
                <Pagination defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.pageChanged} />
            </div>
        }   
    }


    // 当页码改变的时候，加载新一页的数据
    pageChanged = (page)=>{
        // 监听page修改时候的动作
        // 因为页码修改了，url地址上的页码也会修改，修改地址栏的页码,跳转到新的页面

        // 由于我们手动使用BOM对象。实现了跳转，这样不好，最好使用 路由跳转的方法，进行编程式导航
        // window.location.href = "/#/movie/" + this.state.movieType + "/" + page

        // props里面有 go push 等熟悉的方法
        console.log(this.props)
        // 使用 react-router-dom实现编程时导航 
        // push是向前
        // go 是向后走
        // history在这里，而且只在这里
        this.props.history.push("/movie/" + this.state.movieType + "/" + page)
    }
}

// 在React中，我们可以使用 fetch API 来获取数据 fetch API 是基于 Promise 封装的 

