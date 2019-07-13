import React from "react"


import { Button, Icon ,Spin, Alert} from 'antd';

import fetchJSONP from "fetch-jsonp"


export default class MovieDetail extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            info: {}, //电影信息对象
            isloading: true
        }
    }

    componentWillMount() {
        // 接口有限，请限制使用
        fetchJSONP("https://api.douban.com/v2/movie/subject/" + this.props.match.params.id +"?apikey=0df993c66c0c636e29ecbb5344252a4a")
        .then(response => response.json())
        .then(data =>{
            this.setState({
                info: data,
                isloading: false,
            })
        })
    }

    render() {
        return <div>
            <Button type="primary" onClick={this.goBack}>
             <Icon type="left" />
            返回电影列表页面
          </Button>

          {this.renderInfo()}




            {/* 直接在这里有问题，全部抽出去搞 */}
            {/* <h1>电影详情 ---  {this.props.match.params.id}</h1> */}
            {/* <h1>{this.state.info.title}</h1> */}

            {/* <img src={this.state.info.images.large} alt="图片暂时无法加载"/> */}

            {/* <p>{this.state.info.summary}</p>  */}
        </div>
    }

    // 实现返回按钮的功能
    goBack = ()=>{

        console.log(this.props)
        // 返回
        this.props.history.go(-1)
    }

    renderInfo = ()=>{
        if(this.state.isloading){
            return <Spin tip="Loading...">
            <Alert
                message="正在请求电影详细信息"
                description="精彩内容马上呈现"
                type="info"/>
        </Spin>
        }else{
            return <div>

                <div style={{textAlign:"center"}}>

               
                    <h1>{this.state.info.title}</h1>

                {/* <img src={this.state.info.images.large} alt="图片暂时无法加载"/> */}

                    <img src={this.state.info.images.large.replace("img3", "img1")} alt="图片暂时无法加载"/>
                </div>

                <p style={{textIndent:'2em', lineHeight:'30px'}}>{this.state.info.summary}</p> 
            </div>
        }
    }
}

