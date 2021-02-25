import React from "react";

import { Spin, Row, Col } from 'antd';
import { Link
} from "react-router-dom";
import Api from "../../libs/api";


export default class ListProject extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            items:[],
            loading:false,
        }
    }
    componentDidMount() {
        this.loadList();
    }

    loadList = async ()=>{
        try{
            this.setState({loading:true});
            this.setState({
                items:await Api.get("/getProgettiProponente"),
                loading:false
            });
        }
        catch (e){
            this.setState({
                items:[],
                loading:false
            });
        }
    }

    renderItem = (item,key)=>{
        return (
            <div className={"project"} key={key}>
                <Row>
                    <Col span={20}>
                        <h4>{item.titolo}</h4>
                    </Col>
                    <Col span={4}>
                        <Link to={ `/project/${item.id}`}>
                            Visualizza
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }


    render() {
        const {loading,items} = this.state;
        return (
            <div>
                <Row>
                    <Col span={20}><h2>I Miei progetti</h2></Col>
                    <Col span={4}><Link to={"/project/new"}>Nuovo</Link></Col>
                </Row>

                {loading && <Spin />}
                {items.map((itm,i)=>{
                    return this.renderItem(itm,i);
                })}
            </div>
        );
    }
}
