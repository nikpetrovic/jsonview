import React from 'react'
import types from 'prop-types'
import './TabbedView.scss'

export default class TabbedView extends React.Component {
	static propTypes = {}

	state = {}

	constructor(props) {
		super(props)
	}

	onTabClick = e => {
		this.setState({ activeTab: e.target.id })
	}

	render() {
		const { tabs } = this.props
		const { activeTab } = this.state
		const activeTabObj = tabs.find(t => t.name === activeTab)
		const component = activeTabObj && activeTabObj.component

		if (!tabs) {
			return null
		}

		return (
			<div className="tabbed-view">
				<div className="tabs">
					{tabs.map(t => (
						<div
							key={t.name}
							id={t.name}
							className={`tab${t.name === activeTab ? ' active' : ''}`}
							onClick={this.onTabClick}
						>
							{t.name}
						</div>
					))}
				</div>
				<div className="view">
					{component && React.createElement(component)}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.setState({ activeTab: this.props.tabs && this.props.tabs[0].name })
	}
}

TabbedView.defaultProps = {
	tabs: [{ name: 'JSON', component: 'textarea' }, { name: 'VIEW', component: 'div' }],
}
