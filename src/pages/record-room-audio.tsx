import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  id: string
}

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const params = useParams<RoomParams>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  if (!params.id) {
    return <Navigate replace to="/" />
  }

  function stopRecording() {
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setIsRecording(false)
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.id}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      alert('Erro ao enviar o áudio. Tente novamente.')
      return
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.start()

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }
  }

  async function startRecording() {
    if (isRecordingSupported) {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })

      createRecorder(audio)

      setIsRecording(true)

      intervalRef.current = setInterval(() => {
        recorder.current?.stop()
        createRecorder(audio)
      }, 10_000)
    } else {
      alert('Gravação de áudio não é suportada neste navegador.')
      setIsRecording(false)
      return
    }
  }

  async function handleRecordingButton() {
    if (isRecording) {
      stopRecording()
    } else {
      await startRecording()
    }
  }

  return (
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
      <Button onClick={handleRecordingButton}>
        {isRecording ? <p>Parar de gravar</p> : <p>Gravar áudio</p>}
      </Button>
      {isRecording ? <p>Gravando...</p> : <p>Pressione o botão para gravar</p>}
    </div>
  )
}
