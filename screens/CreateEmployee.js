import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal ,Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { render } from 'react-dom';


const CreateEmployee=({navigation,route})=>{
    const getDetails =(type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "postion":
                    return route.params.postion
                case "picture":
                    return route.params.picture
                    
            }
        }
        return ""
    }
    
    const [Name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [postion,setPostion] = useState(getDetails("postion"))
    const [modal,setModal] = useState(false)

    const submitData = ()=>{
        fetch("http://127.0.0.1:4040/send-data",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:Name,
                email,
                phone,
                salary,
                picture,
                postion
            })
        })
        .then(res=>res.json())
        .then(data=>{
             Alert.alert(`${data.name} is Saved Successfully`)
             navigation.navigate('Home')
        })
        .catch(err=>{
            Alert.alert("Something went wrong")
        })
       

    }

    const updateDetails=()=>{
        fetch("http://127.0.0.1:4040/update",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name:Name,
                email,
                phone,
                salary,
                picture,
                postion
            })
        })
        .then(res=>res.json())
        .then(data=>{
             Alert.alert(`${data.name} is updated Successfully`)
             navigation.navigate('Home')
        })
        .catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

const pickFromGallery = async ()=> {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
        if(!data.cancelled){
            let newfile = {
             uri:data.uri,
             type:`test/${data.uri.split(".")[1]}`,
             name:`test/${data.uri.split(".")[1]}`
         }
            handleUpload(newfile)
        }
    }else{
        Alert.alert("you need to give up the permission to work")
    }
}
const pickFromCamera = async ()=> {
    const {granted} = await Permissions.askAsync(Permissions.CAMERA)
    if(granted){
        let data = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
       if(!data.cancelled){
           let newfile = {
            uri:data.uri,
            type:`test/${data.uri.split(".")[1]}`,
            name:`test/${data.uri.split(".")[1]}`
        }
           handleUpload(newfile)
       }
    }else{
        Alert.alert("you need to give up the permission to work")
    }
}
const handleUpload =(image)=>{
            const data =  new FormData()
            data.append('file',image)
            data.append('upload_preset','Amigos')
            data.append("cloud_name","uyadav207")

            fetch("https://api.cloudinary.com/v1_1/uyadav207/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json()).
            then(data=>{
                console.log(data)
                setPicture(data.url)
                setModal(false)
            })
            .catch(err=>{
                Alert.alert("error while uploading")
            })
}

    return (
     <View style={styles.root}>
     <KeyboardAvoidingView behavior="position">
            <TextInput
            label='Name'
            style={styles.inputStyle}
            value={Name}
            theme={theme}
            mode="outlined"
            onChangeText={text => setName(text)}
        />
            <TextInput
            label='Email'
            style={styles.inputStyle}
            value={email}
            theme={theme}
            mode="outlined"
            onChangeText={text => setEmail(text)}
        />
            <TextInput
            label='Phone'
            style={styles.inputStyle}
            value={phone}
            theme={theme}
            keyboardType="number-pad"
            mode="outlined"
            onChangeText={text => setPhone(text)}
        />
            <TextInput
            label='Salary'
            style={styles.inputStyle}
            value={salary}
            theme={theme}
            mode="outlined"
            onChangeText={text => setSalary(text)}
        />
            <TextInput
            label='Position'
            style={styles.inputStyle}
            value={postion}
            theme={theme}
            mode="outlined"
            onChangeText={text => setPostion(text)}
        />
        
        <Button 
        style={styles.inputStyle} 
        icon={picture ==""?"upload":"check"} 
        mode="contained"
        color="#eb4559"
        onPress={() => setModal(true)}>
                                                        Upload Image
        </Button>
        {route.params ?
            <Button 
        style={styles.inputStyle} 
        icon="content-save" 
        mode="contained"
        color="#eb4559"
        onPress={() => updateDetails()}>
                                                     Update Details
        </Button>
        :
            <Button 
        style={styles.inputStyle} 
        icon="content-save" 
        mode="contained"
        color="#eb4559"
        onPress={() => submitData()}>
                                                        Save
        </Button>
        }
        
  <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={()=>{
            setModal(false)
        }}
        >
        <View style={styles.modalView}>
                <View style={styles.modalButtonView}>
                                    <Button 
                                    icon="camera" 
                                    theme={theme}
                                    mode="contained" 
                                    onPress={() => pickFromCamera()}>
                                                                            Camera
                                    </Button>
                                    <Button 
                                    icon="image-area" 
                                    theme={theme}
                                    mode="contained" 
                                    onPress={() => pickFromGallery()}>
                                                                            Gallery
                                    </Button>
                </View>
                <Button 
                icon="cancel"
                theme={theme}
                onPress={() => setModal(false)}>
                                                                            Cancel
                </Button>
        </View>
            
  </Modal>
  
  </KeyboardAvoidingView>
     </View>
    )
}
const theme={
    colors:{
        primary:"#eb4559",
    }
}
const styles=StyleSheet.create({
    root:{
        flex:1,
    },
    inputStyle:{
        margin:5,
    },
    modalView:{
        position:"absolute",
        bottom:0,
        marginLeft:4,
        width:"98%",
        backgroundColor:"black",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,        
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:20,
    }
})

export default CreateEmployee