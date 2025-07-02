import Ionicons from '@expo/vector-icons/build/Ionicons'
import { useState } from 'react'
import { Alert, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { rh } from 'react-native-full-responsive'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Searchbar } from 'react-native-paper'

interface MapPoint {
  id: string
  coordinate: {
    latitude: number
    longitude: number
  }
  score: number
  title: string
  description: string
}

const Find = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [allMapPoints, setAllMapPoints] = useState<MapPoint[]>([
    {
      id: '1',
      coordinate: {
        latitude: 19.4326,
        longitude: -99.1332,
      },
      score: 85,
      title: 'Fishing Spot 1',
      description: 'Great spot for bass fishing'
    },
    {
      id: '2',
      coordinate: {
        latitude: 23.1136,
        longitude: -82.3666,
      },
      score: 92,
      title: 'Fishing Spot 2',
      description: 'Excellent trout location'
    },
    {
      id: '3',
      coordinate: {
        latitude: 38.8951,
        longitude: -77.0364
      },
      score: 78,
      title: 'Fishing Spot 3',
      description: 'Good for catfish'
    },
    {
      id: '4',
      coordinate: {
        latitude: 4.7110,
        longitude: -74.0721
      },
      score: 95,
      title: 'Fishing Spot 4',
      description: 'Premium salmon spot'
    },
    {
      id: '5',
      coordinate: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      score: 85,
      title: 'Fishing Spot 5',
      description: 'Great spot for bass fishing'
    },
  ])

  // Filter map points based on search query
  const filteredMapPoints = allMapPoints.filter(point =>
    point.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    point.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleMarkerPress = (point: MapPoint) => {
    Alert.alert(
      point.title,
      `${point.description}\n\nScore: ${point.score}/100`,
      [
        { text: 'OK', style: 'default' },
      ]
    )
  }


  const renderSpotCard = (spot: MapPoint) => (
    <TouchableOpacity
      key={spot.id}
      style={styles.spotCard}
      onPress={() => {
        handleMarkerPress(spot)
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={styles.spotCardTitle}>{spot.title}</Text>
        <Text style={[styles.spotCardScoreLabel, { textAlign: 'left' }]}>1.2 km</Text>
      </View>
      <View style={styles.spotCardScore}>
        <Text style={styles.spotCardScoreText}>{spot.score}</Text>
        <Text style={styles.spotCardScoreLabel}>Fish Score</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Top Header with Search Bar and Settings */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search fishing spots..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              placeholderTextColor="#666"
              style={[styles.searchbar, { height: rh(5.5) }]}
              iconColor="#666"
              inputStyle={[styles.searchInput, { verticalAlign: 'middle', alignSelf: 'center', }]}
            />
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_GOOGLE}
          region={{
            latitude: 10.114993,
            longitude: -88.236174,
            latitudeDelta: 40,
            longitudeDelta: 40,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          showsTraffic={false}
          showsBuildings={false}
          customMapStyle={[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#1591EA"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#1591EA"
                }
              ]
            }
          ]}
        >
          {filteredMapPoints.map((point) => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.coordinate.latitude,
                longitude: point.coordinate.longitude,
              }}
              title={point.title}
              description={`Score: ${point.score}/100`}
              onPress={() => handleMarkerPress(point)}
            >
              <View style={{
                backgroundColor: "white",
                borderRadius: 100,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 2,
                justifyContent: 'center',
              }}>
                <Ionicons name="fish-outline" size={12} color={"black"} />
                <Text style={{
                  color: '#000000',
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginLeft: 2,
                }}>
                  {point.score}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Legend */}
        {/* <View style={styles.legend}>
          <Text style={styles.legendTitle}>Fishing Spot Scores</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#00FF00' }]} />
            <Text style={styles.legendText}>90-100: Excellent</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFFF00' }]} />
            <Text style={styles.legendText}>80-89: Good</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFA500' }]} />
            <Text style={styles.legendText}>70-79: Fair</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
            <Text style={styles.legendText}>Below 70: Poor</Text>
          </View>
        </View> */}


        {/* Bottom Action Sheet */}
        <View style={styles.actionSheetContainer}>
          <View style={styles.actionSheet}>
            <View style={styles.actionSheetHeader}>
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Spots near you</Text>
            </View>

            <ScrollView style={styles.actionSheetContent} showsVerticalScrollIndicator={false}>
              <View style={styles.spotsGrid}>
                {filteredMapPoints.map((spot) => (
                  <View key={spot.id} style={styles.spotCardContainer}>
                    {renderSpotCard(spot)}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Find

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
  },
  searchbar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  settingsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: rh(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  scoreText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  legend: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
    minWidth: 150,
  },
  legendTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  actionSheetButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#1591EA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionSheetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  actionSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    maxHeight: 400,
    minHeight: Platform.OS === 'ios' ? 340 : 240,
  },
  actionSheetHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  actionSheetHandle: {
    width: '20%',
    top: -30,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    padding: 5,
  },
  actionSheetContent: {
    padding: 20,
    flex: 1,
  },
  spotsGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    paddingBottom: 90,
  },
  spotCardContainer: {
    width: '100%',
  },
  spotCard: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  spotCardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  spotCardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    lineHeight: 16,
  },
  spotCardScore: {
    justifyContent: 'space-between',
  },
  spotCardScoreLabel: {
    fontSize: 12,
    textAlign: 'right',
    color: '#666',
    fontWeight: '500',
  },
  spotCardScoreValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  spotCardScoreText: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: '900',
    color: '#000',
  },
})