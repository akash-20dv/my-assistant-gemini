import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request){
    const { message } = await request.json();
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    try {
        const result = await model.generateContent(message);
        const response = result.response.text();
        const limitdResponse = response.split(' ').slice(0,550).join(' ');
        return Response.json({response: limitdResponse });

    } catch (error) {
        console.error('Error generating response:' , error);
        return Response.json({error: 'Failed to generate response'}, { status: 500 });
    }
}