// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Explains the functionality of a given configuration file.
 *
 * - explainConfiguration - A function that takes a configuration file as input and returns an explanation of what the configuration does in plain language.
 * - ExplainConfigurationInput - The input type for the explainConfiguration function.
 * - ExplainConfigurationOutput - The return type for the explainConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConfigurationInputSchema = z.object({
  configurationFile: z
    .string()
    .describe('The configuration file to explain.'),
});

export type ExplainConfigurationInput = z.infer<
  typeof ExplainConfigurationInputSchema
>;

const ExplainConfigurationOutputSchema = z.object({
  explanation: z.string().describe('Explanation of the configuration.'),
});

export type ExplainConfigurationOutput = z.infer<
  typeof ExplainConfigurationOutputSchema
>;

export async function explainConfiguration(
  input: ExplainConfigurationInput
): Promise<ExplainConfigurationOutput> {
  return explainConfigurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConfigurationPrompt',
  input: {schema: ExplainConfigurationInputSchema},
  output: {schema: ExplainConfigurationOutputSchema},
  prompt: `You are an expert configuration file analyzer.

You will receive a configuration file, and you will explain what the configuration does in plain language.

Configuration File:
{{configurationFile}}`,
});

const explainConfigurationFlow = ai.defineFlow(
  {
    name: 'explainConfigurationFlow',
    inputSchema: ExplainConfigurationInputSchema,
    outputSchema: ExplainConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
