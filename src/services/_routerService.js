
import {
	AsyncCommunicationComponent,
	AsyncPatientDoseComponent,
	AsyncTermConditionsComponent,
	AsyncPatientReferralComponent,
	AsyncProviderComponent,
	AsyncEducationalVideoComponent,
	AsyncSurveyComponent,
	AsyncChatComponent,
	AsyncAboutUsComponent,
	AsyncNotificationListComponent
} from 'Components/AsyncComponent/AsyncComponent';

export default [
	{
		path: 'provider',
		component: AsyncProviderComponent
	},
	{
		path: 'communication',
		component: AsyncCommunicationComponent,
	},
	{
		path: 'patient-dose',
		component: AsyncPatientDoseComponent,
	},
	{
		path: 'term-conditions',
		component: AsyncTermConditionsComponent,
	},
	{
		path: 'patient-referral',
		component: AsyncPatientReferralComponent,
	},
	{
		path: 'educational-video',
		component: AsyncEducationalVideoComponent
	},
	{
		path: 'survey',
		component: AsyncSurveyComponent,
	},
	 {
		path: 'chat',
		component: AsyncChatComponent
	},
	{
		path: 'about-us',
		component: AsyncAboutUsComponent
	},
	{
		path: 'notification-list',
		component: AsyncNotificationListComponent
	},
	
]