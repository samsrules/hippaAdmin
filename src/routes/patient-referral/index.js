/**
 * About Us Page
 */
import React, { Component } from 'react';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button';
import { connect } from 'react-redux';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

// redux action
import {patienRefferel} from '../../actions/AppActions';

import moment from 'moment';

class PatientReferral extends Component {
	constructor(props) {
		super(props)
		this.state={
		 
		}
	
	  }

	  
		componentDidMount(){
			this.props.patienRefferel()
		}

	  componentWillReceiveProps(next){
	
		}
		
	render() {
		 
		
		const columns = ["Patient Name", "Facility Name", "Room Number", "Reasons","PCP Image","Created Date"];
		const data = [];
		if(this.props.refferel!=null && this.props.refferel.length>0) {
			this.props.refferel.map((ro)=>{
				data.push(
					[ro.patient_name,
                     ro.facility_name,
					 ro.room_number,
					 ro.reason,
					 <div>
					 {ro.patient_image ? <IconButton className="text-default" aria-label="disabled Icon" >
					   <a href={ro.profilePic}><i className="zmdi zmdi-eye"></i></a>
					 </IconButton>:''}
				 </div>,
				  moment(ro.createdAt).format('D MMMM YYYY HH:mm')
				  ] 
			 )
			 

			})
		}else {
			data.push(['No Record Found','','',''])
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
				<PageTitleBar title={<IntlMessages id="sidebar.patientReferral" />} match={this.props.match} />
				<div className="about-detail">
					<RctCard>
						<RctCollapsibleCard fullBlock>
							<MUIDataTable
								title={"Patient list"}
								data={data}
								columns={columns}
								options={options}
							/>
						</RctCollapsibleCard>
					</RctCard>
				</div>
			</div>
		);
	}
}


// map state to props
const mapStateToProps = ({ reducerApp }) => {
	const {  loading,refferel } = reducerApp;
	return {  loading,refferel }
  }
  
  export default connect(mapStateToProps, {
		patienRefferel
  })(PatientReferral);
