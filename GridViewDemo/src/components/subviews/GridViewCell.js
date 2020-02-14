import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native';
class GridViewCell extends PureComponent {
  render() {
    return (
      <View style={[styles.CONTAINER, { width: this.props.cellWidth, height: this.props.cellHeight, marginRight: this.props.margin, marginBottom: this.props.margin }]}></View>
    )
  }
}
const styles = StyleSheet.create({
  CONTAINER: { height: 0, width: 0, backgroundColor: "#ddd", justifyContent: "center" }
})
export default GridViewCell