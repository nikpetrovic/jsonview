import React from 'react'
import map from 'lodash/map'
import './TreeNode.scss'

const SIMPLE = 'simple'
const COMPLEX = 'complex'

export default class TreeNode extends React.Component {
	constructor(props) {
		super(props)
	}

	getValueType = value => {
		if (typeof value === 'string' || typeof value === 'number') {
			return SIMPLE
		} else if (typeof value === 'object') {
			return COMPLEX
		}

		return undefined
	}

	renderValue = (value, valueType) => {
		if (valueType === SIMPLE) {
			return <div className="value">{value}</div>
		} else if (valueType === COMPLEX) {
			return map(value, (v, k) => <TreeNode key={k} name={k} value={v} />)
		}

		return null
	}

	render() {
		const { name, value } = this.props
		const valueType = this.getValueType(value)
		return (
			<div
				className={`tree-node${
					valueType === COMPLEX ? ' complex' : ''
				}`}
			>
				<div className="name">{name}:</div>
				<div
					className={`value${
						valueType === COMPLEX ? ' complex' : ''
					}`}
				>
					{this.renderValue(value, valueType)}
				</div>
			</div>
		)
	}
}
