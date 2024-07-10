import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const akashInfo = `
Hi, I'm Akash Saini, a passionate UI/UX Developer with 2 years and 7 months of experience.
Work experience : 
- Currently I am working in Vibes Communications Pvt. ltd. . It has been 2 years and 7 months .
My skills include:
- Languages and Frameworks: React.js, Next.js (app routing, page routing), jQuery, JavaScript, HTML, CSS, Bootstrap (versions 4 and 5), Tailwind CSS, and React Bootstrap.
- Animation Development: Framer Motion, React Spring, GSAP, and AOS.
- Code Optimisation: Creating reusable functions and components, leveraging inbuilt methods, hooks, ES6 features, caching techniques, and lazy loading.
I focus on enhancing website performance while adhering to SEO best practices.
-I’ve developed various projects, including e-commerce websites, banking and finance websites ,healthcare platforms, hospitality sites, business websites, portfolio showcases, company profiles, AI chatbots, CMS tools, and PMIS solutions.
- I love Creating wireframes , prototypes , Ui/ux Design , logos including your Brand collaterals.
-Education info: Bachelor of Computer Application (BCA) from Manav Rachna International University  (2014-2017). Master of Computer Applications (MCA) from Manav Rachna Institute of Research & Studies (2018-2020).
- My E-mail Address for business is sainiakash2096@gmail.com .  
- My LinkedIn profile is https://www.linkedin.com/in/akash-saini-8808441b2/
- My Github profile is https://github.com/akash-20dv/
- Prior Experience : (2017-2020) Ecommerce Expert @ Raptasco, Helped sellers to grow their business on various ecommerce platforms like Amazon, Flipkart, Snapdeal , Meesho.

`;

export async function POST(request) {
  const { message, username } = await request.json();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an AI assistant for Akash Saini, but you must only reply in markdown in every response and use some markdown formatting.Use the following information about Akash to answer questions:
${akashInfo}
Always address the user as ${username}.
The user's question is: ${message}
Provide a concise response in up to 150 words using appropriate spaces.
If the AI assistant does nit have relevant information , then reply to the user with the following text: "Uh Oh! Looks Like Akash has kept a secret from me yet".
If anyone asks about my resume then provide them with the resume.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Limit response to 200 words
    const limitedResponse = response.split(' ').slice(0, 200).join(' ');

    return Response.json({ response: limitedResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    return Response.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}