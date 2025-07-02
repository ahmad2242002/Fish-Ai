import { ChatMessage, fishCoachAI } from '@/api/chatAi'
import RecieveMessage from '@/components/RecieveMessage'
import SentMessage from '@/components/SentMessage'
import Feather from '@expo/vector-icons/build/Feather'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { rh, rw } from 'react-native-full-responsive'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ActivityIndicator, IconButton, TextInput } from 'react-native-paper'

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    text: "👋 Hey there! I'm Fish Coach. Here to provide expert advice on fishing techniques and fish behavior to help you improve your angling skills. 🎣",
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 2,
    text: "Ask me anything about fishing, and I'll do my best to help!",
    isUser: false,
    timestamp: new Date(),
  },
]

const Coach = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null)

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await fishCoachAI.sendMessage(userMessage.text)

      if (response.success && response.message) {
        const aiMessage: ChatMessage = {
          id: Date.now() + 1,
          text: response.message,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        const errorMessage: ChatMessage = {
          id: Date.now() + 1,
          text: response.error || 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const resetChat = () => {
    fishCoachAI.resetChat()
    setMessages(initialMessages)
  }

  useEffect(() => {
    // Scroll to bottom when new messages are added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd(true)
    }, 100)
  }, [messages])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          style={{ backgroundColor: '#23242A', borderRadius: 100 }}
          icon={() => <Ionicons name="fish-outline" size={28} color="white" />}
          size={28}
        />
        <Text style={styles.headerText}>Fish Coach</Text>
        <IconButton
          icon={() => <Ionicons name="refresh" size={24} color="white" />}
          onPress={resetChat}
          style={{ marginLeft: 'auto' }}
        />
      </View>

      {/* Chat Area */}
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        keyboardShouldPersistTaps='handled'
        enableAutomaticScroll
        keyboardOpeningTime={0}
        enableOnAndroid
        style={{ flex: 1 }}
        extraScrollHeight={150}
      >
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: rw(4), paddingTop: rh(4) }}>
            {messages.map((msg) => (
              msg.isUser ? (
                <SentMessage key={msg.id} msg={{ id: msg.id, text: msg.text }} />
              ) : (
                <RecieveMessage key={msg.id} msg={{ id: msg.id, text: msg.text }} />
              )
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#246BFD" />
                <Text style={styles.loadingText}>Fish Coach is typing...</Text>
              </View>
            )}
          </ScrollView>
        </View>
        {/* Input Bar */}
        <View style={styles.inputBar}>
          <View style={{ flex: 1 }}>
            <TextInput
              mode='outlined'
              outlineStyle={{ borderColor: '#23242A', borderRadius: 40 }}
              style={styles.input}
              placeholder="Ask the coach..."
              placeholderTextColor="#888"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              disabled={isLoading}
              multiline
              maxLength={500}
            />
          </View>
          <View>
            <IconButton
              icon={() => <Feather name="send" size={24} color="white" />}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
              style={{
                backgroundColor: inputText.trim() && !isLoading ? '#246BFD' : '#23242A',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

    </View>
  )
}

export default Coach

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rh(6),
    paddingBottom: rh(2),
    paddingHorizontal: rw(4),
    borderBottomWidth: 1,
    gap: rw(2),
    borderBottomColor: '#23242A',
    backgroundColor: 'black',
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#23242A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#23242A',
    marginRight: 10,
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
  inputBar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
    borderTopWidth: 1,
    gap: rw(2),
    borderTopColor: '#23242A',
  },
  input: {
    flex: 1,
    paddingVertical: rh(2),
    backgroundColor: '#181A20',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: rw(4),
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 8,
  },
})