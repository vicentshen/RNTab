'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} = React;

var { Icon, } = require('react-native-icons');
var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FF0000'
  },
  tabnormal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000'
  },
  tabText:{
    fontSize:8,
    color:'white'
  },
  tabImage:{
    width:30,
    height:30
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

var FacebookTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    titles: React.PropTypes.array,
  },

  renderTabOption(name,title, page) {
    var isTabActive = this.props.activeTab === page;
    console.log(name);
    var images = {
      menu_a: require('image!menu_a'),
      menu_b: require('image!menu_b'),
      menu_c: require('image!menu_c'),
      menu_d: require('image!menu_d'),
      menu_e: require('image!menu_e')
    };
    var icon = images[name];
var image = images[this.props.image];

    var backStyle = '';
    if(isTabActive){
      backStyle = <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tab]}>
      <Image style={styles.tabImage}
            source={icon}
            />
            <Text style={styles.tabText}>
            {title}
            </Text>
      </TouchableOpacity>;
    }else{
      backStyle = <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tabnormal]}>
      <Image style={styles.tabImage}
        source={icon}
            />
            <Text style={styles.tabText}>
            {title}
            </Text>
      </TouchableOpacity>;
    }


    return (
      {backStyle}
    );
  },

  setAnimationValue(value) {
    var currentPage = this.props.activeTab;

    this.selectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if(!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }
      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({opacity: value - i});
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({opacity: i - value});
      }
    });
  },

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, this.props.titles[i],i))}
      </View>
    );
  },
});

module.exports = FacebookTabBar;
