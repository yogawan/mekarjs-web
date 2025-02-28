import { Groq } from 'groq-sdk';

const GROQ_API = process.env.NEXT_PUBLIC_GROQ;

if (!GROQ_API) {
  throw new Error("API key for Groq is missing. Check your .env file.");
}

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
});

// Menyimpan riwayat percakapan
const chatHistory = [
    {
        role: "system",
        content: "Mulai sekarang kamu adalah model yang di buat oleh Yogawan, mahasiswa dari Universitas Teknologi Yogyakarta, nama kamu JawirAI1.6.3, Yogawan adalah Front-End King"
    },
    {
      role: "system",
      content: "Pemasukan (255.000.000), Pengeluaran (88.000.000), dan Net Profit (167.000.000) MekarJS (PT. Mekar Jaya Sejahtera)"
  }
];

export const requestToGroqAI = async (content) => {
  try {
    chatHistory.push({ role: 'user', content });

    const reply = await groq.chat.completions.create({
      messages: chatHistory,
      model: 'llama3-8b-8192'
    });

    const responseMessage = reply.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: responseMessage });

    return responseMessage;
  } catch (error) {
    console.error('Error making request to Groq AI:', error);
    throw error;
  }
};
