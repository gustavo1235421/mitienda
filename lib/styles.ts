import { StyleSheet } from 'react-native';
export const palette = { ink:'#17342D', green:'#136C52', cream:'#F7F5EF', white:'#FFFFFF', muted:'#657A71', orange:'#BD6D2B', red:'#B33B3B' };
export const ui = StyleSheet.create({
 page:{flex:1,backgroundColor:palette.cream,paddingHorizontal:22,paddingTop:28},
 center:{flex:1,backgroundColor:palette.cream,justifyContent:'center',padding:26},
 logo:{fontSize:38,fontWeight:'900',color:palette.ink,letterSpacing:-1},
 lead:{fontSize:15,color:palette.muted,marginTop:7,marginBottom:24},
 title:{fontSize:27,fontWeight:'800',color:palette.ink,marginBottom:16},
 label:{fontSize:13,fontWeight:'700',color:palette.ink,marginTop:15,marginBottom:8},
 field:{backgroundColor:palette.white,borderColor:'#D7E1D9',borderWidth:1,borderRadius:13,paddingHorizontal:15,paddingVertical:13,fontSize:16,color:palette.ink},
 action:{backgroundColor:palette.green,borderRadius:13,paddingVertical:15,paddingHorizontal:16,alignItems:'center',justifyContent:'center',marginTop:20},
 actionText:{color:'white',fontWeight:'800',fontSize:15},
 outline:{borderWidth:1,borderColor:palette.green,borderRadius:13,padding:13,alignItems:'center',justifyContent:'center'},
 outlineText:{color:palette.green,fontWeight:'800'},
 link:{color:palette.green,fontWeight:'700',textAlign:'center',marginTop:19},
 error:{color:palette.red,backgroundColor:'#FDEDEB',padding:12,borderRadius:10,marginTop:15},
 panel:{backgroundColor:palette.white,borderRadius:18,padding:18,marginVertical:9,borderWidth:1,borderColor:'#E4E9E2'},
 small:{fontSize:13,color:palette.muted},
 row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
});
