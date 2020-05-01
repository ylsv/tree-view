import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
	root: {
		minWidth: 400
	},
	title: {
		textAlign: 'center',
		fontSize: 14
	},
	username: {
		fontWeight: 600
	},
	media: {
		height: 140
	}
});

export default function SimpleCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title}>
					<span>You've chosen user </span>
					<span className={classes.username}>{props.cardText}</span>
				</Typography>
			</CardContent>
			<CardMedia className={classes.media} image={props.cardImg} />
		</Card>
	);
}
