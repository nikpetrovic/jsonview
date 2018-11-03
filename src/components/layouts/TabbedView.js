import React from 'react'
import types from 'prop-types'
import './TabbedView.scss'
import debounce from 'lodash/debounce'

export default class TabbedView extends React.Component {
	static propTypes = {}

	state = {}

	constructor(props) {
		super(props)

		// this.handleJsonChange = debounce(this.handleJsonChange, 250)
	}

	handleJsonChange = e => {
		console.log(e.target.value)
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
						<textarea placeholder="Put JSON aobject here..." onKeyPress={this.handleJsonChange}/>
					) : null}
					{activeTab === 'VIEW' ? <h1>json goes here</h1> : null}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.setState({ activeTab: this.props.tabs && this.props.tabs[0] })
	}
}

TabbedView.defaultProps = {
	tabs: ['JSON', 'VIEW'],
}
