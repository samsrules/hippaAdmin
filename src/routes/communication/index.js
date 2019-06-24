/**
 * About Us Page
 */
import React, { Component } from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { database } from './../../firebase/index';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import {getPages,getUserProfile} from '../../actions/AppActions';
// rct card box
import { RctCard } from 'Components/RctCard';

import Avatar from '@material-ui/core/Avatar';
//import { connect } from 'http2';

import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	CardLink,
	CardGroup,
	CardImgOverlay,
Form,
FormGroup,
Label,
Input,
FormText,
Col,
	FormFeedback,
	Modal,
ModalHeader,
ModalBody,
ModalFooter
} from 'reactstrap';

const TestString = () => {
	return 'Test String Component'
}

class Communication extends Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			openForm:false,
			open:false,
			username: '',
			messagesAll:[],
			usersKey:{},
			receiver:'',
			userIds:[],	
			sender:''
		  };
	  
		//this.viewName = this.viewName.bind(this);

	}


	componentWillMount() {

		const messagesRef = database.ref('messages')
		  .orderByKey()
			.limitToLast(100);
	
			
			const userRef = database.ref('users')
		  .orderByKey()
		  .limitToLast(100);
		 
		var messagesAll = [];
		let self = this;
		messagesRef.on('value', snapshot => {
			  this.state.usersKey
		  let messagesObj = snapshot.val();
			
	    this.setState({
				usersKey:messagesObj,
				userIds:Object.keys(messagesObj)
			})


		  let messages = [];
		  
		  Object.keys(messagesObj).forEach(key => messages.push(messagesObj[key]));
		  
		  messages = messages.map((message,i) => { 
			 
			})
		
		});
	}
		
	isUrl =(url) =>{
		var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		if (!re.test(url)) { 
				return true;
		} else {
			return false;
		}
	}
	

		viewConversations = (key) =>{

			this.setState({ open: true });
			let self=this;
		   
		  if(this.state.usersKey && key) {
				let userIds = key.split('-');
   
				let conversationList = Object.values(this.state.usersKey[key]);
				self.setState({
					messagesAll:conversationList,
					sender:userIds[0],
					receiver:userIds[1]
				})

        console.log(conversationList);
				var rebels = self.state.messagesAll.filter((val)=>{
					   if(val.from==userIds[1]) {
							 return val.senderName;
						 }
				})
				
			
				//this.setState({ open: false });
			}

			
	
		}


	viewName = (user_id,key) =>{
				var name
			Object.values(this.state.usersKey[key]).filter((ro)=>{
				if(ro.from == user_id) {
					return name = ro.senderName;
				} else {
					 //name = "";
				}
			
			})
			//console.log(name)
			return name
			}

			componentDidUpdate(prevProps,prevState){
				//this.props.getUserProfile("5cc818b4bcae4e601d67026")
			}

		
	
		


		loadthreads = () => {
			//console.log(this.state.allthreads)
			
		 
			
			// return this.state.allthreads.map((a, i)=>
			// 	{ 
				if(this.state.messagesAll.length>0) {
					return this.state.messagesAll.map((ro)=>{

		
						return (<div className=" chat-application">
									 
						<div className={this.state.sender==ro.from ? 'd-flex flex-nowrap flex-row-reverse mb-3':'d-flex flex-nowrap mb-3'}>
							<Avatar alt="user profile" src={require('Assets/avatars/user-15.jpg')} className="img-fluid rounded-circle ml-15 align-self-start" />
							<div className="chat-bubble-wrap">
							<span className="text-right d-block font-xs text-muted mt-">{ro.senderName} </span>
								<div className={this.state.sender==ro.from ? 'chat-bubble odd bg-primary text-white':'chat-bubble even bg-aqua'}>
									<p className="mb-0">{ro.message} </p>
								</div>
								{ro.imageUrl ? <div className="mt-2 mb-2"> <a href={ro.imageUrl} download	>
								<img src={this.state.sender==ro.from ? ro.imageUrl:ro.imageUrl}
									alt="user profile" className="img-fluid mr-2" width="150"height="200"/></a>
								</div>:''}
								
								
							</div>
						</div>
			
					</div>
						)
			
					})
				} else {
					return (<div className=" chat-application">
									 
						<div >
						Record Not found.
						</div>
			
					</div>
						)
				}
			
		
				//});
		
			
		
		}

		handleClose = () => {
			this.setState({ open: false });
			};

	componentDidMount(){
		this.props.getPages();
		this.props.getUserProfile("5cc818b4bcae4e601d67026")

	}


	render() {


		const columns = ["Sender Name", "Receiver Name", "View"];
				
				const data = [];
        if(Object.keys(this.state.usersKey)) {
			console.log(this.state.usersKey)
					Object.keys(this.state.usersKey).forEach(key => 
				
						data.push([<div>
							<img src={require('Assets/avatars/user-15.jpg')}
							alt="user profile" className="img-fluid rounded-circle mr-2"
							width="50"height="100"/>
							{ this.viewName(key.split('-')[0],key)}
						</div>,
						 <div>
							<img src={require('Assets/avatars/user-15.jpg')}
							alt="user profile" className="img-fluid rounded-circle mr-2"
							width="50"height="100"/>
							{ this.viewName(key.split('-')[1],key)}
						</div>, 
						<div>
							<button onClick={(e)=>this.viewConversations(key)} className="btn btn-link view_details">View Details</button>
						</div>])
						
					 )
				} else {
					data.push(['Record Not found','',''])
				}
				
		

		
		const options = {
			filterType: 'dropdown',
			filter:false,
			selectableRows: false,
			responsive: 'stacked',
			print:false,
			download:false,
			viewColumns:false,
			selectableRows: false,
			responsive: "scroll",
		};
		return (
			<div className="about-wrapper">
				
			<div className="padding-13 messages-div">
            
       
        </div>
				<PageTitleBar title={<IntlMessages id="sidebar.communication" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"User list"}
								data={data}
								columns={columns}
								options={options}
							/>
							
						</RctCollapsibleCard>
					</RctCard>

					<Modal
                            isOpen={this.state.open}
                            toggle={() => this.handleClose()}
                        >
                            <ModalHeader className="chat-wrapper" toggle={() => this.handleClose()}>
														
                            </ModalHeader>
                            <ModalBody className="chat-modal">
            {this.loadthreads()}
                         </ModalBody>
                            
			            </Modal>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({reducerApp}) =>{
	const {loading,get_profile} = reducerApp;
	return {loading,get_profile}
  }
  
  
  export default connect(mapStateToProps,{getPages,getUserProfile})(Communication);
