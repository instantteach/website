import CssBaseline from '@material-ui/core/CssBaseline'
import * as React from 'react'
import * as ReactGA from 'react-ga'
import { Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import PrivateLayout from '../components/PrivateLayout'

import About from '../components/About'
import Contact from '../components/Contact'
import Document from '../components/Document'
import Documents from '../components/Documents'
import Home from '../components/Home'
import Login from '../components/Login'
import MaterialGenerator from '../components/MaterialGenerator'
import Policy from '../components/Policy'
import Upload from '../components/Upload'

ReactGA.initialize('UA-122507387-1');

const fireTracking = () => ReactGA.pageview(window.location.hash)

const Routes = (props: any) => (
  <React.Fragment>
    <CssBaseline />
    <Router onUpdate={fireTracking} {...props}>
    <Switch>
      <DefaultLayout exact={true} path="/" component={<Home />} />
      <DefaultLayout path="/material-generator" component={<MaterialGenerator />} />
      <DefaultLayout path="/document/:id" component={<Document match={{}} />} />
      <DefaultLayout path="/lesson-plans" component={<Documents />} />
      <DefaultLayout path="/contact" component={<Contact />} />
      <DefaultLayout path="/about-us" component={<About />} />
      <DefaultLayout path="/privacy-policy" component={<Policy />} />
      <DefaultLayout path="/login" component={<Login />} />
      <PrivateLayout path="/upload" component={<Upload />} />
    </Switch>
  </Router>
  </React.Fragment>
);

export default Routes;
