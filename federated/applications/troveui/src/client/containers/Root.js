import React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";

import App from "../containers/AppContainer";

import store from "../store/store";
import Router from "../routes/router";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Colors from "./Root.scss";

const getMuiTheme = () =>
	createMuiTheme({
		props: {
		  MuiButtonBase: {
			disableRipple: true, 
		  },
		},
		overrides: {
			MuiAppBar: {
				root: {
					borderBottom: "1px solid " + Colors.borderlight,
					boxShadow: "none",
				},
				colorPrimary: {
					color: Colors.primarytextcolor,
					backgroundColor: Colors.backgroundwhite,
				},
			},
			MuiToolbar : {
				root: {
					minHeight: 56,
				},
			},
			MuiButton: {
				root: {
					textTransform: "none",		
					"&$disabled": {						
						backgroundColor: Colors.buttondisabledbackground,
						color: Colors.buttondisabledtext,
						border: "1px solid " + Colors.buttondisabledborder,
					},	
				},
				containedPrimary: {
					backgroundColor: Colors.buttonprimarybackground,
					color: Colors.buttonprimarytext,
					fontWeight: 700,	
					border: "1px solid " + Colors.buttonprimarybackground,
					boxShadow: "0 3px 0 0 " + Colors.buttonprimarybackgroundhover,			
					"&:hover": {
						backgroundColor: Colors.buttonprimarybackgroundhover,
						color: Colors.buttonprimarytexthover,
						border: "1px solid " + Colors.buttonprimaryborderhover,
						boxShadow: "0 3px 0 0 " + Colors.primarycolor,
					},		
					"&:active": {
						boxShadow: "0 1px 0 0 " + Colors.primarycolor,
						position:"relative",
						top:2,
					},
				},				
				outlinedPrimary: {
					backgroundColor: Colors.buttonsecondarybackground,
					color: Colors.buttonsecondarytext,
					fontWeight: 700,	
					border: "1px solid " + Colors.buttonsecondaryborder,
					boxShadow: "0 3px 0 0 " + Colors.borderlight,			
					"&:hover": {
						backgroundColor: Colors.buttonprimarybackgroundhover,
						color: Colors.buttonprimarytexthover,
						border: "1px solid " + Colors.buttonprimaryborderhover,
						boxShadow: "0 3px 0 0 " + Colors.primarycolor,
					},		
					"&:active": {
						boxShadow: "0 1px 0 0 " + Colors.primarycolor,
						position:"relative",
						top:2,
					},
				},
			},
			MuiTypography: {
				root: {
					color: Colors.primarytextcolor
				},
				h6: {
					lineHeight: 1,
				},
				body1: {
					lineHeight: 1.375,
				},
				body2: {
					lineHeight: 1.375,
				}
			},
			MuiCard: {
				root: {
					boxShadow: "none",
					border: "1px solid " + Colors.borderlight,
					minWidth: 275,
				},				
			},	
			MuiTabs: {
				indicator: {
					height: 3,
				},
			},	
			MuiTab: {
				root: {
					display: "flex",
					flexDirection: "column",
					opacity: 1,
					fontSize: "1rem",
					fontWeight: 400,
					textTransform: "none",
					color: Colors.secondarytextcolor,					
					"&$disabled": {
						cursor: "not-allowed",
						pointerEvents: "visiblePainted",
					}
				},
				textColorInherit: {
					color: Colors.secondarytextcolor,
					opacity: 1,
					"&$selected": {
						fontWeight: 700,
						color: Colors.primarytextcolor,
					},
					"&:hover": {
						color: Colors.primarytextcolor,
					},
				},
			},
		},
		palette: {
			background: {
				default: Colors.backgroundwhite,
				secondary: Colors.backgroundgraylight
			},
			primary: {
				main: Colors.primarycolor
			},
			secondary: {
				main: Colors.secondarycolor
			},
			border: {
				main: Colors.primarycolor,
				light: Colors.borderlight
			},
		},
		status: {
			danger: "orange"
		}
	});

class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider theme={getMuiTheme()}>
					<App />
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default hot(module)(Root);
