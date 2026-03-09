export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cjwrwd75m7.ap-south-1.awsapprunner.com'; // Production App Runner URL

export const callChat = async (message: string, language: string, agent?: string) => {
    const payload = { message, language, agent };
    const res = await fetch(`${API_BASE_URL}/api/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('API failed');
    return res.json();
};

export const chatMessage = async (message: string, language: string, agent?: string) => {
    const payload = { message, language, agent };
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('API failed');
    return res.json();
};
