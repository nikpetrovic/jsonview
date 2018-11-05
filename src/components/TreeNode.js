import React from 'react'

export default class TreeNode extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { name, value } = this.props
		return <div>{name}</div>
	}
}
