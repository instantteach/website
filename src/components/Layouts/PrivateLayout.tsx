// tslint:disable:jsx-no-lambda
import * as React from 'react'
import { Redirect, Route, RouteProps,} from 'react-router'

import AuthenticationService from '../../services/AuthenticationService';
import AppBar from '../AppBar'

import store from '../../state/store'

interface IContentProps {
    normal?: boolean
    padding?: boolean
}
interface IPrivateLayout extends RouteProps, IContentProps {
    triangle?: boolean;
    component: any;
}

const PrivateLayout: React.SFC<IPrivateLayout>  = ({ component, ...rest }) => {
    // Verify if exists an user session
    AuthenticationService.listener()
    return (
        (store.getState().session || AuthenticationService.session)
        ? <Route {...rest} render={({ staticContext, ...matchProps }) => (
            <AppBar {...matchProps}>
            {React.cloneElement(component, {...matchProps, session: store.getState().session})}
            </AppBar>
        )} />
        : <Redirect to="/login" />
    )
}

export default PrivateLayout
