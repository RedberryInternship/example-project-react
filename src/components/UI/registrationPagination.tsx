import React from 'react';
import {StyleSheet,Text, View, TouchableOpacity,} from 'react-native';
import { Colors } from '../../utils';



const pagination = [1,2,3,4]

const registartionPagination = ({activePage, paginationClickHandler} : any) => {


  return (
    <View style={{margin:16, flexDirection:'row', justifyContent:"flex-end"}}>
      {
        pagination.map((val,ind) =>(
          <TouchableOpacity onPress={paginationClickHandler.bind(registartionPagination,ind)} key={val} style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <View style={[styles.paginationContainer,{
              borderColor : ind === activePage ? Colors.primaryGreen : "#B8BDC0"
            }]}
            >
              <Text style={{fontSize:15, color : ind !== activePage ? "#B8BDC0" : Colors.primaryGreen, fontWeight:"bold"}}>{val}</Text>
            </View>
            {
              ind !== pagination.length-1 && <View style={{width:6,height:1, backgroundColor:"#879299", marginHorizontal:2}}></View>
            }
            
          </TouchableOpacity>
        ))
      }
      
    </View>
  );
};


export default registartionPagination;

const styles = StyleSheet.create({
  container : {
    height:30,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    paddingHorizontal:16,
    paddingVertical:4,
    backgroundColor:"white",
    marginHorizontal:8
  },
  paginationContainer : {
    flex:0, 
    width:30, 
    height:30, 
    borderRadius : 8, 
    borderWidth:0.5, 
    borderColor : "#B8BDC0", 
    alignItems:"center", 
    justifyContent:"center"
  }
  
});