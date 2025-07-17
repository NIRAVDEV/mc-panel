// src/ai/flows/generate-configuration.ts
'use server';
/**
 * @fileOverview A flow to generate configuration code from a natural language description.
 *
 * - generateConfiguration - A function that generates configuration code.
 * - GenerateConfigurationInput - The input type for the generateConfiguration function.
 * - GenerateConfigurationOutput - The return type for the generateConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConfigurationInputSchema = z.object({
  description: z.string().describe('The natural language description of the desired configuration.'),
});
export type GenerateConfigurationInput = z.infer<typeof GenerateConfigurationInputSchema>;

const GenerateConfigurationOutputSchema = z.object({
  configurationCode: z.string().describe('The generated configuration code.'),
});
export type GenerateConfigurationOutput = z.infer<typeof GenerateConfigurationOutputSchema>;

export async function generateConfiguration(input: GenerateConfigurationInput): Promise<GenerateConfigurationOutput> {
  return generateConfigurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConfigurationPrompt',
  input: {schema: GenerateConfigurationInputSchema},
  output: {schema: GenerateConfigurationOutputSchema},
  prompt: `You are a configuration code generator. Generate configuration code based on the following description:\n\n{{{description}}}`,
});

const generateConfigurationFlow = ai.defineFlow(
  {
    name: 'generateConfigurationFlow',
    inputSchema: GenerateConfigurationInputSchema,
    outputSchema: GenerateConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
