import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Settings, Button, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import Cards from './components/cards';

const { width, height } = Dimensions.get('window');

export default function SettingsScreen({}) {
  return (
    <View>
    <ScrollView style={styles.frame}>
     <View style={styles.viewContainer}>
      <View style={styles.settingsTab}>
        <FontAwesome name='chevron-left' size='20' style={styles.chevron} onPress={prev=>!prev}/>
        <Text style={styles.backgroundText}>settings</Text>
      </View>
     </View>
        <Image style={styles.imageStyling}    source={require('/Users/jilondocuments/projects/meloraTroubles/assets/settingsView.png')}></Image>
       <Text style={styles.meloraText}>Save your Meloras</Text>
       <Button title='Sign up or login'/>
       <View style={styles.mainCanvas}>
        <Text style={styles.headerText}>MELORA IN OTHER APPS</Text>
        <Cards 
        Tabheading={"Melora in other apps"}
        TabBody1={"Melora from notification bar"}
        Tabsub1={"lorem ipsum con"}

        
        />

        <Cards style = {styles.marGins}
        
            Tabheading={"Streaming"}
            TabBody5={"Apple Music"}
            Tabsub5={"Play full songs"}

           
        
        />

        <Cards 
        
        Tabheading={"General Settings"}
        TabBody1={"Themes"}
        Tabsub1={"Chhange the Appearance"}

        TabBody2={"Autoplay"}
        Tabsub2={"Allow videos"}

        TabBody3={"Auto Melora"}
        Tabsub3={"Press and hold"}
        

        TabBody4={"Auto Melora"}
        Tabsub4={"Press and hold"}
        
        />
          <View>
            <Text>
            
            </Text>
          </View>

       </View>
    </ScrollView>
    </View>
  );
}





const styles = StyleSheet.create({
  frame:{
    backgroundColor:'#3c0163',
    padding:35,
    paddingLeft:30,
    height:2000,
    zIndex:-1
    
  },
  viewContainer:{
    flex:1
  },
  settingsTab:{
    flexDirection:'row',
    justifyContent:'flex-start',
    position:'absolute'
  },
  backgroundText:{
    marginLeft:110,
    fontSize: 20,
    marginTop:2,
    color:'#f5f6f7'
    
  },
  imageStyling:{
    marginTop:30,
    marginLeft:40
  },
  chevron:{
    marginTop:5,
    color:'#f5f6f7'
  }, 
  meloraText:{
    fontSize:30,
    margin:40,
    marginTop:15,
    color:'#f5f6f7'
    
  },
  mainCanvas:{
    height:900,
    width:'120%',
    marginTop:40,
    marginLeft:-30,
    backgroundColor:'#040a17',
    
    
    zIndex:10,
    position:'relative',
    
    
    
  },
  headerText:{
    marginBottom:1,
    borderWidth:1,
    color:'#f5f6f7',
    borderBottomColor:'#dfdfe2',
    padding:8,
    paddingBottom:2
  },

  marGins : {
    marginTop: -1000,
  }

  
  

 

  
 
   
  
});
