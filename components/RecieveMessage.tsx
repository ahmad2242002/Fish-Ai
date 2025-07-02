import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/build/Ionicons'

const RecieveMessage = ({ msg }: { msg: { id: number, text: string } }) => {
    return (
        <View key={msg.id} style={styles.messageRow}>
            <IconButton
                style={{ backgroundColor: '#23242A', borderRadius: 100 }}
                icon={() => <Ionicons name="fish-outline" size={24} color="white" />}
                size={24}
            />
            <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{msg.text}</Text>
            </View>
        </View>
    )
}

export default RecieveMessage

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    bubble: {
        backgroundColor: '#23242A',
        borderRadius: 16,
        padding: 14,
        maxWidth: '80%',
    },
    bubbleText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
})