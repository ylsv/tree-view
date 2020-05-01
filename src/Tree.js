import React, { Component } from 'react';
import Card from './Card';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const styles = {
	root: {
		display: 'flex'
	},
	tree: {
		width: '500px'
	}
};

class Tree extends Component {
	constructor(props) {
		super(props);
		this.state = { users: '', cardText: '', cardImg: '', cardOpen: false };
		this.handleSelect = this.handleSelect.bind(this);
	}

	async componentDidMount() {
		const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
		this.setState({ users: usersResponse.data });
	}
	async handleSelect(event, nodeId) {
		if (nodeId <= 10) {
			const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${nodeId}`);
			const photo = await axios.get(`https://jsonplaceholder.typicode.com/photos/${nodeId}`);
			this.setState({ cardText: user.data.name, cardImg: photo.data.url, cardOpen: true });
		}
	}
	render() {
		const { users, cardOpen, cardText, cardImg } = this.state;
		const { classes } = this.props;
		const renderedUsers =
			users !== '' &&
			users.map((user) => (
				<TreeItem key={user.id} nodeId={user.id} label={`User ${user.id}`}>
					<TreeItem nodeId={uuidv4()} label="Name">
						<TreeItem nodeId={uuidv4()} label={user.name} />
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Username">
						<TreeItem nodeId={uuidv4()} label={user.username} />
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Email">
						<TreeItem nodeId={uuidv4()} label={user.email} />
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Address">
						<TreeItem nodeId={uuidv4()} label="Street">
							<TreeItem nodeId={uuidv4()} label={user.address.street} />
						</TreeItem>
						<TreeItem nodeId={uuidv4()} label="Suite">
							<TreeItem nodeId={uuidv4()} label={user.address.suite} />
						</TreeItem>
						<TreeItem nodeId={uuidv4()} label="City">
							<TreeItem nodeId={uuidv4()} label={user.address.city} />
						</TreeItem>
						<TreeItem nodeId={uuidv4()} label="Zipcode">
							<TreeItem nodeId={uuidv4()} label={user.address.zipcode} />
						</TreeItem>
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Phone">
						<TreeItem nodeId={uuidv4()} label={user.phone} />
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Website">
						<TreeItem nodeId={uuidv4()} label={user.website} />
					</TreeItem>
					<TreeItem nodeId={uuidv4()} label="Company">
						<TreeItem nodeId={uuidv4()} label="Name">
							<TreeItem nodeId={uuidv4()} label={user.company.name} />
						</TreeItem>
						<TreeItem nodeId={uuidv4()} label="Catch-Prase">
							<TreeItem nodeId={uuidv4()} label={user.company.catchPhrase} />
						</TreeItem>
						<TreeItem nodeId={uuidv4()} label="Business">
							<TreeItem nodeId={uuidv4()} label={user.company.bs} />
						</TreeItem>
					</TreeItem>
				</TreeItem>
			));
		return (
			<div className={classes.root}>
				<TreeView
					className={classes.tree}
					onNodeSelect={this.handleSelect}
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
				>
					{renderedUsers}
				</TreeView>
				{cardOpen && (
					<div>
						<Card cardText={cardText} cardImg={cardImg} />
					</div>
				)}
			</div>
		);
	}
}
export default withStyles(styles)(Tree);
