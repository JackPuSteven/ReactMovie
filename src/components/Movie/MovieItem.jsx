import React from "react"

import styles from "@/css/movie_item.scss"

import { Rate } from 'antd';

export default class MovieItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }

    }
    render() {
        return <div className={styles.box} onClick={()=>{this.goDetail()}}>
            
             
            {/* {this.props.images.small} */}
            <img src={this.props.images.small} className={styles.img}/>
            {/* <img src={this.props.images.small.split("img3.doubanio.com","img1.doubanio.com")} className={styles.img}/> */}

            <h4>电影名称：{this.props.title}</h4>
            <h4>上映年份：{this.props.year}年</h4>
            <h4>电影类型：{this.props.genres.join("，")}</h4>
            <Rate disabled defaultValue={this.props.rating.average / 2 } />

        </div>  
            
    }

    // 此处也使用编程式导航
    goDetail = ()=>{
        // console.log(this.props.history,"我是子组件传递过来的历史")
        this.props.history.push("/movie/detail/" + this.props.id)
    }
}

