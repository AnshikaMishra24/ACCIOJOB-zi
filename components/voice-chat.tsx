"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Volume2, VolumeX, Pause, AudioWaveformIcon as Waveform, MessageSquare, Brain } from "lucide-react"

interface VoiceChatProps {
  onMessage: (message: string) => void
}

export function VoiceChat({ onMessage }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          const confidence = event.results[i][0].confidence

          if (event.results[i].isFinal) {
            finalTranscript += transcript
            setConfidence(confidence * 100)
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          onMessage(finalTranscript)
          setTranscript("")
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [onMessage])

  const startListening = async () => {
    if (!recognitionRef.current) return

    try {
      // Request microphone permission and set up audio analysis
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Start audio level monitoring
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
          requestAnimationFrame(updateAudioLevel)
        }
      }
      updateAudioLevel()

      recognitionRef.current.start()
      setIsListening(true)
    } catch (error) {
      console.error("Error starting speech recognition:", error)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setAudioLevel(0)
  }

  const speakText = (text: string) => {
    if (!synthRef.current || !voiceEnabled) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (isSpeaking) {
      stopSpeaking()
    }
  }

  // Simulate AI response with voice
  useEffect(() => {
    const handleAIResponse = (response: string) => {
      if (voiceEnabled && response) {
        // Extract text from AI response (remove code blocks, etc.)
        const cleanText = response
          .replace(/```[\s\S]*?```/g, "I've generated the code for you.")
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/\*(.*?)\*/g, "$1")
          .substring(0, 200) // Limit length for speech

        speakText(cleanText)
      }
    }

    // This would be connected to your AI response handler
    // handleAIResponse("Here's your component...")
  }, [voiceEnabled])

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Mic className="h-6 w-6 text-purple-600 mr-2" />
                Voice Assistant
              </div>
              <Badge variant={isListening ? "default" : "secondary"} className="animate-pulse">
                {isListening ? "Listening..." : "Ready"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Speak naturally to describe your component. I'll understand and generate it for you!
            </p>
            <div className="flex items-center space-x-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
                size="lg"
              >
                {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                {isListening ? "Stop Listening" : "Start Listening"}
              </Button>
              <Button onClick={toggleVoice} variant="outline" size="lg">
                {voiceEnabled ? <Volume2 className="h-5 w-5 mr-2" /> : <VolumeX className="h-5 w-5 mr-2" />}
                {voiceEnabled ? "Voice On" : "Voice Off"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Audio Visualization */}
        {isListening && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Waveform className="h-5 w-5 text-blue-600 mr-2" />
                Audio Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Audio Level</span>
                    <span>{Math.round(audioLevel)}</span>
                  </div>
                  <Progress value={audioLevel} className="h-2" />
                </div>

                {confidence > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Confidence</span>
                      <span>{Math.round(confidence)}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                  </div>
                )}

                {/* Visual waveform */}
                <div className="flex items-center justify-center space-x-1 h-16">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-full animate-pulse"
                      style={{
                        width: "4px",
                        height: `${Math.random() * audioLevel + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Transcript */}
        {transcript && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
                Live Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900">{transcript}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Speaking Status */}
        {isSpeaking && (
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-green-600 mr-2" />
                  AI Speaking
                </div>
                <Button onClick={stopSpeaking} variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">AI is responding...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voice Commands Help */}
        <Card>
          <CardHeader>
            <CardTitle>Voice Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Try saying:</Badge>
              </div>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• "Create a modern button component"</li>
                <li>• "Make it larger and blue"</li>
                <li>• "Add a hover effect"</li>
                <li>• "Generate a login form"</li>
                <li>• "Make it responsive"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
