/**
 * About Us Page
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

// redux action
import {getVideos,addVideos,deleteVideo,updateVideos} from '../../actions/AppActions';
import { root } from 'glamor';
import { red } from '@material-ui/core/colors';

import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';


function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class EducationalVideo extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            open: false,
            errVideo:'',
            openDelete:'',
            vid_id:'',
            addNewVideo: {
              video_title:'',
              video_link:'',
              video_description:'',
            },
        };

        this.deletVideoModel = this.deletVideoModel.bind(this)
        this.editVideoModel = this.editVideoModel.bind(this)
    }
    
    
	handleClickOpen = () => {
        this.setState({vid_id:'',open:true,addNewVideo:{
			video_description:'',
            video_link:'',
            video_title:''
        }})
        
	};

	handleClose = () => {
		this.setState({ open: false });
    };

    deletVideoModel(vid_id) {
       
        this.setState({
            vid_id:vid_id
        })
        this.refs.deleteConfirmationDialog.open();
    }

    editVideoModel(data) {
        console.log(data)
      
        this.setState({vid_id:data._id,open:true,addNewVideo:{
			video_description:data.video_description,
            video_link:data.video_url,
            video_title:data.video_title
		}})
        
    }

    /**
	 * Delete User Permanently
	 */
	deleteVideoPermanently() { 
		if(this.state.vid_id) {
			this.props.deleteVideo(this.state.vid_id);
			this.refs.deleteConfirmationDialog.close();
		}
	}

    

    componentWillMount(){
        this.props.getVideos()
    }

    getId = (url)=>{
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        var link = '//www.youtube.com/embed/'
        if (match && match[2].length == 11) {
            return match[2];
            
        } else {
            return 'error';
        }
    }

    onChangeAddNewVideos(key, value) {
        var self = this;
        if(key=='video_link') { 
            let err = this.getId(value);
            if(err=='error') {
                self.setState({errVideo:'please add valid Url.'})
            } else {
                self.setState({errVideo:''})
            }
        } 
		self.setState({
			addNewVideo: {
				...this.state.addNewVideo,
				[key]: value
			}
		});
    }

    isFormVideo = () =>{
        const { video_title, video_link,video_description} = this.state.addNewVideo;

        return video_link.length > 0 && video_title.length > 0 && this.state.errVideo=='' && video_description.length>0;
    }

    
    
    addVideosForm = () =>{
        const {video_title,video_link,video_description} = this.state.addNewVideo
        var videoid = this.getId(video_link);
        if(videoid!='error') {
            let obj ={
                user_id:"5cbd83e7f11c4a3e00eceb6b",
                video_title:video_title,
                video_description: video_description,
                video_id: videoid,
                video_url: video_link
        }
        this.props.addVideos(obj)
        this.setState({ open: false });
        }
        
    }

    updateVideosForm = () =>{
        if(this.state.vid_id) {
        const {video_title,video_link,video_description} = this.state.addNewVideo
        var videoid = this.getId(video_link);
        if(videoid!='error') {
            let obj ={
                user_id:"5cbd83e7f11c4a3e00eceb6b",
                video_title:video_title,
                video_description: video_description,
                video_id: videoid,
                video_url: video_link
        }

        this.props.updateVideos(this.state.vid_id,obj)
        this.setState({ open: false });
        }
    }
        
    }


    
    

      getVideoList = ()=>{
            if(this.props.get_videos===null) {
                return(<div className="col-xs-12 col-sm-12 col-md-3 mb-30">
                    <RctCard>
                    <Card>
                    
                            <CardBody className="">
                                <CardTitle><h1></h1></CardTitle>
                                <CardSubtitle><h5>Loading...</h5></CardSubtitle>
                            </CardBody>
                    </Card>
                    </RctCard>
                </div>)
            } else {
                if(this.props.get_videos!=null && this.props.get_videos.length>0) {
            
                    return this.props.get_videos.map((vi)=>{
                        return(<div className="col-xs-12 col-sm-12 col-md-3 mb-30 title">
                        <div class=''>
                           <a class='delete' href="javascript:void(0);" onClick={(e)=>this.deletVideoModel(vi._id)}><i class="zmdi zmdi-delete"></i></a>
                           <a class='delete' href="javascript:void(0);" onClick={(e)=>this.editVideoModel(vi)}><i class="zmdi zmdi-edit"></i></a>
                        </div>
                        
                        <RctCard>
                        <Card>
                            <div>
                        
                            <iframe src={"https://www.youtube.com/embed/"+vi.video_id}
                                    frameBorder='0'
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                    title='video'
                                    width='100%'
                                    height='250px'
                            />
                            </div>
                            <CardBody className="video-details">
                                <CardTitle><h2 className="truncate">{vi.video_title}</h2></CardTitle>
                                <CardSubtitle className="video-description"><h5>{vi.video_description}</h5></CardSubtitle>
                            </CardBody>
                        </Card>
                        </RctCard>
                    </div>)
                })
                } else {
                    return(<div className="col-xs-12 col-sm-12 col-md-3 mb-30">
                    <RctCard>
                    <Card>
                    
                            <CardBody className="">
                                <CardTitle><h1></h1></CardTitle>
                                <CardSubtitle><h5>Record Not Found.</h5></CardSubtitle>
                            </CardBody>
                    </Card>
                    </RctCard>
                </div>)
                }
            } 
     }

     componentWillReceiveProps(nextProps) {
     }
    
	render() {
        const { children, heading } = this.props;
        const {addNewVideo,vid_id} = this.state;
		const { open } = this.state;
		return (
			<div className="about-wrapper">
        
				<PageTitleBar title={<IntlMessages id="sidebar.educationalVideo" />} match={this.props.match} />
				<div className="Offers-details">
                    <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                    <RctCollapsibleCard fullBlock>
						<div className="d-flex justify-content-between py-20 px-10 border-bottom">
                        <div className="ml-10">
								<h2 className="mb-0">Videos List</h2>
							</div>
							<div>
								<a href="javascript:void(0)" onClick={this.handleClickOpen} color="primary" className="caret btn-sm mr-10 width-100">Add New Video <i className="zmdi zmdi-plus"></i></a>
							</div>
						</div>
                        </RctCollapsibleCard>
                        </div>
                        </div>
                        <div className="row">
                        
                        {this.getVideoList()}
                         
			        </div>
                    <div className="">

                    <DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete Video permanently."
					onConfirm={() => this.deleteVideoPermanently()}
				/>

                        <Modal
                            isOpen={open}
                        >
                            <ModalHeader toggle={() => this.handleClose()}>
                                {vid_id ? 'Update Video':'Add Video'}
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="File">Video Link</Label>
                                    <Input type="text" name="video_link" id="video_link" placeholder="Video Link (https://www.youtube.com/watch?v=KCLdryjDl6E)" value={addNewVideo.video_link} onChange={(e) => this.onChangeAddNewVideos('video_link', e.target.value)} />
                                    <span style={{color:'red',}}>{this.state.errVideo}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text" name="title" id="title" placeholder="Video Title" value={addNewVideo.video_title} onChange={(e) => this.onChangeAddNewVideos('video_title', e.target.value)}  />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="title">Description</Label>
                                    <Input type="text" name="description" id="description" placeholder="Video Description" value={addNewVideo.video_description} onChange={(e) => this.onChangeAddNewVideos('video_description', e.target.value)}  />
                                </FormGroup>

                            </ModalBody>
                            <ModalFooter>
                                <Button variant="raised" className="btn-success text-white mr-10" disabled={!this.isFormVideo()} onClick={()=>vid_id ? this.updateVideosForm() :this.addVideosForm()}>Save</Button>
                                    <Button variant="raised" onClick={this.handleClose} className="btn-danger text-white mr-10">Cancel</Button>
                            </ModalFooter>
			            </Modal>
                    </div>
                </div>
            </div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,get_videos,add_videos} = reducerApp;
	return {  loading,get_videos,add_videos }
  }
  
  export default connect(mapStateToProps, {
	getVideos,addVideos,deleteVideo,updateVideos
  })(EducationalVideo);
