import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import {Card} from "react-native-paper"
import {FAB} from 'react-native-paper';
import {useSelector,useDispatch} from "react-redux";
import { State } from 'react-native-gesture-handler';

const Home=({navigation,route})=>{
    // const [data, setData] = useState([])
    // const [loading,setLoading] = useState(true)
  
const {data,loading} = useSelector((state)=>{
        return state
    })

   const fetchData = ()=>{
    fetch("http://a1dbf9f0.ngrok.io/")
    .then(res=>res.json())
    .then(results=>{
        // setData(results)
        // setLoading(false)

        const dispatch = useDispatch()
        const {data, loading} = useSelector((state)=>{
            return 
        })
        
    }).catch(err=>{
        Alert.alert("Hey! Amigo, Check your Network... ")
    })
   }


    useEffect(()=>{
      fetchData()
    },[])
   
    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard} key={item._id}
            onPress={()=>navigation.navigate("Profile",{item})}
            >
       
            <View style={styles.cardView}>
            <Image
                style={{width:60,height:60,borderRadius:30}}
            source={{uri:item.picture}}
    
               /> 
               <View style={{marginLeft:10}}>
               <Text style={styles.text}>{item.name}</Text>
               <Text>{item.postion}</Text>
               </View>
             </View>
            </Card>
        )
    })
    return (
        <View style={{flex:1}}>
      
        <FlatList
         data = {data}
         renderItem={({item})=>{
            return renderList(item)
         }}
         keyExtractor={item=>`${item._id}`}
         onRefresh={()=> fetchData()}
         refreshing={loading}
       />
       
        
       <FAB onPress={()=>navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"#eb4559"}}} 
        />
        </View>
    )
}
const styles = StyleSheet.create({
    mycard: {
        margin: 5,
    },
    cardView: {
        flexDirection:"row",
        padding:6,
    },
    text: {
        fontSize:18,
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})

export default Home;