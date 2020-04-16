import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal,Linking, Platform, Alert} from 'react-native';
import  { LinearGradient } from 'expo-linear-gradient';
import { Title , Card, Button} from "react-native-paper";
import { MaterialIcons ,Entypo } from '@expo/vector-icons';

const Profile = (props) =>{


    const {_id,name,picture,phone,salary,email,postion} = props.route.params.item
    const deleteEmployee =()=>{
        fetch("http://a1dbf9f0.ngrok.io/delete",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_idstart 
                
            })
        }).then(res=>res.json())
          .then(deletedEmp=>{
              Alert.alert(`Hey! You broke your friendship with ${deletedEmp.name}... Adios Amigo!!`)
              props.navigation.navigate('Home')
          }).catch(err=>{
              Alert.alert("Something went wrong")
          })
    } 
    const openDial=()=>{
        if(Platform.OS === "android")
        {
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

 return (
     <View style={styles.root}>
        <LinearGradient 
            colors={["#eb4559","#e65365"]}
            style={{height:"20%"}}
        />
        <View style={{alignItems:"center",marginTop:-50}}>
                <Image 
                    style={{width:140,height:140,borderRadius:140/2}}
                    source={{uri:picture}}
                />
        </View>
        <View style={{alignItems:"center",margin:15}}>
            <Title>{name}</Title>
            <Text style={{fontSize:15}}>{postion}</Text>
        </View>
        <Card style={styles.myCard} onPress={()=>{
            Linking.openURL(`mailto:${email}`)
        }}>
            <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="#eb4559" />
            <Text style={styles.myText}>{email}</Text>
            </View>
        </Card>
        <Card style={styles.myCard} onPress={()=>openDial()}>
            <View style={styles.cardContent}>
            <Entypo name="phone" size={32} color="#eb4559" />
            <Text style={styles.myText}>{phone}</Text>
            </View>
        </Card>
        <Card style={styles.myCard}>
            <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={32} color="#eb4559" />
            <Text style={styles.myText}>{salary}</Text>
            </View>
        </Card>
        <View style={{flexDirection:"row",justifyContent:"space-around",padding:50}}>
                            <Button 
                            style={{backgroundColor:"black"}}
                            icon="account-edit" 
                            theme={theme}
                            mode="contained" 
                            onPress={() =>{
                                props.navigation.navigate("Create",
                                {_id,name,picture,phone,salary,email,postion}
                                )
                            }}>
                                                                                 edit 
                            </Button>
                            <Button 
                            style={{backgroundColor:"black"}}
                            icon="delete" 
                            theme={theme}
                            mode="contained" 
                            onPress={() => deleteEmployee()}>
                                                                                 delete Info
                            </Button>
        </View>
     </View>
 )
}
const theme={
    colors:{
        primary:"#eb4559",
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    myText:{
        fontSize:18,
        marginTop:3,
        marginLeft:3
    }
})
export default Profile