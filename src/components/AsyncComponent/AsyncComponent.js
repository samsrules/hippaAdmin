/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';


// patient referral
const AsyncPatientReferralComponent = Loadable({
	loader: () => import("Routes/patient-referral"),
	loading: () => <RctPageLoader />,
});

// Assesment
const AsyncPatientDoseComponent = Loadable({
	loader: () => import("Routes/patient-dose"),
	loading: () => <RctPageLoader />,
});


// communication
const AsyncCommunicationComponent = Loadable({
	loader: () => import("Routes/communication"),
	loading: () => <RctPageLoader />,
});

// term-conditions
const AsyncTermConditionsComponent = Loadable({
	loader: () => import("Routes/term-conditions"),
	loading: () => <RctPageLoader />,
});

// NotificationLIst
const AsyncNotificationListComponent = Loadable({
	loader: () => import("Routes/notification-list"),
	loading: () => <RctPageLoader />,
});


// provider
const AsyncProviderComponent = Loadable({
	loader: () => import("Routes/provider"),
	loading: () => <RctPageLoader />,
});

// Survey
const AsyncSurveyComponent = Loadable({
	loader: () => import("Routes/survey"),
	loading: () => <RctPageLoader />,
});
// About-us
const AsyncAboutUsComponent = Loadable({
	loader: () => import("Routes/about-us"),
	loading: () => <RctPageLoader />,
});

// Educational video
const AsyncEducationalVideoComponent = Loadable({
	loader: () => import("Routes/educational-video"),
	loading: () => <RctPageLoader />,
});

/*---------------- Session ------------------*/


// Session Login
const AsyncSessionLoginComponent = Loadable({
	loader: () => import("Routes/session/login"),
	loading: () => <RctPageLoader />,
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
	loader: () => import("Routes/session/register"),
	loading: () => <RctPageLoader />,
});


// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
	loader: () => import("Routes/session/forgot-password"),
	loading: () => <RctPageLoader />,
});



export {
	AsyncCommunicationComponent,
	AsyncTermConditionsComponent,
	AsyncPatientDoseComponent,
	AsyncEducationalVideoComponent,
	AsyncSurveyComponent,
	AsyncProviderComponent, 
	AsyncPatientReferralComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncAboutUsComponent,
	AsyncNotificationListComponent
};
