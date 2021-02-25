import React from "react";

import { Spin, Row, Col } from 'antd';
import { Link
} from "react-router-dom";
import Api from "../../libs/api";
import moment from "moment";

export default class ListCurriculum extends React.Component{

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
                items:await Api.get("/getCandidatureUtente"),
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
            <div className={"candidature"} key={key}>
                <Row>
                    <Col span={10}>
                        <h4>{item.ruoloProgetto.progetto.titolo}</h4>
                    </Col>
                    <Col span={5}>
                        <h4>{item.ruoloProgetto.titolo}</h4>
                    </Col>
                    <Col span={5}>
                        <h4>{item.presentazione}</h4>
                    </Col>

                    <Col span={4}>
                        <Link to={ `/project/${item.ruoloProgetto.progetto.id}`}>
                            Visualizza Progetto
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
                    <Col span={20}><h2>Le Mia candidature</h2></Col>
                    <Col span={4}></Col>
                </Row>

                {loading && <Spin />}
                {items.map((itm,i)=>{
                    return this.renderItem(itm,i);
                })}
            </div>
        );
    }
}
