import React, { Component } from 'react'
import {SafeAreaView,View,StyleSheet,FlatList} from 'react-native';
import GridViewCell from './subviews/GridViewCell';

var numOfRows = 2
var numOfColumns = 0
var margin = 10
class componentName extends Component {
    constructor (props) {
        super(props)
        this.state={
            cellWidth: 0,
            cellHeight:0,
            itemListLength:11,
            itemList:[],
        }
        this.fatListRef = null;
    }
    
    componentDidMount () {
        let arr = []
        for(let i=0; i< this.state.itemListLength;i++){
            arr.push(i)
        }
        this.setState({
            itemList: arr
        })
    }
    find_dimesions(layout){
        const {x, y, width, height} = layout;
        if(this.state.itemListLength % 2 == 0){
            numOfColumns = this.state.itemListLength/2;
        }
        else{
            numOfColumns = (this.state.itemListLength - 1)/2;
        }
        
        let verticalMarginTobeDeducted = (numOfRows + 1) * margin
        let horizontalMarginTobeDeducted = (numOfColumns + 1) * margin;
        this.setState({
            cellWidth: (width - horizontalMarginTobeDeducted) / numOfColumns,
            cellHeight: (height-  verticalMarginTobeDeducted) / numOfRows,
        })
      }
  render () {
      
    return (
        <SafeAreaView style={styles.SAFEAREA}>

        
      <View style={styles.CONTAINER}
      onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }} 
      >
      {
          numOfColumns == 0 ? null :
      
          <FlatList
          ref={(ref)=> this.fatListRef = ref}
          data={this.state.itemList}
          style={{marginLeft: margin,marginTop: margin}}
          numColumns={numOfColumns}
          renderItem={({ item }) => <GridViewCell cellWidth={this.state.cellWidth} margin={margin} cellHeight={this.state.cellHeight} />}
          keyExtractor={(item, index) => index.toString()}
          //getItmeLayout={this.getItemLayout}
          ></FlatList>
        }
      </View>
      </SafeAreaView>
    )
  }
  getItemLayout = (data, index) => (
    {length: 40, offset: 40 * index, index}
);
}
const styles = StyleSheet.create({
  SAFEAREA:{flex:1,backgroundColor:"#ccc",},
  CONTAINER: {flex:1,backgroundColor:"#090",},
})
export default componentName