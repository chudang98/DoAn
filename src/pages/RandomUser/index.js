import React from 'react'
import { Card, Image, Space, StepForwardOutlined, Icon, Button  } from 'antd'
import { connect } from 'dva';
import styles from './index.css';

@connect(({ randomuser, loading }) => ({
    randomuser,
    loading: loading.models.randomuser,
}))
class RandomUser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                dob: "",
                address: "",
                phone: "",
                password: "",
                src: ""
            },
            title: "",
            des:  ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }

    handleClick = async () => {
        await this.props.dispatch({
            type: 'randomuser/getUser',
            payload: {
            }
        });
        // debugger;
        const { randomuser: { record } } = this.props;
        this.setState({
            user: {
                name: record.results[0].name.last + " " + record.results[0].name.first,
                email: record.results[0].email,
                dob: record.results[0].dob.date.split('T')[0],
                address: record.results[0].location.pastcode + " " + record.results[0].location.state,
                phone: record.results[0].phone,
                password: record.results[0].login.password,
                src: record.results[0].picture.thumbnail
            },
            title: "My name is",
            des: this.state.user.name
        });
        

    };
    componentDidMount() {
        this.handleClick();
       
    }
    handleHover(e){
        const seletedClass = e.target.className;
        console.log(seletedClass);
        switch (seletedClass) {
            case "profile":
                this.setState({
                    title: "My name is",
                    des: this.state.user.name
                });
                break;
            case "message":
                this.setState({
                    title: "My email address is",
                    des: this.state.user.email
                });
                break;
            case "calendar":
                this.setState({
                    title: "My birthday is",
                    des: this.state.user.dob
                });
                break; 
            case "heat-map":
                this.setState({
                    title: "My address is",
                    des: this.state.user.address
                });
            case "phone":
                this.setState({
                    title: "My phone number is",
                    des: this.state.user.phone
                });
                break;
            case "unlock":
                this.setState({
                    title: "My password is",
                    des: this.state.user.password
                });   
            default:
                break;
        }
    }
    render() {
        
        return (
            <div className={styles.card}>
                <img
                onMouseOver={this.handleHover} 
                    className={styles.cardImage}
                    width={200}
                    src={this.state.user.src}
                />
                <p className={styles.title}>{this.state.title}</p>
                <p className={styles.desc}>{this.state.des}</p>
                <div className={styles.cardIcons}>
                    <div className="profile" onMouseEnter ={this.handleHover} >
                        <Icon onMouseOver={this.handleHover} type="profile" style={{fontSize: '2em'}}/>
                    </div>
                   <div className="message" onMouseEnter ={this.handleHover}>
                        <Icon type="message" style={{fontSize: '2em'}}/>
                   </div>
                    <div className="calendar" onMouseOver ={this.handleHover}>
                        <Icon  type="calendar" style={{fontSize: '2em'}}/>
                    </div>
                    <div className="heat-map" onMouseOver ={this.handleHover}>
                        <Icon  type="heat-map" style={{fontSize: '2em'}}/>
                    </div>
                    <div className="phone" onMouseOver ={this.handleHover}>
                        <Icon  type="phone" style={{fontSize: '2em'}}/>
                    </div>
                    <div className="unlock" onMouseOver ={this.handleHover}>
                        <Icon  type="unlock" style={{fontSize: '2em'}}/>
                    </div>
                   
                </div>
                <Button type="primary" onClick={this.handleClick}>Random</Button>
            </div>
        );
    }
}

export default RandomUser

