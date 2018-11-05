import React from 'react'
import types from 'prop-types'
import './TabbedView.scss'
import debounce from 'lodash/debounce'
import Tree from '../Tree'

import data from '../../mock-data/test1.json'

export default class TabbedView extends React.Component {
	static propTypes = {}

	state = {}

	constructor(props) {
		super(props)

		this.handleJsonChange = debounce(this.handleJsonChange, 500)
	}

	handleJsonChange = jsonString => {
		console.log('json string:', jsonString)
		try {
			const json = JSON.parse(jsonString)
			console.log('valid json:', json)
		} catch (e) {
			console.error('Invalid JSON object.')
			console.error(e)
		}
	}

	onJsonChange = e => {
		this.handleJsonChange(e.target.value)
	}

	onTabClick = e => {
		this.setState({ activeTab: e.target.id })
	}

	render() {
		const { tabs } = this.props
		const { activeTab } = this.state
		const activeTabObj = tabs.find(t => t === activeTab)
		const component = activeTabObj && activeTabObj.component

		if (!tabs) {
			return null
		}

		return (
			<div className="tabbed-view">
				<div className="tabs">
					{tabs.map(t => (
						<div
							key={t}
							id={t}
							className={`tab${t === activeTab ? ' active' : ''}`}
							onClick={this.onTabClick}
						>
							{t}
						</div>
					))}
				</div>
				<div className="view">
					{activeTab === 'JSON' ? (
						<textarea
							placeholder="Put JSON aobject here..."
							onChange={this.onJsonChange}
						/>
					) : null}
					{activeTab === 'VIEW' ? <Tree data={data} /> : null}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.setState({ activeTab: this.props.tabs && this.props.tabs[1] })
	}
}

TabbedView.defaultProps = {
	tabs: ['JSON', 'VIEW'],
}
