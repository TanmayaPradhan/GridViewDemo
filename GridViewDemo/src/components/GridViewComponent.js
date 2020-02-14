/**
 * AUTHOR: TANMAYA PRADHAN
 * PURPOSE : DESIGNING THE GRID VIEW WITH EQUAL MARGIN GAP
 * DATE: 14/02/2020
 */

/**
 * TO TEST THE GRID VIEW, CHANGE THE VALUE OF "itemListLength" IN constructor.
 * IF YOU ASSIGN 6 IT WILL SHOW 3*3 VIEWS, IF YOU ASSIGN 8 IT WILL SHOW 4*4 ACCORDINGLY AND SO ON.
 * I HAVE ASSIGNED "margin" IN A GLOBAL VARIABLE.YOU CAN CHANGE THAT VALUE, THEN ALL THE MARGINS WILL BE ADJUSTED ACCORDINGLY.
 * HERE I HAVE CHANGED THE HEIGHT OF THE VIEW DYNAMICALLY ALSO. IF YOU DONT NEED THAT CAN ASSIGN A FIX VALUE IN "GridViewCell".
 */

import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import GridViewCell from './subviews/GridViewCell';


var numOfRows = 2
var numOfColumns = 0
var margin = 10
class GridViewComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cellWidth: 0,
      cellHeight: 0,
      itemListLength: 6,
      itemList: [],
    }

  }

  componentDidMount() {
    let arr = []
    for (let i = 1; i <= this.state.itemListLength; i++) {
      arr.push(i)
    }
    this.setState({
      itemList: arr
    })
  }
  func_findDimensions(layout) {
    const { x, y, width, height } = layout;
    if (this.state.itemListLength % 2 == 0) {
      numOfColumns = this.state.itemListLength / 2;
    }
    else {
      numOfColumns = (this.state.itemListLength + 1) / 2;
      
    }

    let verticalMarginTobeDeducted = (numOfRows + 1) * margin
    let horizontalMarginTobeDeducted = (numOfColumns + 1) * margin;
    this.setState({
      cellWidth: (width - horizontalMarginTobeDeducted) / numOfColumns,
      cellHeight: (height - verticalMarginTobeDeducted) / numOfRows,
    })
  }
  
  render() {
    return (
      <SafeAreaView style={styles.SAFEAREA}>


        <View style={styles.CONTAINER}
          onLayout={(event) => { this.func_findDimensions(event.nativeEvent.layout) }}
        >
          {
            numOfColumns == 0 ? null :

              <FlatList
                data={this.state.itemList}
                style={{ marginLeft: margin, marginTop: margin }}
                numColumns={numOfColumns}
                renderItem={({ item }) => <GridViewCell cellWidth={this.state.cellWidth} margin={margin} cellHeight={this.state.cellHeight} />}
                keyExtractor={(item, index) => index.toString()}
              ></FlatList>
          }
        </View>
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  SAFEAREA: { flex: 1, backgroundColor: "#fff", },
  CONTAINER: { flex: 1, backgroundColor: "transparent", },
})
export default GridViewComponent