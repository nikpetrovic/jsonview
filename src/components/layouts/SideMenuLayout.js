import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './SideMenuLayout.scss'

class SideMenuLayout extends Component {
  state = { showSideMenu: true }

  componentWillMount() {
    this.setState({ showSideMenu: this.props.defaultMenuVisible })
  }

  remapChildren = children => React.Children.map(children, child => this.renderPartial(child))

  renderPartial = cmp => {
    let component = cmp && typeof cmp === 'function' ? cmp() : cmp

    if (component) {
      const { sidemenutoggle } = component.props
      let additionalProps = sidemenutoggle ? {onClick: this.onToggleSideMenu} : {}
      if (sidemenutoggle) {
        console.log('pronadjena kompoennta')
        console.log(component)
      }

      const children = this.remapChildren(component.props.children)

      if (children) {
        return React.cloneElement(component, { ...component.props, children: children, ...additionalProps })
      }

      return component
    }
  }

  onToggleSideMenu = () => {
    this.setState({ showSideMenu: !this.state.showSideMenu })
  }

  render() {
    const { sideMenu, header, footer } = this.props

    return (
      <div className="side-menu-layout">
        {sideMenu && (
          <div className="side-menu" ref={ref => (this.sideMenu = ref)}>
            {this.renderPartial(sideMenu)}
          </div>
        )}
        <div className="main-container">
          {header && <div className="header">{this.renderPartial(header)}</div>}
          <div className="body">{this.props.children}</div>
          {footer && <div className="footer">{this.renderPartial(footer)}</div>}
        </div>
      </div>
    )
  }

  recalculateSideMenuWidth = () => {
    if (!this.sideMenu) {
      return
    }

    const { showSideMenu } = this.state
    const sideMenu = ReactDOM.findDOMNode(this.sideMenu)

    const sideMenuStyle = window.getComputedStyle(sideMenu)
      ? window.getComputedStyle(sideMenu)
      : sideMenu.style

    const sideMenuWidth = window.parseFloat(sideMenuStyle.width)

    if (showSideMenu) {
      this.sideMenu.style.marginLeft = -sideMenuWidth + 'px'
      this.sideMenu.style.marginLeft = 'unset'
    } else {
      this.sideMenu.style.marginLeft = 'unset'
      this.sideMenu.style.marginLeft = -sideMenuWidth + 'px'
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevState.showSideMenu !== this.state.showSideMenu) {
      this.recalculateSideMenuWidth()
    }
  }

  componentDidMount() {
    if (this.state.showSideMenu) {
      this.recalculateSideMenuWidth()
    }
  }
}

SideMenuLayout.propTypes = {}
SideMenuLayout.defaultProps = {}

export default SideMenuLayout
