
import React from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';

function Cards({ Tabheading, TabBody1, Tabsub1, TabBody2, Tabsub2, TabBody3, Tabsub3, TabBody4, Tabsub4, TabBody5, Tabsub5 }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>{Tabheading}</Text>
      </View>
      <View style={styles.bodyContainer}>
       {TabBody1 && (
          <>
            <Text style={styles.bodyText}>{TabBody1}</Text>
            {Tabsub1 && <Text style={styles.subText}>{Tabsub1}</Text>}
        
            <Switch style={styles.switch} title={`Action for ${TabBody1}`} onPress={() => alert(`Action for ${TabBody1}`)} />
          </>
        )}
        {TabBody2 && (
          <>
            <Text style={styles.bodyText}>{TabBody2}</Text>
            {Tabsub2 && <Text style={styles.subText}>{Tabsub2}</Text>}
            <Switch style={styles.switch} title={`Action for ${TabBody2}`} onPress={() => alert(`Action for ${TabBody2}`)} />
          </>
        )}
        {TabBody3 && (
          <>
            <Text style={styles.bodyText}>{TabBody3}</Text>
            {Tabsub3 && <Text style={styles.subText}>{Tabsub3}</Text>}
            <Switch style={styles.switch} title={`Action for ${TabBody3}`} onPress={() => alert(`Action for ${TabBody3}`)} />
          </>
        )}
        {TabBody4 && (
          <>
            <Text style={styles.bodyText}>{TabBody4}</Text>
            {Tabsub4 && <Text style={styles.subText}>{Tabsub4}</Text>}
            <Switch style={styles.switch} title={`Action for ${TabBody4}`} onPress={() => alert(`Action for ${TabBody4}`)} />
          </>
        )}
        {Tabsub5 &&(
            <>
            <Text style={styles.bodyText}>{TabBody5}</Text>
            {Tabsub5 && <Text style={styles.subText}>{Tabsub5}</Text>}
             {<View style={styles.Connect}><Text>connect</Text></View>}
            </>
        )}
      </View>
    </View>
  );
}

export default Cards;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
  },
  headingWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: '#dfdfe2',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#f5f6f7',
  },
  bodyContainer: {
    marginTop: 10,
  },
  bodyText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  subText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#d1d1d1',
    marginTop: 5,
  },
  switch:{
    alignSelf:'flex-end',
    marginTop:-30
  },
  Connect:{
    alignSelf:'flex-end',
   
    paddingVertical:5,
    paddingHorizontal:8,
    marginTop:-30,
    backgroundColor:'red',
    color:'white',
    borderRadius:15

 
  }
});

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// function Cards({ Tabheading, TabBody1, Tabsub1, TabBody2, Tabsub2, TabBody3, Tabsub3, TabBody4, Tabsub4 }) {
//   return (
//     <View style={styles.cardContainer}>
//       <View style={styles.headingWrapper}>
//         <Text style={styles.headingText}>{Tabheading}</Text>
//       </View>
//       <View style={styles.bodyContainer}>
//         {TabBody1 && <Text style={styles.bodyText}>{TabBody1}</Text>}
//         {Tabsub1 && <Text style={styles.subText}>{Tabsub1}</Text>}
//         {TabBody2 && <Text style={styles.bodyText}>{TabBody2}</Text>}
//         {Tabsub2 && <Text style={styles.subText}>{Tabsub2}</Text>}
//         {TabBody3 && <Text style={styles.bodyText}>{TabBody3}</Text>}
//         {Tabsub3 && <Text style={styles.subText}>{Tabsub3}</Text>}
//         {TabBody4 && <Text style={styles.bodyText}>{TabBody4}</Text>}
//         {Tabsub4 && <Text style={styles.subText}>{Tabsub4}</Text>}
//       </View>
//     </View>
//   );
// }

// export default Cards;

// const styles = StyleSheet.create({
//   cardContainer: {
//     padding: 15,
//     marginBottom: 20,
//     backgroundColor: '#2c2c2c',
//     borderRadius: 10,
//   },
//   headingWrapper: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#dfdfe2', 
//     borderTopColor:'#dfdfe2',
//     borderTopWidth:2,
//     paddingBottom: 5,
//     marginBottom: 10,
//   },
//   headingText: {
//     fontWeight: 'bold',
//     fontSize: 22,
//     color: '#f5f6f7',
//   },
//   bodyContainer: {
//     marginTop: 2,
//   },
//   bodyText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'white',
//     marginTop: 7,
//   },
//   subText: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#d1d1d1',
//     marginTop: 5,
//   },
// });

