const React = require('react');

import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const styleSheetPropType = require('StyleSheetPropType');
const ViewStylePropTypes = require('ViewStylePropTypes');

const Button = React.createClass({
  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    style: styleSheetPropType(ViewStylePropTypes),
    styleNormal: styleSheetPropType(ViewStylePropTypes),
    styleDisable: styleSheetPropType(ViewStylePropTypes),
    stylePress: styleSheetPropType(ViewStylePropTypes),
    disable: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      disable: false,
      styleNormal: undefined,
      stylePress: undefined,
    };
  },

  getInitialState() {
    return {
      isPressIn: false,
      isDisable: this.props.disable,
    };
  },

  componentDidMount() {
  },

  _onPressIn() {
    this.setState({isPressIn: true});
  },

  _onPressOut() {
    this.setState({isPressIn: false});
  },

  _onPress() {
    this.props.onPress && this.props.onPress();
  },

  render() {
    let currentstyle = this.props.styleNormal;
    if (this.props.disable) {
      currentstyle = this.props.styleDisable;
    } else {
      if (this.state.isPressIn && this.props.stylePress !== undefined) {
        currentstyle = this.props.stylePress;
      } else {
        currentstyle = this.props.styleNormal;
      }
    }

    return (<TouchableWithoutFeedback
            onPressIn={this._onPressIn}
            onPressOut={this._onPressOut}
            onPress={this._onPress}
            {...this.props.style}>
              <View {...this.props.style} style={[currentstyle]}>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>);
  },
});

module.exports = Button;
