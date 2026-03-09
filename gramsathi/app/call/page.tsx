'use client';

import { useCall } from '@/hooks/useCall';
import PreCallView from '@/components/call/PreCallView';
import ActiveCallView from '@/components/call/ActiveCallView';

export default function CallPage() {
    const call = useCall();

    if (call.callState === 'idle' || call.callState === 'ended') {
        return (
            <PreCallView
                callState={call.callState}
                isSupported={call.isSupported}
                durationSeconds={call.durationSeconds}
                onStartCall={call.startCall}
                onReset={call.resetCall}
            />
        );
    }

    return (
        <ActiveCallView
            callState={call.callState}
            messages={call.messages}
            durationSeconds={call.durationSeconds}
            isMuted={call.isMuted}
            onPressSpeak={call.startSpeaking}
            onReleaseSpeak={call.stopSpeaking}
            onHangUp={call.endCall}
            onToggleMute={call.toggleMute}
        />
    );
}
