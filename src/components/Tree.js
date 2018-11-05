import React from 'react'
import map from 'lodash/map'
import TreeNode from './TreeNode'

export default class Tree extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { data } = this.props
		if (!data) {
			return <h3>No data available</h3>
		}

		return (
			<div>
				{map(data, (value, key) => (
					<TreeNode key={key} name={key} value={value} />
				))}
			</div>
		)
	}
}
