import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as env from '../env'

// Actions
import * as TestActions from '../actions/TestActions'

// CSS
import style from '../../css/hello_world.css'

export class HelloWorld extends React.Component {
  static get propTypes() {
    return ({
      text: PropTypes.string.isRequired,
      testActions: PropTypes.object.isRequired
    });
  }

  componentWillMount() {
    this.setState({
      num: 0,
      text: ''
    })
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        num: this.state.num + 1
      })
    }, 1000)
  }

  handleOnChange(e) {
    this.props.testActions.changeText({ text: e.target.value })
  }

  render() {
    const { APP_ENV, BUILD_AT } = env
    const { text } = this.props

    return (
      <div className={style.test}>
        <p><input type="text" value={text} onChange={::this.handleOnChange} /></p>
        <p>{text}</p>
        <div>num: {this.state.num}</div>
        <div>{APP_ENV}: {BUILD_AT}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.test
  }
}

function mapDispatchToProps(dispatch) {
  return {
    testActions: bindActionCreators(TestActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
