import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { roomType, stylePreference, dimensions, budgetLevel, specialNotes } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `You are Victor Ephraim's lead design intelligence assistant at Veph Interiors & Exterior in Uyo, Akwa Ibom State, Nigeria.
A client in Uyo is requesting an interior design advisory and concept proposal.

Details:
- Room / Space Type: ${roomType || 'Living Room / Lounge'}
- Preferred Aesthetic: ${stylePreference || 'Modern African Luxury'}
- Space Dimensions: ${dimensions || 'Standard (approx 28 sqm)'}
- Budget Tier: ${budgetLevel || 'Executive Luxury'}
- Special Requirements / Notes: ${specialNotes || 'None specified'}

Provide a structured, professional concept proposal formatted in JSON matching this exact structure:
{
  "conceptTitle": "string",
  "designSummary": "string",
  "colorPalette": [
    {"name": "string", "hex": "string", "usage": "string"}
  ],
  "materialSpecifications": [
    {"category": "string", "material": "string", "application": "string"}
  ],
  "ceilingAndLightingStrategy": "string",
  "localUyoProcurementAdvice": "string",
  "estimatedTimelineWeeks": "string"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an elite interior architecture and materials consultant for Veph Interiors & Exterior, Uyo, Akwa Ibom State. Always respond with valid JSON only.',
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.status(200).json({ success: true, data: parsed });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to rule-based proposal:', geminiError?.message);
      }
    }

    // High quality architectural fallback
    const fallbackConcept = {
      conceptTitle: `${stylePreference || 'Modern African'} Spatial Harmony in ${roomType || 'Living Area'}`,
      designSummary: `A bespoke composition designed specifically for Uyo residential architecture. Balances passive cross-ventilation and humidity-resistant joinery with warm ambient cove illumination, textural acoustics, and tailored millwork executed by Veph Interiors artisans.`,
      colorPalette: [
        { name: 'Warm Travertine Plaster', hex: '#EBE5D8', usage: 'Primary walls and sculptural POP ceiling surfaces' },
        { name: 'Deep Iroko / Walnut', hex: '#3B2F2F', usage: 'Fluted acoustic accent panels & bespoke entertainment console' },
        { name: 'Burnished Brass', hex: '#C5A880', usage: 'Architectural trim, linear chandeliers, and cabinet inlays' },
        { name: 'Terracotta Sand', hex: '#C2633E', usage: 'Plush accent armchairs and handcrafted ceramic statement pieces' },
      ],
      materialSpecifications: [
        { category: 'Ceilings & Bulkheads', material: 'Gypsum Plaster of Paris (POP) with anti-sag reinforcements', application: 'Continuous perimeter cove with 3000K indirect LED strip' },
        { category: 'Wall Treatments', material: 'Fluted Moisture-Resistant MDF & Textured Stucco', application: 'Feature focal wall behind entertainment or bedhead' },
        { category: 'Flooring', material: 'Large-Format 1200x600mm Honed Porcelain Tiling', application: 'High-traffic living and dining surface' },
        { category: 'Fenestration & Textiles', material: 'Triple-Weave Sheer Linen & Blackout Drapes', application: 'Recessed curtain tracks for clean floor-to-ceiling drape' },
      ],
      ceilingAndLightingStrategy: 'Step-down floating architectural ceiling tray with concealed 24V warm 3000K COB LED channels, complemented by anti-glare recessed magnetic spotlights and a sculptural brass centerpiece.',
      localUyoProcurementAdvice: 'Marine-grade core boards recommended for Uyo tropical humidity. High-density POP casting plaster and architectural extrusions sourced directly through Veph verified supply channels in Timber Market, Uyo.',
      estimatedTimelineWeeks: '3 to 4 weeks',
    };

    return res.status(200).json({ success: true, data: fallbackConcept });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
