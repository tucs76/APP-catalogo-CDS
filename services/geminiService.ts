
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAlbumInsight(albumTitle: string, artist: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short 2-sentence market insight for the album "${albumTitle}" by "${artist}". Focus on its collectible value and general reception among music lovers.`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini insight error:", error);
    return "Market insights currently unavailable. This album remains a strong staple for collectors due to its unique sonic landscape.";
  }
}

export async function identifyAlbumFromScan(simulatedSearch: string) {
  // In a real app, this would send an image. Here we use text search to simulate identifying a scan result.
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for a real album that matches or is similar to "${simulatedSearch}". Return the details in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            artist: { type: Type.STRING },
            year: { type: Type.INTEGER },
            genre: { type: Type.STRING },
          },
          required: ["title", "artist", "year", "genre"]
        }
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Identify error:", error);
    return null;
  }
}
